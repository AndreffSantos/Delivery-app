const Sequelize = require('sequelize');
const { sales, salesProducts, users, products } = require('../database/models');
const config = require('../database/config/config');

const { or } = Sequelize.Op;

const sequelize = new Sequelize(config.development);

const getSalesByUserSellerId = async (id) => {
  const getSaleId = await sales.findAll({
    where: {
      [or]: [
        { userId: id },
        { sellerId: id },
      ],
    },
  });

  if (!getSaleId) return null;

  return getSaleId;
};

const getAllSale = async () => {
  const getSale = await sales.findAll({
      include: [{ model: products, as: 'products' }],
  });

  if (!getSale) return null;

  return getSale;
};

const getSaleById = async (id) => {
  const getSale = await sales.findByPk(id, {
      include: [
          { model: products, as: 'products' },
          { model: users, as: 'seller' },
      ],
  });

  if (!getSale) return null;
  return getSale;
};

const postSaleProducts = async ({ products: allProducts, saleId }, multTransactions) => {
  const createdAllProducts = [];

  allProducts.forEach((product) =>
      createdAllProducts.push(
          {
              productId: product.id,
              saleId,
              quantity: product.quantity,
          },
      ));

  await salesProducts.bulkCreate(createdAllProducts, { transaction: multTransactions });
};

const findUserId = async (email) => {
  const { dataValues } = await users.findOne({ where: { email } });
  return dataValues.id;
}; 

const postCheckoutSales = async (
  { sellerId, totalPrice, deliveryAddress, deliveryNumber, email }, multTransactions) => {
  const userId = await findUserId(email);

  const result = await sales.create(
      {
          userId,
          sellerId,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
          saleDate: new Date(),
          status: 'Pendente',
      }, { transaction: multTransactions },
  );
  return result;
};

// https://sequelize.org/docs/v6/other-topics/transactions/

const createSaleProducts = async ({ sellerId, totalPrice, deliveryAddress,
  deliveryNumber, products: allProducts, email }) => {
  // First, we start a transaction from your connection and save it into a variable
  const transaction = await sequelize.transaction();

  try {
      // // Then, we do some calls passing this transaction as an option:
      const getSales = await postCheckoutSales({
          email,
          sellerId,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
      }, transaction);

      await postSaleProducts({ products: allProducts, saleId: getSales.id }, transaction);

      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await transaction.commit();
      return getSales.id;
  } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction.rollback();
      return null;
  }
};

module.exports = {
  getSalesByUserSellerId,
  createSaleProducts,
  getAllSale,
  getSaleById,
};
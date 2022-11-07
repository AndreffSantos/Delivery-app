const sellerService = require('../services/sellerService');

const getProducts = async (req, res, next) => {
  const getTenProducts = await sellerService.getProducts();

  if (!getTenProducts) {
    return next({ name: 'NotFound', message: 'Not found' });
  }

  return res.status(200).json(getTenProducts);
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const getProduct = await sellerService.getProductById(id);

  if (!getProduct) {
    return next({ name: 'NotFound', message: 'Not found' });
  }

  return res.status(200).json(getProduct);
};

module.exports = {
  getProducts,
  getProductById,
};
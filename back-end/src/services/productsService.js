const { products } = require('../database/models');

const getAllProducts = async () => {
    const getproducts = await products.findAll();
    return getproducts;
  };

  module.exports = {
    getAllProducts,
};

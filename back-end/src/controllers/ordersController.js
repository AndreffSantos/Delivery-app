const userService = require('../services/userService');
const ordersService = require('../services/ordersService');
const { verifyToken } = require('../utils/token');

const getOrders = async (req, res, next) => {
  const { email } = req.params;
  const id = await userService.getUserById(email);
  const orders = await ordersService.getSalesByUserSellerId(id);
  if (!orders) {
    return next({ name: 'NotFound', message: 'Not found' });
  }
  return res.status(200).json(orders);
};

const postOrder = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
      return next({ name: 'NotFound', message: 'Not found' });
  }
  
  const verifiedToken = verifyToken(authorization);
  const verifiedEmail = verifiedToken.email;

  const result = await ordersService.createSaleProducts({ ...req.body, verifiedEmail });

  if (!result) {
      return next({ name: 'NotFound', message: 'Not found' });
  }
  return res.status(201).json({ result });
};

const getSalesById = async (req, res) => {
    const { id } = req.params;
    const getSale = await ordersService.getSaleById(id);
    return res.status(200).json(getSale);
};

module.exports = {
  getOrders,
  postOrder,
  getSalesById,
};
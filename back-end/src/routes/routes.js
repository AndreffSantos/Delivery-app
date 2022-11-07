const express = require('express');
const userController = require('../controllers/userController');
const productsController = require('../controllers/productsController');
const checkoutController = require('../controllers/checkoutController');
const ordersController = require('../controllers/ordersController');

const route = express.Router();

route.post('/login', userController.postLogin);
route.post('/register', userController.postRegister);

route.get('/customer/products', productsController.postProducts);
route.get('/customer/orders', ordersController.getUser);
route.post('/customer/checkout', checkoutController.postCheckout);

route.get('/sales', checkoutController.getSales);
route.get('/sales/:id', checkoutController.getSalesById);

route.get('/sellers', userController.getSellers);

module.exports = route;
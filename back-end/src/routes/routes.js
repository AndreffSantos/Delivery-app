const express = require('express');
const userController = require('../controllers/userController');
const productsController = require('../controllers/productsController');
// const checkoutController = require('../controllers/checkoutController');
const ordersController = require('../controllers/ordersController');
const sellerController = require('../controllers/sellerController');

const route = express.Router();

route.post('/login', userController.postLogin);
route.post('/register', userController.postRegister);

route.get('/customer/products', productsController.getAllProducts);
// Essa Rota retorna todos os pedidos de um determinado usuario.
route.get('/customer/orders/:email', ordersController.getOrders);
// Rota para persistir dados de pedidos.
route.post('/customer/orders', ordersController.postOrder);

// route.get('/sales', checkoutController.getSales);
route.get('/orders/:id', ordersController.getSalesById);

route.get('/sellers', userController.getSellers);
route.get('/seller/orders/:email', ordersController.getOrders);
route.get('/seller/orders/:id', sellerController.getProductById);
route.patch('/seller/orders/:id', sellerController.saleUpdated);

module.exports = route;
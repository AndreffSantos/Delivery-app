require('dotenv').config();
const checkoutService = require('../services/checkoutService');

const getSales = async (req, res, next) => {
    const getAllSales = await checkoutService.getAllSale();

    if (!getAllSales) {
        return next({ name: 'Internal Server Error', message: 'Internal Server Error' });
    }

    return res.status(200).json(getAllSales);
};

module.exports = { getSales };

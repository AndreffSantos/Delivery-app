const Joi = require('joi');
const { users } = require('../database/models');
const runSchema = require('../utils/runSchema');

const MESSAGE_ERROR_LOGIN = 'Some required fields are missing';

const loginValidate = runSchema(Joi.object({ 
  email: Joi.string().email().required().messages({
    'string.email': MESSAGE_ERROR_LOGIN,
    'string.base': MESSAGE_ERROR_LOGIN,
    'string.empty': MESSAGE_ERROR_LOGIN,
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': MESSAGE_ERROR_LOGIN,
    'string.empty': MESSAGE_ERROR_LOGIN,
  }),
}));

const postLogin = async (email, password) => {
  const getusers = await users.findOne({
    where: {
      email,
      password,
    },
  });
  return getusers;
};

module.exports = { 
  loginValidate,
  postLogin,
};
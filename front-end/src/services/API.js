import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

async function login(obj) {
  const { data } = await API.post('/login', obj);
  return data;
}

async function register(obj) {
  const { data } = await API.post('/register', obj);
  return data;
}

async function getProducts(token) {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const { data } = await API.get('/customer/products', config);
  return Object.values(data);
}

async function getSellers() {
  const { data } = await API.get('/sellers');
  return data;
}

async function postOrder(token, obj) {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const { data } = await API.post('/customer/orders', obj, config);
  return data;
}

async function getOrder(id) {
  const { data } = await API.get(`/orders/${id}`);

  return data;
}

async function getOrders(role, email) {
  const { data } = await API.get(`/${role}/orders/${email}`);
  return data;
}

async function editStatus(id, status) {
  const obj = {
    status,
  };
  const { data } = await API.patch(`/seller/orders/${id}`, obj);
  return data;
}

export {
  login,
  register,
  getProducts,
  getSellers,
  postOrder,
  getOrder,
  getOrders,
  editStatus,
};

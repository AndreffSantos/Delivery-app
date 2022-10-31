import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

async function singIn(obj) {
  const { data } = await API.post('/login', obj);
  return data;
}

async function register(obj) {
  const { data } = await API.post('/register', obj);
  return data;
}
// c

export { singIn, register };

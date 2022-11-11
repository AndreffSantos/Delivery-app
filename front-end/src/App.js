import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/register" element={ <RegisterPage /> } />

      <Route path="/customer" element={ <Navigate to="/customer/products" /> } />
      <Route path="/customer/products" element={ <ProductsPage /> } />
      <Route path="/customer/checkout" element={ <CheckoutPage /> } />
      <Route path="/customer/orders" element={ <OrdersPage /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetailsPage /> } />

      <Route path="/seller" element={ <Navigate to="/seller/orders" /> } />
      <Route path="/seller/orders" element={ <OrdersPage /> } />
      <Route path="/seller/orders/:id" element={ <OrderDetailsPage /> } />
    </Routes>
  );
}
// com

export default App;

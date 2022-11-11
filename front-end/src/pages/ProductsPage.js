import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../componentes/Card';
import NavBar from '../componentes/NavBar';
import AppContext from '../context/Context';
import { getProducts } from '../services/API';

export default function ProductsPage() {
  const { user } = React.useContext(AppContext);
  const [products, setProducts] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    getProducts(user.token).then((response) => {
      setProducts(response.map((product) => ({ ...product, quantity: 0 })));
    });
  }, []);

  const sumProductsPrice = () => products
    .reduce((acc, curr) => acc + (Number(curr.price) * curr.quantity), 0);

  const setCart = () => {
    const cart = products.filter(({ quantity }) => quantity > 0);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const addProduct = (index) => {
    const filterProduct = products.find((_item, i) => index === i);
    filterProduct.quantity += 1;
    setPrice(sumProductsPrice().toFixed(2));
    setCart();
  };

  const rmProduct = (index) => {
    const filterProduct = products[index];
    filterProduct.quantity -= 1;
    if (filterProduct.quantity < 0) {
      filterProduct.quantity = 0;
      setPrice(sumProductsPrice().toFixed(2));
    } else {
      setPrice(sumProductsPrice().toFixed(2));
    }
    setCart();
  };

  const handleChange = ({ target: { value } }, index) => {
    const filterProduct = products[index];
    if (value) {
      filterProduct.quantity = parseInt(value, 10);
      setPrice(sumProductsPrice().toFixed(2));
    } else {
      filterProduct.quantity = 0;
      setPrice(sumProductsPrice().toFixed(2));
    }
    setCart();
  };

  return (
    <main>
      <NavBar
        textButton1="Produtos"
        button1Click={ () => navigate('/customer/products') }
        textButton2="Meus Pedidos"
        button2Click={ () => navigate('/customer/orders') }
        nomeUsuario={ user.name }
      />

      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ products.every(({ quantity }) => quantity <= 0) }
      >
        Ver Carrinho:
        <p
          data-testid="customer_products__checkout-bottom-value"
        >
          {`${String(price).replace(/\./, ',')}`}
        </p>
      </button>

      {
        products.map((product, index) => (
          <Card
            key={ product.id }
            product={ product }
            addFunction={ () => addProduct(index) }
            rmFunction={ () => rmProduct(index) }
            onChange={ (event) => handleChange(event, index) }
          />
        ))
      }
    </main>
  );
}

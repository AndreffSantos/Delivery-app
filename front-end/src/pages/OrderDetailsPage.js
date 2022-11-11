import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../componentes/NavBar';
import Table from '../componentes/Table';
import AppContext from '../context/Context';
import { editStatus, getOrder } from '../services/API';

export default function OrderDetailsPage() {
  const { user } = React.useContext(AppContext);
  const [order, setOrder] = React.useState({
    products: [],
    seller: {
      name: '',
    },
  });
  const navigate = useNavigate();
  const params = useParams();
  const totalPrice = order.products
    .reduce((acc, curr) => acc + (Number(curr.price) * curr.salesProducts.quantity), 0)
    .toFixed(2);

  const updateOrder = () => {
    getOrder(params.id).then((response) => {
      setOrder(response);
    });
  };

  React.useEffect(() => {
    updateOrder();
  }, []);

  const statusEdit = ({ target: { innerHTML } }) => {
    const status = innerHTML === 'Preparar Pedido' ? 'Preparando' : 'Em Trânsito';
    editStatus(params.id, status).then(() => {
      updateOrder();
    });
  };

  return (
    <main>
      <NavBar
        textButton1="Produtos"
        button1Click={ () => navigate(`/${user.role}/products`) }
        textButton2="Meus Pedidos"
        button2Click={ () => navigate(`/${user.role}/orders`) }
      />

      <section>
        <Table
          page="order_details"
          role={ user.role }
          order={ order }
          dataArray={ order.products }
          hasButton={ false }
          statusEdit={ statusEdit }
        />
      </section>

      <section>
        <span>Total:</span>
        <span
          data-testid={ `${user.role}_order_details__element-order-total-price` }
        >
          {
            totalPrice.replace(/\./, ',')
          }
        </span>
      </section>

    </main>
  );
}

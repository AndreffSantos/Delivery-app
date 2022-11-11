import moment from 'moment';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../componentes/NavBar';
import AppContext from '../context/Context';
import { getOrders } from '../services/API';

export default function OrdersPage() {
  const { user } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    if (Object.keys(user).length > 0) {
      getOrders(user.role, user.email).then((response) => {
        setOrders(response);
      });
    }
  }, [user]);

  return (
    <main>
      <NavBar
        textButton1="Pedidos"
        button1Click={ () => navigate(`/${user.role}/products`) }
        textButton2="Meus Pedidos"
        button2Click={ () => navigate(`/${user.role}/orders`) }
      />

      <section>
        {
          orders.map((order, index) => (
            <Link to={ `/${user.role}/orders/${order.id}` } key={ index }>
              <div style={ { border: '1px solid black' } }>
                <p
                  data-testid={ `${user.role}_orders__element-order-id-${order.id}` }
                >
                  {`Pedido ${order.id}`}
                </p>
                <span
                  data-testid={
                    `${user.role}_orders__element-delivery-status-${order.id}`
                  }
                >
                  {order.status}
                </span>
                <p
                  data-testid={ `${user.role}_orders__element-order-date-${order.id}` }
                >
                  {moment(order.saleDate).utc().format('DD/MM/YYYY') }
                </p>
                <p
                  data-testid={ `${user.role}_orders__element-card-price-${order.id}` }
                >
                  {order.totalPrice.replace(/\./, ',')}
                </p>
                {
                  user.role === 'seller' ? (
                    <p
                      data-testid={ `seller_orders__element-card-address-${order.id}` }
                    >
                      {`${order.deliveryAddress}, ${order.deliveryNumber}`}
                    </p>
                  ) : null
                }
              </div>
            </Link>
          ))
        }
      </section>

    </main>
  );
}

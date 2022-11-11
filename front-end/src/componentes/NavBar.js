import React from 'react';
import { useNavigate } from 'react-router-dom';
import { string, func } from 'prop-types';
import AppContext from '../context/Context';

export default function NavBar({
  textButton1,
  button1Click,
  textButton2,
  button2Click,
}) {
  const { user } = React.useContext(AppContext);
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        {
          user.role === 'customer' ? (
            <button
              type="button"
              data-testid={ `${user.role}_products__element-navbar-link-products` }
              onClick={ button1Click }
            >
              { textButton1 }
            </button>

          ) : null
        }

        <button
          type="button"
          data-testid={ `${user.role}_products__element-navbar-link-orders` }
          onClick={ button2Click }
        >
          { textButton2 }
        </button>

        <li
          data-testid={ `${user.role}_products__element-navbar-user-full-name` }
        >
          { user.name }
        </li>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.removeItem('user');
            navigate('/');
          } }
        >
          Sair
        </button>
      </ul>
    </nav>
  );
}

NavBar.defaultProps = {
  textButton2: '',
  button2Click: () => console.log(),
};

NavBar.propTypes = {
  textButton1: string.isRequired,
  button1Click: func.isRequired,
  textButton2: string,
  button2Click: func,
};

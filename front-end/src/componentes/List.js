import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/Context';
import Button from './Button';

export default function List({
  page,
  product,
  index,
  hasButton,
  onClick,
}) {
  const { user } = React.useContext(AppContext);
  return (
    <tr>
      <td
        data-testid={ `${user.role}_${page}__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td data-testid={ `${user.role}_${page}__element-order-table-name-${index}` }>
        { product.name }
      </td>

      <td data-testid={ `${user.role}_${page}__element-order-table-quantity-${index}` }>
        {
          hasButton ? product.quantity : product.salesProducts.quantity
        }
      </td>

      <td data-testid={ `${user.role}_${page}__element-order-table-unit-price-${index}` }>
        { product.price.replace(/\./, ',') }
      </td>

      <td data-testid={ `${user.role}_${page}__element-order-table-sub-total-${index}` }>
        {
          hasButton ? (product.price * product.quantity).toFixed(2).replace(/\./, ',')
            : (product.price * product.salesProducts.quantity)
              .toFixed(2).replace(/\./, ',')
        }
      </td>

      {
        hasButton ? (
          <td>
            <Button
              dataTestId={ `${user.role}_${page}__element-order-table-remove-${index}` }
              textButton="Remover"
              onClick={ () => onClick(product.id) }
            />
          </td>
        ) : ''
      }
    </tr>
  );
}

List.defaultProps = {
  onClick: () => console.log(),
};

List.propTypes = {
  page: PropTypes.string.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    id: PropTypes.number,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    salesProducts: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
  hasButton: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

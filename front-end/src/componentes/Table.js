import PropTypes from 'prop-types';
import React from 'react';
import List from './List';
import OrderDetailsLine from './OrderDetailsLine';

export default function Table({
  page,
  order,
  dataArray,
  hasButton,
  onClick,
  statusEdit,
}) {
  return (
    <table>
      <thead>
        {
          page === 'order_details' ? <OrderDetailsLine
            order={ order }
            preparing={ statusEdit }
            dispatch={ statusEdit }
          /> : null
        }
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          {
            hasButton ? <th>Remover Item</th> : null
          }
        </tr>
      </thead>
      <tbody>
        {
          dataArray.map((product, index) => (
            <List
              key={ product.id }
              page={ page }
              product={ product }
              index={ index }
              hasButton={ hasButton }
              onClick={ onClick }
            />
          ))
        }
      </tbody>
    </table>
  );
}

Table.defaultProps = {
  order: {},
  onClick: () => console.log(),
  statusEdit: () => console.log(),
};

Table.propTypes = {
  page: PropTypes.string.isRequired,
  order: PropTypes.shape(),
  dataArray: PropTypes.arrayOf(PropTypes.shape).isRequired,
  hasButton: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  statusEdit: PropTypes.func,
};

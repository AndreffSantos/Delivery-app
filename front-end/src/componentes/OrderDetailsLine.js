import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import Button from './Button';
import AppContext from '../context/Context';

export default function OrderDetailsLine({
  order,
  preparing,
  dispatch,
}) {
  const { user } = React.useContext(AppContext);
  return (
    <tr>
      <td
        data-testid={ `${user.role}_order_details__element-order-details-label-order-id` }
      >
        { `Pedido ${order.id}` }
      </td>

      {
        user.role === 'customer' ? (
          <td
            data-testid={
              `${user.role}_order_details__element-order-details-label-seller-name`
            }
          >
            { `P.Vend: ${order.seller.name}` }
          </td>
        ) : null
      }

      <td
        data-testid={
          `${user.role}_order_details__element-order-details-label-order-date`
        }
      >
        { moment(order.saleDate).utc().format('DD/MM/YYYY') }
      </td>

      <td
        data-testid={
          `${user.role}_order_details__element-order-details-label-delivery-status`
        }
      >
        { order.status }
      </td>

      <td>
        {
          user.role === 'customer' ? (
            <Button
              dataTestId={ `${user.role}_order_details__button-delivery-check` }
              textButton="Marcar com entregue"
              isDisabled
            />
          ) : (
            <>
              <Button
                dataTestId={ `${user.role}_order_details__button-preparing-check` }
                textButton="Preparar Pedido"
                isDisabled={ order.status !== 'Pendente' }
                onClick={ preparing }
              />
              <Button
                dataTestId={ `${user.role}_order_details__button-dispatch-check` }
                textButton="Saiu para entrega"
                isDisabled={ order.status !== 'Preparando' }
                onClick={ dispatch }
              />
            </>
          )
        }
      </td>
    </tr>
  );
}

OrderDetailsLine.defaultProps = {
  preparing: () => console.log(),
  dispatch: () => console.log(),
};

OrderDetailsLine.propTypes = {
  order: PropTypes.shape().isRequired,
  preparing: PropTypes.func,
  dispatch: PropTypes.func,
};

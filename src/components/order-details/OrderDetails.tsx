import React from 'react';
import Icon from './../../images/done.png';
import OrderDetailsStyles from './OrderDetails.module.scss';
import type {TOrder} from "../../services/slices/order";

function OrderDetails({order}:{ order:TOrder }) {

  return (
      <div className={OrderDetailsStyles.order}>
        <p className={`${OrderDetailsStyles.order__number} text text_type_digits-large mb-8`}>
          {order.number}
        </p>
        <p className='text text_type_main-medium mb-15'>
          идентификатор заказа
        </p>
        <div className={`${OrderDetailsStyles.order__icon} mb-15`}>
          <img src={Icon} alt='статус заказа'/>
        </div>
        <p className='text text_type_main-default mb-2'>
          Ваш заказ начали готовить
        </p>
        <p className='text text_type_main-default text_color_inactive mb-15'>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
  );
}

export default OrderDetails;

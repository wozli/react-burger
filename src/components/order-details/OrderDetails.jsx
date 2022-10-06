import React from 'react';
import Icon from './../../images/done.png';
import OrderDetailsStyles from './OrderDetails.module.scss';
import {PROP_ORDER} from "../utils/propTypes";

function OrderDetails({order}) {

  return (
      <div className={OrderDetailsStyles.order}>
        <p className={`${OrderDetailsStyles.order__number} text text_type_digits-large mb-8`}>
          {order.id}
        </p>
        <p className='text text_type_main-medium mb-15'>
          идентификатор заказа
        </p>
        <div className={`${OrderDetailsStyles.order__icon} mb-15`}>
          <img src={Icon} alt='статус заказа'/>
        </div>
        <p className='text text_type_main-default mb-2'>
          {order.text_status}
        </p>
        <p className='text text_type_main-default text_color_inactive mb-15'>
          {order.text_description}
        </p>
      </div>
  );
}

OrderDetails.propTypes = {
  order: PROP_ORDER.isRequired
};

export default OrderDetails;

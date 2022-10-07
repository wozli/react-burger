import React from 'react';
import IngredientCharacteristicStyles from './IngredientCharacteristic.module.scss';
import PropTypes from "prop-types";

function IngredientCharacteristic({title, value}) {
  return (
          <div className={IngredientCharacteristicStyles.characteristic}>
            <p className='text text_type_main-default text_color_inactive mb-2'>
              {title}
            </p>
            <p className='text text_type_digits-default text_color_inactive'>
              {value}
            </p>
          </div>
  );
}

IngredientCharacteristic.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default IngredientCharacteristic;

import React, {FC} from 'react';
import IngredientCharacteristicStyles from './IngredientCharacteristic.module.scss';

type TIngredientCharacteristicProps = {
    title:string,
    value: number
}

const IngredientCharacteristic: FC<TIngredientCharacteristicProps> = ({title, value}) => {
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

export default IngredientCharacteristic;

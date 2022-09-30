import React from 'react';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.scss';
import PropTypes from "prop-types";
import {PROP_INGREDIENTS} from "../utils/propTypes";
import BurgerIngredients from "../burgerIngredients/BurgerIngredients";

function BurgerConstructor({ingredients}) {

  return (
      <section className={`${BurgerConstructorStyles.section} pt-25`}>
        <div className={`${BurgerConstructorStyles.list} custom-scroll mb-10 pr-3`}>
          {ingredients.map((item, index) => (
              <div key={item._id} className={BurgerConstructorStyles.item}>
                {(index !== 0 && index + 1 !== ingredients.length) &&
                  <div className='mr-2'><DragIcon type="primary"/></div>
                }
                <ConstructorElement text={item.name}
                                    type={index === 0 ? 'top' : index + 1 === ingredients.length ? 'bottom' : ''}
                                    isLocked={index === 0 || index + 1 === ingredients.length}
                                    thumbnail={item.image}
                                    price={item.price}/>
              </div>
          ))}
        </div>
        <div className={BurgerConstructorStyles.footer}>
          <div className={`${BurgerConstructorStyles.total} mr-10`}>
            <p className='text text_type_digits-medium mr-2'>610</p>
            <CurrencyIcon type='primary'/>
          </div>
          <Button htmlType='button'
                  type="primary"
                  size="large">Оформить заказ</Button>
        </div>
      </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PROP_INGREDIENTS)
};

export default BurgerConstructor;
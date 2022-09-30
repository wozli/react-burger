import React from 'react';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.scss';
import PropTypes from "prop-types";
import {PROP_INGREDIENTS} from "../utils/propTypes";
import {TYPE_INGREDIENTS} from "../utils/constants";

function BurgerConstructor({ingredients}) {

  const buns = ingredients.filter(ingredient => ingredient.type === TYPE_INGREDIENTS.BUN);
  const noBuns = ingredients.filter(ingredient => ingredient.type !== TYPE_INGREDIENTS.BUN);

  return (
      <section className={`${BurgerConstructorStyles.section} pt-25`}>
        <div className={`${BurgerConstructorStyles.list} custom-scroll mb-10 pr-3`}>

          <div className={BurgerConstructorStyles.item}>
            <ConstructorElement text={`${buns[0].name} (верх)`}
                                type='top'
                                isLocked={true}
                                thumbnail={buns[0].image}
                                price={buns[0].price}/>
          </div>

          {noBuns.map((item) => (
              <div key={item._id} className={BurgerConstructorStyles.item}>
                <div className='mr-2'><DragIcon type="primary"/></div>
                <ConstructorElement text={item.name}
                                    thumbnail={item.image}
                                    price={item.price}/>
              </div>
          ))}

          <div className={BurgerConstructorStyles.item}>
            <ConstructorElement text={`${buns[1].name} (низ)`}
                                type='bottom'
                                isLocked={true}
                                thumbnail={buns[1].image}
                                price={buns[1].price}/>
          </div>
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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PROP_INGREDIENTS).isRequired
};

export default BurgerConstructor;
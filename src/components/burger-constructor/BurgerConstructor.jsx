import React, {useContext} from 'react';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.scss';
import {ConstructorContext} from "../../services/constructorContext";
import PropTypes from "prop-types";

function BurgerConstructor({deleteCartIngredient}) {
  const {totalPrice, sendOrder, selectBun: bun, selectIngredients: ingredients} = useContext(ConstructorContext);

  const notEmptyIngredients = (bun && bun._id) || (ingredients.ingredients && ingredients.ingredients.length);

  return (
      <>
        <section className={`${BurgerConstructorStyles.section} pt-15`}>
          {!notEmptyIngredients && (
              <p className={`${BurgerConstructorStyles.info} text text_type_main-medium`}>Добавьте ингредиенты слева</p>
          )}
          <div className={`${BurgerConstructorStyles.burger} mb-5`}>

            {(bun && bun._id) && (
                <div className={`${BurgerConstructorStyles.item} ml-8`}>
                  <ConstructorElement text={`${bun.name} (верх)`}
                                      type='top'
                                      isLocked={true}
                                      handleClose={() => deleteCartIngredient(bun)}
                                      thumbnail={bun.image}
                                      price={bun.price}/>
                </div>
            )}
            <div className={`${BurgerConstructorStyles.list} custom-scroll`}>
              {ingredients.map((item, index) => (
                  <div key={`${item._id}${index}`} className={BurgerConstructorStyles.item}>
                    <div className='mr-2'>
                      <DragIcon type="primary"/>
                    </div>
                    <ConstructorElement text={item.name}
                                        handleClose={() => deleteCartIngredient(item)}
                                        thumbnail={item.image}
                                        price={item.price}/>
                  </div>
              ))}
            </div>
            {(bun && bun._id) && (
                <div className={`${BurgerConstructorStyles.item} ml-8`}>
                  <ConstructorElement text={`${bun.name} (низ)`}
                                      type='bottom'
                                      isLocked={true}
                                      handleClose={() => deleteCartIngredient(bun)}
                                      thumbnail={bun.image}
                                      price={bun.price}/>
                </div>
            )}
          </div>
          <div className={BurgerConstructorStyles.footer}>
            <div className={`${BurgerConstructorStyles.total} mr-10`}>
              <p className='text text_type_digits-medium mr-2'>{totalPrice.totalPrice}</p>
              <CurrencyIcon type='primary'/>
            </div>
            <Button htmlType='button'
                    type="primary"
                    onClick={sendOrder}
                    size="large">Оформить заказ</Button>
          </div>
        </section>
      </>
  )
}

BurgerConstructor.propTypes = {
  deleteCartIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructor;
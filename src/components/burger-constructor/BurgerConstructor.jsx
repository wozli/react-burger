import React, {useContext, useMemo} from 'react';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.scss';
import {TYPE_INGREDIENTS} from "../utils/constants";
import {ConstructorContext} from "../../services/constructorContenxt";
import PropTypes from "prop-types";

function BurgerConstructor({deleteCartIngredient}) {
  const {stateIngredients, sendOrder} = useContext(ConstructorContext);

  const bun = useMemo(() => stateIngredients.ingredients.find(ingredient => ingredient.type === TYPE_INGREDIENTS.BUN), [stateIngredients.ingredients]);
  const noBuns = useMemo(() => stateIngredients.ingredients.filter(ingredient => ingredient.type !== TYPE_INGREDIENTS.BUN), [stateIngredients.ingredients]);
  const notEmptyIngredients = useMemo(() => stateIngredients.ingredients && stateIngredients.ingredients.length, [stateIngredients.ingredients]);

  return (
      <>
        <section className={`${BurgerConstructorStyles.section} pt-15`}>
          {!notEmptyIngredients && (
              <p className={`${BurgerConstructorStyles.info} text text_type_main-medium`}>Добавьте ингредиенты с
                лева</p>
          )}
          <div className={`${BurgerConstructorStyles.burger} mb-5`}>

            {bun && (
                <div className={`${BurgerConstructorStyles.item} ml-8`}>
                  <ConstructorElement text={`${bun.name} (верх)`}
                                      type='top'
                                      handleClose={() => deleteCartIngredient(bun)}
                                      thumbnail={bun.image}
                                      price={bun.price}/>
                </div>
            )}
            <div className={`${BurgerConstructorStyles.list} custom-scroll`}>
              {noBuns.map((item) => (
                  <div key={item._id} className={BurgerConstructorStyles.item}>
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
            {bun && (
                <div className={`${BurgerConstructorStyles.item} ml-8`}>
                  <ConstructorElement text={`${bun.name} (низ)`}
                                      type='bottom'
                                      handleClose={() => deleteCartIngredient(bun)}
                                      thumbnail={bun.image}
                                      price={bun.price}/>
                </div>
            )}
          </div>
          <div className={BurgerConstructorStyles.footer}>
            <div className={`${BurgerConstructorStyles.total} mr-10`}>
              <p className='text text_type_digits-medium mr-2'>{stateIngredients.totalPrice}</p>
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
import React, {useCallback} from 'react';
import {useDrop} from "react-dnd";
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {constructorSlice} from "../../services/slices/constructor";
import {orderSlice} from "../../services/slices/order";
import {getOrderInfo} from "../../services/slices/order";
import Modal from "../common/modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import {TEXT_ERROR_NO_BUN} from "../utils/constants";
import OrderedItem from "../ordered-item/OrderedItem";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const {actions: constructorActions} = constructorSlice;
  const {actions: orderActions} = orderSlice;
  const {order, openModalOrder} = useSelector(state => state.order);
  const {ingredients, bun, totalPrice} = useSelector(state => state.constructorReducer);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      addCartIngredient(item);
    },
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);

    dispatch(constructorActions.updateListIngredients(newCards));
  }, [ingredients, dispatch]);

  const notEmptyIngredients = (bun && bun._id) || (ingredients && ingredients.length);

  const addCartIngredient = (ingredient) => {
    dispatch(constructorActions.addCartIngredient(ingredient));
  }

  const deleteCartIngredient = (item, index) => {
    dispatch(constructorActions.deleteCartIngredient({item, index}));
  }

  const sendOrder = async () => {
    if (bun && bun._id) {
      dispatch(await getOrderInfo([bun._id, ...ingredients.map(ingredient => ingredient._id), bun._id]));
    } else {
      alert(TEXT_ERROR_NO_BUN)
    }
  }

  const handlerCloseModalOrder = () => {
    dispatch(constructorActions.resetCart());
    dispatch(orderActions.resetOrder());
  }

  return (
      <>
        <section className={`${BurgerConstructorStyles.section} pt-15`} ref={dropTarget}>
          {!notEmptyIngredients && (
              <p className={`${BurgerConstructorStyles.info} text text_type_main-medium`}>Перетащите ингредиенты
                слева</p>
          )}
          <div className={`${BurgerConstructorStyles.burger} mb-5`}>

            {(bun && bun._id) && (
                <OrderedItem item={bun}
                             isBun={true}
                             type='top'
                             moveCard={moveCard}
                             deleteCartIngredient={deleteCartIngredient}/>
            )}
            <div className={`${BurgerConstructorStyles.list} custom-scroll`}>
              {ingredients.map((item, index) => (
                  <OrderedItem item={item}
                               key={`${item._id}${index}`}
                               isBun={false}
                               type='middle'
                               index={index}
                               moveCard={moveCard}
                               deleteCartIngredient={deleteCartIngredient}/>
              ))}
            </div>
            {(bun && bun._id) && (
                <OrderedItem item={bun}
                             isBun={true}
                             type='bottom'
                             moveCard={moveCard}
                             deleteCartIngredient={deleteCartIngredient}/>
            )}
          </div>
          <div className={BurgerConstructorStyles.footer}>
            <div className={`${BurgerConstructorStyles.total} mr-10`}>
              <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
              <CurrencyIcon type='primary'/>
            </div>
            <Button htmlType='button'
                    type="primary"
                    onClick={sendOrder}
                    size="large">Оформить заказ</Button>
          </div>
        </section>
        {openModalOrder && (
            <Modal onClose={handlerCloseModalOrder}>
              <OrderDetails order={order}/>
            </Modal>
        )}
      </>
  )
}

export default BurgerConstructor;
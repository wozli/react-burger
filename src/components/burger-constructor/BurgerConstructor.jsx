import React, {useCallback} from 'react';
import {useDrop} from "react-dnd";
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getOrderInfo} from "../../services/slices/order";
import Modal from "../common/modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import {TEXT_ERROR_NO_BUN} from "../utils/constants";
import OrderedItem from "../ordered-item/OrderedItem";
import {resetOrder} from "../../services/slices/order";
import {addCartIngredient, resetCart, deleteCartIngredient, updateListIngredients} from "../../services/slices/constructor";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

function BurgerConstructor() {
  const history = useHistory();
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {order, openModalOrder} = useSelector(state => state.order);
  const {ingredients, bun, totalPrice} = useSelector(state => state.constructorReducer);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      handlerAddCartIngredient(item);
    },
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);

    dispatch(updateListIngredients(newCards));
  }, [ingredients, dispatch]);

  const notEmptyIngredients = (bun && bun._id) || (ingredients && ingredients.length);

  const handlerAddCartIngredient = (ingredient) => {
    dispatch(addCartIngredient(ingredient));
  }

  const handleDeleteCartIngredient = (item, index) => {
    dispatch(deleteCartIngredient({item, index}));
  }

  const sendOrder = async () => {
    if (!user) {
      toast.error('Для оформления заказа авторизуйтесь', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      history.replace({ pathname: '/login' });
      return;
    }
    if (bun?._id) {
      dispatch(await getOrderInfo([bun._id, ...ingredients.map(ingredient => ingredient._id), bun._id]));
    } else {
      toast.error(TEXT_ERROR_NO_BUN, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }

  const handlerCloseModalOrder = () => {
    dispatch(resetCart());
    dispatch(resetOrder());
  }

  return (
      <>
        <section className={`${BurgerConstructorStyles.section} pt-15`} ref={dropTarget}>
          {!notEmptyIngredients && (
              <p className={`${BurgerConstructorStyles.info} text text_type_main-medium`}>Перетащите ингредиенты
                слева</p>
          )}
          <div className={`${BurgerConstructorStyles.burger} mb-5`}>

            {(bun?._id) && (
                <OrderedItem item={bun}
                             isBun={true}
                             type='top'
                             moveCard={moveCard}
                             deleteCartIngredient={handleDeleteCartIngredient}/>
            )}
            <div className={`${BurgerConstructorStyles.list} custom-scroll`}>
              {ingredients.map((item, index) => (
                  <OrderedItem item={item}
                               key={`${item._id}${index}`}
                               isBun={false}
                               type='middle'
                               index={index}
                               moveCard={moveCard}
                               deleteCartIngredient={handleDeleteCartIngredient}/>
              ))}
            </div>
            {(bun?._id) && (
                <OrderedItem item={bun}
                             isBun={true}
                             type='bottom'
                             moveCard={moveCard}
                             deleteCartIngredient={handleDeleteCartIngredient}/>
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
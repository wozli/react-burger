import React, {useEffect, useState, useReducer} from 'react';
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import Loader from "../../components/common/loader/loader";
import ConstructorStyles from './Constructor.module.scss';
import {GET_INGREDIENTS, POST_ORDER} from "../../components/utils/api";
import {getRequest, postRequest} from "../../components/utils/requests";
import {
  TEXT_ERROR_ADD,
  TEXT_ERROR_BUN_ALREADY_ADD,
  TEXT_ERROR_REQUEST,
  TYPE_INGREDIENTS
} from "../../components/utils/constants";
import {ProductContext, ConstructorContext} from "../../services/constructorContenxt";
import {ACTIONS_REDUCER_INGREDIENTS} from "../../components/utils/constants";
import {useToggle} from "../../hooks/useToggle";
import Modal from "../../components/common/modal/Modal";
import OrderDetails from "../../components/order-details/OrderDetails";

const initialStateIngredients = {ingredients: [], totalPrice: 0,};

function reducerIngredients(state, action) {
  switch (action.type) {
    case ACTIONS_REDUCER_INGREDIENTS.ADD:
      return {
        ingredients: [...state.ingredients, action.payload],
        totalPrice: state.totalPrice += (action.payload.type === TYPE_INGREDIENTS.BUN ? action.payload.price * 2 : action.payload.price)
      };
    case ACTIONS_REDUCER_INGREDIENTS.DELETE:
      return {
        ingredients: state.ingredients.filter(ingredient => ingredient._id !== action.payload._id),
        totalPrice: state.totalPrice -= (action.payload.type === TYPE_INGREDIENTS.BUN ? action.payload.price * 2 : action.payload.price)
      };
    case ACTIONS_REDUCER_INGREDIENTS.RESET:
      return initialStateIngredients;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function Constructor() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState(null);
  const [stateIngredients, dispatchIngredients] = useReducer(reducerIngredients, initialStateIngredients, undefined);
  const {isToggle: isToggleLoader, close: closeLoader, open: openLoader} = useToggle(false);
  const {isToggle: isToggleModalOrder, toggle: toggleModalOrder} = useToggle(false);

  useEffect(() => {
    openLoader();
    getRequest(GET_INGREDIENTS)
        .then(res => {
          closeLoader();
          setData(res.data.data);
        })
        .catch(err => {
          closeLoader();
          alert(TEXT_ERROR_REQUEST);
          console.log(err);
        });
  }, []);

  const sendOrder = () => {
    if (stateIngredients.ingredients && stateIngredients.ingredients.length) {
      openLoader();
      postRequest(POST_ORDER, {
        ingredients: stateIngredients.ingredients.map(ingredient => ingredient._id)
      })
          .then(res => {
            setOrder(res.data.order);
            closeLoader();
            toggleModalOrder();
          })
          .catch(err => {
            closeLoader();
            alert(TEXT_ERROR_REQUEST);
            console.log(err);
          });
    }
  }

  const addCartIngredient = (ingredient = {}) => {
    const isBunAlreadyAdd = (ingredient.type === TYPE_INGREDIENTS.BUN && stateIngredients.ingredients.find(item => item.type === TYPE_INGREDIENTS.BUN));
    if (isBunAlreadyAdd) {
      alert(TEXT_ERROR_BUN_ALREADY_ADD);
      return;
    }
    const idx = stateIngredients.ingredients.findIndex(item => item._id === ingredient._id);
    if (idx === - 1) {
      dispatchIngredients({
        type: ACTIONS_REDUCER_INGREDIENTS.ADD,
        payload: ingredient
      });
    } else {
      alert(TEXT_ERROR_ADD);
    }
  }

  const deleteCartIngredient = (ingredient = {}) => {
    dispatchIngredients({
      type: ACTIONS_REDUCER_INGREDIENTS.DELETE,
      payload: ingredient
    });
  }

  const handlerCloseModalOrder = () => {
    toggleModalOrder();
    setOrder(null);
    dispatchIngredients({
      type: ACTIONS_REDUCER_INGREDIENTS.RESET
    });
  }

  return (
      <>
        <main className={ConstructorStyles.constructor}>
          <div className={`${ConstructorStyles.constructor__inner} container`}>
            {(data && data.length) && (
                <>
                  <ProductContext.Provider value={{data}}>
                    <BurgerIngredients addCartIngredient={addCartIngredient}/>
                  </ProductContext.Provider>
                  <ConstructorContext.Provider value={{stateIngredients, sendOrder}}>
                    <BurgerConstructor deleteCartIngredient={deleteCartIngredient}/>
                  </ConstructorContext.Provider>
                </>
            )}
          </div>
        </main>
        {isToggleLoader && (
            <Loader/>
        )}
        {isToggleModalOrder && (
            <Modal onClose={handlerCloseModalOrder}>
              <OrderDetails order={order}/>
            </Modal>
        )}
      </>
  );
}

export default Constructor;

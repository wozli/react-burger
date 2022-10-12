import React, {useEffect, useState, useReducer} from 'react';
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import Loader from "../../components/common/loader/loader";
import ConstructorStyles from './Constructor.module.scss';
import {GET_INGREDIENTS, POST_ORDER} from "../../components/utils/api";
import {getRequest, postRequest} from "../../components/utils/requests";
import {
  TEXT_ERROR_EMPTY_CONSTRUCTOR,
  TEXT_ERROR_REQUEST,
  TYPE_INGREDIENTS
} from "../../components/utils/constants";
import {ConstructorContext} from "../../services/constructorContext";
import {ACTIONS_REDUCER_TOTAL_PRICE} from "../../components/utils/constants";
import {useToggle} from "../../hooks/useToggle";
import Modal from "../../components/common/modal/Modal";
import OrderDetails from "../../components/order-details/OrderDetails";
import {ProductContext} from "../../services/productContext";

const initialTotalPrice = {totalPrice: 0};

function reducerTotalPrice(state, action) {
  switch (action.type) {
    case ACTIONS_REDUCER_TOTAL_PRICE.ADD_COST:
      return {
        totalPrice: state.totalPrice + (action.payload.type === TYPE_INGREDIENTS.BUN ? action.payload.price * 2 : action.payload.price)
      };
    case ACTIONS_REDUCER_TOTAL_PRICE.TAKE_AWAY_COST:
      return {
        totalPrice: state.totalPrice - (action.payload.type === TYPE_INGREDIENTS.BUN ? action.payload.price * 2 : action.payload.price)
      };
    case ACTIONS_REDUCER_TOTAL_PRICE.RESET:
      return initialTotalPrice;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function Constructor() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState(null);
  const [selectBun, setSelectBun] = useState({});
  const [selectIngredients, setSelectIngredients] = useState([]);
  const [totalPrice, dispatchTotalPrice] = useReducer(reducerTotalPrice, initialTotalPrice, undefined);

  const {isToggle: isToggleLoader, toggle: toggleLoader} = useToggle(false);
  const {isToggle: isToggleModalOrder, toggle: toggleModalOrder} = useToggle(false);

  useEffect(() => {
    toggleLoader();
    getRequest(GET_INGREDIENTS)
        .then(res => {
          toggleLoader();
          setData(res.data.data);
        })
        .catch(err => {
          toggleLoader();
          alert(TEXT_ERROR_REQUEST);
          console.log(err);
        });
  }, []);

  const sendOrder = () => {
    if (selectBun && selectBun._id && selectIngredients && selectIngredients.length) {
      toggleLoader();
      postRequest(POST_ORDER, {
        ingredients: [selectBun._id, ...selectIngredients.map(ingredient => ingredient._id), selectBun._id]
      })
          .then(res => {
            setOrder(res.data.order);
            toggleLoader();
            toggleModalOrder();
          })
          .catch(err => {
            toggleLoader();
            alert(TEXT_ERROR_REQUEST);
            console.log(err);
          });
    } else {
      alert(TEXT_ERROR_EMPTY_CONSTRUCTOR);
    }
  }

  const addCartIngredient = (ingredient = {}) => {
    if (ingredient.type === TYPE_INGREDIENTS.BUN) {
      if (selectBun && selectBun._id) {
        dispatchTotalPrice({
          type: ACTIONS_REDUCER_TOTAL_PRICE.TAKE_AWAY_COST,
          payload: selectBun
        });
      }
      setSelectBun(ingredient);
    } else {
      setSelectIngredients(ingredients => [...ingredients, ingredient])
    }
    dispatchTotalPrice({
      type: ACTIONS_REDUCER_TOTAL_PRICE.ADD_COST,
      payload: ingredient
    });
  }

  const deleteCartIngredient = (ingredient = {}) => {
    setSelectIngredients(ingredients => ingredients.filter(item => item._id !== ingredient._id));
    dispatchTotalPrice({
      type: ACTIONS_REDUCER_TOTAL_PRICE.TAKE_AWAY_COST,
      payload: ingredient
    });
  }

  const handlerCloseModalOrder = () => {
    toggleModalOrder();
    setOrder(null);
    setSelectBun({});
    setSelectIngredients([]);
    dispatchTotalPrice({
      type: ACTIONS_REDUCER_TOTAL_PRICE.RESET
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
                  <ConstructorContext.Provider value={{totalPrice, sendOrder, selectBun, selectIngredients}}>
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

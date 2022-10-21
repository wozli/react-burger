import {ingredientsSlice} from "../slices/ingredients";
import {constructorSlice} from "../slices/constructor";
import {orderSlice} from "../slices/order";
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  constructorReducer: constructorSlice.reducer,
  order: orderSlice.reducer,
})
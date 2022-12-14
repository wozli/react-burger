import {combineReducers} from 'redux';
import {ingredientsSlice} from "../slices/ingredients";
import {constructorSlice} from "../slices/constructor";
import {orderSlice} from "../slices/order";
import {authSlice} from "../slices/auth";
import {feedReducer} from "../live-feed/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  constructorReducer: constructorSlice.reducer,
  order: orderSlice.reducer,
  auth: authSlice.reducer,
  feed: feedReducer,
})
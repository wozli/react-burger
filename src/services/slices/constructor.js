import {createSlice} from '@reduxjs/toolkit';
import {TYPE_INGREDIENTS} from "../../components/utils/constants";

const initialState = {
  ingredients: [],
  bun: null,
  totalPrice: 0
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addCartIngredient: (state, {payload}) => {
      if (payload.type === TYPE_INGREDIENTS.BUN) {
        if (state.bun && state.bun._id) {
          state.totalPrice = state.totalPrice - state.bun.price * 2;
        }
        state.bun = payload;
      } else {
        state.ingredients = [...state.ingredients, payload];
      }
      state.totalPrice = state.totalPrice + (payload.type === TYPE_INGREDIENTS.BUN ? payload.price * 2 : payload.price);
    },
    deleteCartIngredient: (state, {payload}) => {
      state.ingredients = state.ingredients.filter((ingredient, index) => index !== payload.index);
      state.totalPrice = state.totalPrice - payload.item.price;
    },
    updateListIngredients: (state, {payload}) => {
      state.ingredients = payload;
    },
    resetCart: () => initialState
  },
})
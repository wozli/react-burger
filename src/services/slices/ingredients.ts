import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {GET_INGREDIENTS} from "../../components/utils/api";
import {TEXT_ERROR_REQUEST} from "../../components/utils/constants";
import axios from "axios";
import type {TIngredient} from "../../components/utils/types";

export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients",
    async () => {
      const response = await axios.get<{data: TIngredient[], success: boolean}>(GET_INGREDIENTS);
      return response.data;
    }
);

type TInitialState = {
  ingredients: TIngredient[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
  currentIngredient: TIngredient | null,
  openModalIngredient: boolean,
};


const initialState:TInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredient: null,
  openModalIngredient: false,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
      state.openModalIngredient = true;
    },
    closeModalIngredient: (state) => {
      state.currentIngredient = null;
      state.openModalIngredient = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.ingredientsRequest = true;
      state.ingredientsFailed = false;
    })
    builder.addCase(getIngredients.fulfilled, (state, {payload}) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = false;
      state.ingredients = payload.data;
    })
    builder.addCase(getIngredients.rejected, (state, {payload}) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = true;
      alert(TEXT_ERROR_REQUEST);
    })
  },
});

export const { closeModalIngredient, setCurrentIngredient } = ingredientsSlice.actions
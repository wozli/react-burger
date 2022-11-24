import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getRequest} from "../../components/utils/requests";
import {GET_INGREDIENTS} from "../../components/utils/api";
import {TEXT_ERROR_REQUEST} from "../../components/utils/constants";

export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients",
    async () => {
      const response = await getRequest(GET_INGREDIENTS);
      return response.data;
    }
);

const initialState = {
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
  extraReducers: {
    [getIngredients.pending]: (state) => {
        state.ingredientsRequest = true;
        state.ingredientsFailed = false;
    },
    [getIngredients.fulfilled]: (state, {payload}) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = false;
      state.ingredients = payload.data;
    },
    [getIngredients.rejected]: (state) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = true;
      alert(TEXT_ERROR_REQUEST);
    },
  },
});

export const { closeModalIngredient, setCurrentIngredient } = ingredientsSlice.actions
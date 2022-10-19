import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postRequest} from "../../components/utils/requests";
import {POST_ORDER} from "../../components/utils/api";
import {TEXT_ERROR_REQUEST} from "../../components/utils/constants";

export const getOrderInfo = createAsyncThunk(
    "order/getOrderInfo",
    async (ingredientsId) => {
      return await postRequest(POST_ORDER, {
        ingredients: ingredientsId
      });
    }
);

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  openModalOrder: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  extraReducers: {
    [getOrderInfo.pending]: (state) => {
      state.orderRequest = true;
      state.orderFailed = false;
    },
    [getOrderInfo.fulfilled]: (state, {payload}) => {
      state.order = payload.data.order;
      state.orderRequest = false;
      state.orderFailed = false;
      state.openModalOrder = true;
    },
    [getOrderInfo.rejected]: (state) => {
      state.orderRequest = false;
      state.orderFailed = true;
      alert(TEXT_ERROR_REQUEST);
    },
  },
})
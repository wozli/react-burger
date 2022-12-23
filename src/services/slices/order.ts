import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL, POST_ORDER} from "../../components/utils/api";
import {TEXT_ERROR_REQUEST} from "../../components/utils/constants";
import axios from "axios";
import {getCookie} from "../../components/utils/cookie";

export const getOrderInfo = createAsyncThunk(
    "order/getOrderInfo",
    async (ingredientsId: string[]) => {
        const response = await axios.post<{ name: string, success: boolean, order: TOrder }>(BASE_URL+POST_ORDER, {
            ingredients: ingredientsId,
        }, {
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            }
        });
        return response.data;
    }
);

export type TOrder = { number: number };

type TInitialState = {
    order: null | TOrder,
    orderRequest: boolean,
    orderFailed: boolean,
    openModalOrder: boolean,
}

const initialState: TInitialState = {
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
    extraReducers: (builder) => {
        builder.addCase(getOrderInfo.pending, (state) => {
            state.orderRequest = true;
            state.orderFailed = false;
        })
        builder.addCase(getOrderInfo.fulfilled, (state, {payload}) => {
            state.order = payload.order;
            state.orderRequest = false;
            state.orderFailed = false;
            state.openModalOrder = true;
        })
        builder.addCase(getOrderInfo.rejected, (state) => {
            state.orderRequest = false;
            state.orderFailed = true;
            state.openModalOrder = false;
            state.order = null;
            alert(TEXT_ERROR_REQUEST);
        })
    },
});

export const {resetOrder} = orderSlice.actions;
export default orderSlice.reducer;
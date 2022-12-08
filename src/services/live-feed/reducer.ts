import {createReducer} from "@reduxjs/toolkit";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";
import {TLiveFeedStore, WebsocketStatus} from "../../components/utils/socket-types";

export const initialState: TLiveFeedStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  feed: null,
}

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
      state.feed = null;
    })
    .addCase(wsError, (state, action) => {
      state.status = WebsocketStatus.OFFLINE;
      state.feed = null;
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.feed = action.payload;
    })
})
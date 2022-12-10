import { createAction } from "@reduxjs/toolkit";
import {TLiveFeed} from "../../components/utils/socket-types";

export const connect = createAction<string, 'LIVE_FEED_CONNECT'>('LIVE_FEED_CONNECT')
export const disconnect = createAction('LIVE_FEED_DISCONNECT');
export const wsConnecting = createAction('LIVE_FEED_WS_CONNECTING');
export const wsOpen = createAction('LIVE_FEED_WS_OPEN');
export const wsClose = createAction('LIVE_FEED_WS_CLOSE');
export const wsMessage = createAction<TLiveFeed, 'LIVE_FEED_WS_MESSAGE'>('LIVE_FEED_WS_MESSAGE');
export const wsError = createAction<string, 'LIVE_FEED_WS_ERROR'>('LIVE_FEED_WS_ERROR');

export const wsActions = {
    connect,
    disconnect,
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage,
};

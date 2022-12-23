import React from 'react';
import ReactDOM from 'react-dom/client';
import {rootReducer} from "./services/reducers";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import './styles/index.scss';
import {createSocketMiddleware} from "./services/middleware/socket-middleware";
import {wsActions} from "./services/live-feed/actions";
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';

//тесты без document.createElement('div') незапускаются
const rootElement = document.getElementById('root') || document.createElement('div');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

const websocketMiddleware = createSocketMiddleware(wsActions);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger, thunk, websocketMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import {rootReducer} from "./services/reducers";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import './styles/index.scss';

import App from './components/app/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
 * @Author: Leo
 * @Date: 2022-09-29 16:01:09
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 21:02:48
 * @FilePath: \coding-challenge-frontend\src\index.js
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './rootStyle.scss';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

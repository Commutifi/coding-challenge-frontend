import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContextProvider } from './context/appContext';
import App from './App.jsx';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
);

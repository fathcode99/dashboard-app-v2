import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

// import { BrowserRouter } from 'react-router-dom'
import allReducer from './reducer'

const globalState = createStore(allReducer, applyMiddleware(ReduxThunk))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={globalState}> 
        <App /> 
    </Provider>
  </React.StrictMode>
);

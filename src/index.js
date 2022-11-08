import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import { BrowserRouter } from 'react-router-dom'
import allReducer from './reducer'

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const globalState = createStore(allReducer, applyMiddleware(ReduxThunk))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={globalState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

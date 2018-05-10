import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers/index.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducer, initialState}  from '../reducers/index';
import thunk from 'redux-thunk';
import {  routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension';

let history
console.log(process.env.PORT)
if (process.env.PORT != 3022) {
  const createBrowserHistory = require('history/createBrowserHistory').default

  history = createBrowserHistory()
}

export {history};


export default function configureStore(initialState) {

  const store = compose(applyMiddleware(thunk))(createStore)(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('./../reducers', () => {
      const nextRootReducer = require('./../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}


import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import {loadState, saveState} from './store/localStorage'

import configureStore from './store/configureStore'
import App from './containers/App'

const state = window.__STATE__ ;


// delete window.__STATE__;
const persistedState = loadState(),
store = configureStore(persistedState);

store.subscribe(() => {
  saveState(store.getState());
});


hydrate(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter> 
  </Provider>,
  document.getElementById('app')
)




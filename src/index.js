import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from './containers/App'
import configureStore, {history} from './store/configureStore'
import {loadState, saveState} from './store/localStorage'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import Web3 from 'web3';
let web3;

const persistedState = loadState(),
store = configureStore(persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

let web3Found = false;
window.addEventListener('load', function() {
    if (window.web3 && window.web3.currentProvider.isMetaMask) {
        web3Found = true;
        web3 = new Web3(window.web3.currentProvider);
        console.log();
        window.web3Found = web3Found;
        window.metamask = web3;
        //this.props.web3 = web3;
    }
    // this.props.web3Found = web3Found;

    // store.dispatch({ type: 'ETH_LOADED', value: web3 });
    // store.dispatch({ type: 'WEB3_FOUND', value: web3Found });

    // console.log(web3)
    // Now you can start your app & access web3 freely:
    // startApp()
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter> 
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const App = require('./containers/App').default;
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>  
      </Provider>,
      document.getElementById('app')
    );
  });
}

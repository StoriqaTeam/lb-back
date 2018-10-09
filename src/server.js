import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './ssr/App'


module.exports = function render(route, state) {

  const store = configureStore()
  let content = ReactDOMServer.renderToString(
    <Provider store={store} >            
      <App route={route} {...state}/>
    </Provider>
  );


  return content;
}


//структура такая же, как на клиенте, только вместо ReactDOM рендерим html в строку
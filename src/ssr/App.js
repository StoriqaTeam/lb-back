import 'babel-polyfill'
import React, { Component }   from 'react'
import {  Route, BrowserRouter } from 'react-router-dom';
import Routes                       from './routes'

class App extends Component {


  render() {
    return (
      <Routes {...this.props} />
    )
  }
}

export default App

//Основной контейнер для рендера на стороне сервера
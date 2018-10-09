import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import {  BrowserRouter }   from 'react-router-dom';
import { connect }            from 'react-redux'
import { bindActionCreators }    from 'redux'
import * as userActions          from './../actions/userActions'
import {getCodeFromUrl, addOneYear}        from './../constants/constantsApp'
import Routes               from './routes'
//import css                  from './style.css'
import css2                 from './css.css'

class App extends Component {

	componentDidMount(){
		let ref = getCodeFromUrl('ref', '?')
		if (ref && typeof(ref) != 'object'){
			let cookies = new Cookies;
      cookies.set('ref',  ref, {expires: addOneYear(), path: '/'})		
    }
	}


	render(){
		let cookies = new Cookies,
		token = cookies.get('token');
		return (
			<BrowserRouter>
				<Routes {...this.props}/>
			</BrowserRouter>
				
		)
	}
}


function mapStateToProps(state) {
  return {
    user:   state.userReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions:   bindActionCreators(userActions,   dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


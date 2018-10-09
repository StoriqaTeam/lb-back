import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import SignIn               from './SignIn'
import SignUp               from './SignUp'
import css                  from './style.css'

class LoginBlock extends Component  {

	constructor(){
		super()
		this.state = {
			action: 'signIn'
		}
	}

	render(){

		return 	(
				this.state.action === 'signIn'
				? <SignIn switch = {() => this.setState({action: 'signUp'})} closePopup={() => this.props.closePopup()}/>
				: <SignUp switch = {() => this.setState({action: 'signIn'})} closePopup={() => this.props.closePopup()}/>
		)			
	}
	
}

export default LoginBlock
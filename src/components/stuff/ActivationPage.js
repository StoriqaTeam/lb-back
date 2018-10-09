import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import {  Route, Switch, Redirect } from 'react-router-dom'
import {API_URL}               from './../../constants/constantsAPI' 
import {getCodeFromUrl}     from './../../constants/constantsApp'

class ActivationPage extends Component {

	componentDidMount(){
		let hash = getCodeFromUrl('key', '?')
		if (hash) {
			this.activateEmail(hash)
		}
	}

	async activateEmail(hash){
 		let headers = new Headers();
 		headers.append('Content-Type', 'application/json')
 		let user  = await fetch(`${API_URL}/api/v1/user/activate`,{
 			method: 'POST',
 			headers: headers,
 			body: JSON.stringify({
 				hash: hash
 			})
 		})
 		.then(
 			res => res.json(),
 			err => err
 		)
 		.then (json => {
 			console.log(json)
 			return json.status === 'success' ? json.message : null
 		})
 		console.log(user)
 		return user && this.props.userActions.getProfile(user)
 	}


	render(){
		let cookies = new Cookies,
		token = cookies.get('token');
		return this.props.user
		? <Redirect to='/profile' />
		: null
	}

}

export default ActivationPage


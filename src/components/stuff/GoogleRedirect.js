import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import { connect }            from 'react-redux'
import * as userActions       from './../../actions/userActions'
import { bindActionCreators } from 'redux'
import {getCodeFromUrl, setTokenCookie}         from './../../constants/constantsApp'
import {API_URL, GET_USER}         from './../../constants/constantsAPI'

class GoogleRedirect extends Component {

	componentDidMount(){
		let accessToken =  getCodeFromUrl('access_token', '#')
		return accessToken ? this.getUser(accessToken) : true /*close()*/;
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.user){
			close();
		}
	}

	async getUser(accessToken){
		let googleProfile =	await fetch(`https://www.googleapis.com/plus/v1/people/me?access_token=${accessToken}&scope=https://www.googleapis.com/auth/profile`,{
			method: 'GET'
		})
		.then(
			res => res.json(),
			err => err
		)
		.then(json => {
			return json.id && json	
		})
		console.log(googleProfile)
		if (googleProfile){
			let user  = await fetch(`${API_URL}/api/v1/auth-social`,{
		 			method: 'POST',
		 			headers: new Headers({
						'Content-Type': 'application/json'		 				
		 			}),
		 			body: JSON.stringify( {	
						profile:   googleProfile,
						provider: 'google'
					})
		 		})
		 		.then(
		 			res => res.json(),
		 			err => err
		 		)
		 		.then (json => {
		 			console.log(json)
		 			setTokenCookie(json.token)
		 			return json.user || null
		 		})	
		 		console.log(user)

		 		return user && this.props.userActions.getProfile(user) 
		 	} 		
	}

	render(){
		let cookies = new Cookies,
		token = cookies.get('token');
		return 	null		
	}
}


function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions:   bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleRedirect)



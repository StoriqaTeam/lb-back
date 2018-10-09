import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import { connect }            from 'react-redux'
import * as userActions       from './../../actions/userActions'
import { bindActionCreators } from 'redux'
import {getCodeFromUrl, setTokenCookie}         from './../../constants/constantsApp'
import {API_URL}               from './../../constants/constantsAPI' 

class FBRedirect extends Component {

	componentDidMount(){
		let accessToken =  getCodeFromUrl('access_token')
		return accessToken ? this.getUser(accessToken) : close();
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.user){
			close();
		}
	}

	async getUser(accessToken){
		let fbProfile =	await fetch(`https://graph.facebook.com/me?fields=id,first_name,last_name,birthday,picture.width(250).height(250),email&access_token=${accessToken}`,{
			method: 'GET'
		})
		.then(
			res => res.json(),
			err => err
		)
		.then(json => {
			return json.id && json	
		})
		console.log(fbProfile)
 		let headers = new Headers();
		headers.append('Content-Type', 'application/json')
		if (fbProfile){
			let cookies = new Cookies;
			let user  = await fetch(`${API_URL}/api/v1/auth-social`,{
		 			method: 'POST',
		 			headers: headers,
		 			body: JSON.stringify({
		 					provider: 'facebook', 
		 					profile: fbProfile
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

export default connect(mapStateToProps, mapDispatchToProps)(FBRedirect)



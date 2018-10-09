import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import { connect }            from 'react-redux'
import * as userActions       from './../../actions/userActions'
import { bindActionCreators } from 'redux'
import {getCodeFromUrl}         from './../../constants/constantsApp'

class TwRedirect extends Component {

	componentDidMount(){

	}

	componentWillReceiveProps(nextProps){
		if (nextProps.user){
			// close();
		}
	}

	// async getUser(accessToken){
	// 	let fbProfile =	await fetch(`https://graph.facebook.com/me?fields=id,first_name,last_name,birthday,picture,email&access_token=${accessToken}`,{
	// 		method: 'GET'
	// 	})
	// 	.then(
	// 		res => res.json(),
	// 		err => err
	// 	)
	// 	.then(json => {
	// 		return json.id && json	
	// 	})
	// 	console.log(fbProfile)
 // 		let headers = new Headers();
	// 	headers.append('Content-Type', 'application/json')
	// 	return
	// 	if (fbProfile){
	// 		let user  = await fetch(`http://localhost:5000/api/v1/soc_auth`,{
	// 	 			method: 'POST',
	// 	 			headers: headers,
	// 	 			body: JSON.stringify({
	// 	 				options: {
	// 	 					provider: 'fb', 
	// 	 					id:  fbProfile.id
	// 	 				},
	// 	 				data: {
	// 	 					name:    fbProfile.first_name,
	// 	 					surname: fbProfile.last_name,
	// 	 					img:     fbProfile.picture.data.url
	// 	 				}
	// 	 			})
	// 	 		})
	// 	 		.then(
	// 	 			res => res.json(),
	// 	 			err => err
	// 	 		)
	// 	 		.then (json => {
	// 	 			console.log(json)
	// 	 			return json.status === 'success' ? json.message : null
	// 	 		})	
	// 	 		console.log(user)
	// 	 		return user && this.props.userActions.getProfile(user) 
	// 	 	} 		


	//}

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

export default connect(mapStateToProps, mapDispatchToProps)(TwRedirect)




import ReactDOM from 'react-dom';

import React, {Component} from 'react'
import  {Cookies}            from "react-cookie"
import {fbAppId, setTokenCookie}             from './../../../constants/constantsApp' 
import {API_URL}     from './../../../constants/constantsAPI' 

import TelegramLoginButton from 'react-telegram-login';
import { connect }            from 'react-redux'
import * as userActions       from './../../../actions/userActions'
import { bindActionCreators } from 'redux'



import style              from './style.css'

class SocialLogin extends Component {


 
// componentDidMount(){
// 			ReactDOM.render(
//   <TelegramLoginButton dataOnauth={this.handleTelegramResponse} botName="OdauBot" />,
//   document.getElementById('telegramButton')
// );

// }
	onFailed(){}
	onSuccess(res){
		console.log(res)
	}
 	async getTwitterToken(e){
 		e.preventDefault()
 		let cookies = new Cookies
 		let headers = new Headers();
 		headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
 		headers.append('Authorization', 'Basic YmJDaWpydHZPTE9JYXcwZjd5aWxiald5QTpDVFZXNFdiNGV4bG9kYWVhM2RZcE03SDhWODJmTERGMEtWQ2Mxd25xc3p6QndnVjNVOQ==')
 		let user  = await fetch(`https://api.twitter.com/oauth2/token`,{
 			method: 'POST',
 			headers: headers,
 			mode: 'no-cors',
 			body: 'grant_type=client_credentials'
 		})
 		.then(
 			res => {
 				console.log(res); return res.json()
 			},
 			err => err
 		)
 		.then (json => {
 			console.log(json)
 			cookies.set('twi', json)
 		})
 	}

	render(){
 		let component = this
		const handleTelegramResponse = async (response) =>{
		  console.log(response);
		  let cookies = new Cookies;
		   		let headers = new Headers();
		 		headers.append('Content-Type', 'application/json')
					let user  = await fetch(`${API_URL}/api/v1/auth-social`,{
				 			method: 'POST',
				 			headers: headers,
				 			body: JSON.stringify({
				 					provider: 'telegram', 
				 					profile: response
				 			})
				 		})
				 		.then(
				 			res => res.json(),
				 			err => err
				 		)
				 		.then (json => {
				 			console.log(json)
				 			setTokenCookie(json.token)
				 			return json.user ? json : null
				 		})	
				 		console.log(user)
				 		return user && component.props.userActions.getProfile(user.user) 
		};

  	return(
  			<div className='social-login'>
    					<div className="txt1 text-center p-t-54 p-b-20">
				          <span>
				            login via
				          </span>
				        </div>
				        <div className="flex-c-m">
				          <a  title='Login with Facebook' href={`https://www.facebook.com/v3.0/dialog/oauth?client_id=${fbAppId}&&response_type=token&redirect_uri=${window.location.origin}/fb&state=testString`} className="login100-social-item" target='_blank'>
				            <img src="/src/img/icons/fb2.png" className='popup__button_fb'/>
				          </a>    
				          <a  title='Login with Instagram' href={`https://api.instagram.com/oauth/authorize/?client_id=0155d8ff02cf4cc3b7ce344a0047a243&redirect_uri=${window.location.origin}/instagram&response_type=token`} className="login100-social-item" target='_blank'>
				            <img src="/src/img/icons/instagram.png"/>
				          </a>       
   								
				           <a title='Login with Google'  href={`https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20email&include_granted_scopes=${true}&redirect_uri=${window.location.origin}/google&response_type=token&client_id=836131905097-k989bkib5nu42ksclkqgr05q97g62b33.apps.googleusercontent.com`} target='_blank' className="login100-social-item">
				            <img src="/src/img/icons/google.svg" />
				          </a>
				          
			        	</div>
			        	<a   title='Login with Telegram' target='_blank' className="login100-social-item social-login__telegram" id='telegramButton'>	
 									<TelegramLoginButton dataOnauth={handleTelegramResponse} botName="LBPassportTestBot" />
				        </a>
			        </div>	
  	)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin)


// <TwitterLogin loginUrl="https://api.twitter.com/oauth/request_token"
//               onFailure={this.onFailed}
//               onSuccess={this.onSuccess}
//               requestTokenUrl="http://localhost:3000/tw/"
//               showIcon={true}
//               customHeaders={'customHeader'}>
//     <b>Custom</b> Twitter <i>Login</i> content
// </TwitterLogin>
				          // <a href={`https://www.facebook.com/v3.0/dialog/oauth?client_id=${fbAppId}&&response_type=token&redirect_uri=${window.location.origin}/fb&state=testString`} className="login100-social-item" target='_blank'>
				          //   <img src="/src/img/icons/fb2.png" className='popup__button_fb'/>
				          // </a>   

				          				//          <a href={`https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20email&include_granted_scopes=${true}&redirect_uri=${window.location.origin}/google&response_type=token&client_id=836131905097-k989bkib5nu42ksclkqgr05q97g62b33.apps.googleusercontent.com`} target='_blank' className="login100-social-item">


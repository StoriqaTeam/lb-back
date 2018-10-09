
import { connect }            from 'react-redux'
import * as userActions       from './../../../../actions/userActions'
import { bindActionCreators } from 'redux'
import {API_URL, GET_USER}    from './../../../../constants/constantsAPI' 



import ReactDOM           from 'react-dom';
import React, {Component} from 'react'
import  {Cookies}         from "react-cookie"
import Popup              from './../../../elements/popup/Popup'
import style              from './style.css'


class Add2FAForm extends Component {

	constructor(){
		super()
		this.state = {}
	}

	async getTwoFAData(){
		let cookies = new Cookies;

 		let TwoFAData  = await fetch(`${API_URL}/api/v1/2fa`,{
 			method: 'GET',
 			headers: new Headers({
 				'X-Auth-Token': cookies.get('token')
 			})
 		})
 		.then(
 			res => res.json(),
 			err => err
 		)
 		.then (json => {
 			console.log(json)
			return json.secret && this.setState({
				twoFAData: json
			})
 		})		
	}

	validateCode(){
		let code = this.refs.code.value.replace(/\D/g, '')
		this.refs.code.value = code
	

	}

	async setTwoFA(e, code){
		e.preventDefault()
		let cookies = new Cookies,
		component = this,
 		FASet = await fetch(`${API_URL}/api/v1/2fa`,{
 			method: 'POST',
 			headers: new Headers({
 				'X-Auth-Token': cookies.get('token'),
				'Content-Type': 'application/json'				
 			}),
 			body:JSON.stringify({
 				secret: this.state.twoFAData.secret, 
 				token: code,
 				time: Date.now(),
 				offset:   new Date().getTimezoneOffset()
 			})
 		})
 		.then(
 			res => res.json(),
 			err => err
 		)
 		.then (async json => {
 			console.log(json)
 			if (json.error || json.message === 'token not equal'){
 				 this.setState({
	 				error: json.error || json.message
	 			})
 				 return false
 			}
 			return json.message
			
 		})	

 		let user = FASet && { ...this.props.user, google2fa_secret: FASet }
 		return  user && component.props.userActions.getProfile(user)	
	}

	componentDidMount(){
		this.getTwoFAData()
	}

  render(){
    return (
			<div className="container-login100">
		    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
		   		<div className='popup__close' onClick={() => this.props.closePopup()}>×</div>

		      <div className="login100-form validate-form" >
		        <span className="login100-form-title p-b-49">
		          Add 2-factor auth.
		        </span>
			      {this.state.twoFAData 
			      	? <form className='text-center' onSubmit={(e) => this.setTwoFA(e, this.refs.code.value)}>
			      			<div> Scan this QR-code with Google Authenticator and enter the code below </div>
				          < img src={this.state.twoFAData.image} className='m-auto' />
				          <div className='mt-2 text-center'>
				          	<b>Secret:</b>&nbsp;
				          	{this.state.twoFAData.secret}
				          </div>	
				          <div className="mt-2 wrap-input100 validate-input m-b-23 m-auto two-fa__code text-center" data-validate="Username is reauired">
					          <input className="input100 p-0 text-center" type="text" ref="code" maxLength={6} placeholder="Type your code" autoComplete="off" onChange={() => this.validateCode()} />
				          </div>
					        <small className="text-danger d-block error" data-symbol="">{this.state.error}</small>
									   <input type="submit" className=" mt-2 btn btn--green header-main__right-btn popup__confirm" value="Add" />

				        </form> 
					   
					    : 'Getting 2-factor authentication data'	
					  }
		      </div>
		    </div>
		  </div>
		)
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

export default connect(mapStateToProps, mapDispatchToProps)(Add2FAForm)



import { connect }            from 'react-redux'
import * as userActions       from './../../../../actions/userActions'
import { bindActionCreators } from 'redux'
import {API_URL, GET_USER}    from './../../../../constants/constantsAPI' 
import {setTokenCookie}    from './../../../../constants/constantsApp' 

import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import CurrencyIframe       from './CurrencyIframe';
import Referral             from './../../../elements/referral/Referral'
import Wallet               from './Wallet'
import { Scrollbars }       from 'react-custom-scrollbars';
import css                  from './style.css'
import TwoFA                from './TwoFA'
import AddWallet            from './AddWallet'
import KYC                  from './KYC'
import Withdraw             from './Withdraw'

class AddEmail extends Component {

  constructor(){
    super()
    this.state = {}
  }

  async addEmail(e){
  	e.preventDefault()
  	let cookies = new Cookies;
		let user  = await fetch(`${API_URL}/api/v1/users/${this.props.user.id}`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'	,
				'X-Auth-Token': cookies.get('token')
	 				
			}),
			body: JSON.stringify({	
					name:  this.props.user.name ,
					email: this.refs.email.value

			})
		})
		.then(
			res => res.json(),
			err => err
		)
		.then (json => {
			console.log(json)
			return json || null
		})	
		console.log(user)

		 return user.id && this.props.userActions.getProfile(user)   	
  }



  render(){            
    return(
  	  <form onSubmit={(e) => this.addEmail(e)} className='profile__item'>
       <div className=' referal__txt'>
         Add your email
       </div>   	  
  	  	<div className='wrap-input100'>
  	  		<input type='email'  ref='email' placeholder='Your email' className='input100 p-0' required />
  	  	</div>		
  	  	<input type='submit'  value='Add' className='btn btn--green header-main__right-btn popup__confirm mt-2' />
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEmail)


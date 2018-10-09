import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import constantsApp         from './../../../constants/constantsApp'
import css                  from './style.css'

const FacebookAuth = () => {

		let cookies = new Cookies,
		token = cookies.get('token');
		return 	(
			<div className='text-white' onClick={() => constantsApp.openSocAuthModal('FBAuth', `https://www.facebook.com/v3.0/dialog/oauth?client_id=${constantsApp.fbAppId}&&response_type=token&redirect_uri=http://localhost:3000/fb&state=testString`)}>
				fb
			</div>
		)			
	
}

export default FacebookAuth
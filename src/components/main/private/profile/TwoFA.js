import ReactDOM           from 'react-dom';
import React, {Component} from 'react'
import  {Cookies}         from "react-cookie"
import {API_URL}          from './../../../../constants/constantsAPI' 
import Popup              from './../../../elements/popup/Popup'
import Add2FAForm         from './Add2FAForm'
import style              from './style.css'


class TwoFA extends Component {

	constructor(){
		super()
		this.state = {}
	}

  render(){
    return  this.props.user.google2fa_secret 
    ? null
    : [ <button className="btn btn--green profile__btn" onClick={()=> this.setState({add2fa: true})}>Add 2-factor auth</button>,
    		 this.state.add2fa &&
      		<Popup closePopup={() => this.setState({add2fa: false})} scrollable>
      			<Add2FAForm  closePopup={() => this.setState({add2fa: false})}  />
      		</Popup>
      	
      ]
  }
}



  export default TwoFA
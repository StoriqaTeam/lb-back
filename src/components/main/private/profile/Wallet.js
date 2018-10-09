import ReactDOM from 'react-dom';
import React, {Component} from 'react'
import  {Cookies}            from "react-cookie"
import Popup             from './../../../elements/popup/Popup'

import {API_URL}     from './../../../../constants/constantsAPI' 
import style              from './style.css'


class Wallet extends Component {

	constructor(){
		super()
		this.state = {}
	}


	async getWallet(){

 		let headers = new Headers();
 		headers.append('Content-Type', 'application/json')

 		let response  = await fetch(`${API_URL}/api/v1/user/deposit-address`,{
 			method: 'POST',
 			headers: headers,
 			body:JSON.stringify({
 				"user_id": this.props.user.id
 			})
 		})
 		.then(
 			res => res.json(),
 			err => err
 		)
 		.then (json => {
 			console.log(json)
 			if (json.address) {
 				this.setState({
 					address: json.address
 				})
 				this.convertBalance(json.balance || 0)
 			} else {
 			}
 		})/*
		user = response && response.token ? await GET_USER(response.token) : this.refs.error.innerHTML = response.error
 		return response.token ? this.props.userActions.getProfile(user) : null
 	*/
	}


	async convertBalance(ETH ){

		console.log(ETH)


 		return ETH 
 		? await fetch(`${API_URL}/api/v1/price`,{
 			method: 'GET'
 		})
 		.then(
 			res => res.json(),
 			err => err
 		)
 		.then (json => {
 			console.log(json)
 			return this.setState({
 				balance: {
 					USD: (ETH / 1000000000000000000 * json.eth).toFixed(2),
 					ETH: ETH / 1000000000000000000
 				}
 			})
 		})
 		: this.setState({
 			 balance: {
 			 	USD: 0,
 			 	ETH: 0
 			 }
 		})	
	}

	componentDidMount(){
		this.getWallet()
	}

	componentDidUpdate(prevProps, prevState){
		return this.state.balance && !prevState.balance && this.props.setBalance(this.state.balance.ETH)	
	}

  render(){
    return  ([
  	  <div className="profile__balance">Balance: {this.state.balance  ? <strong>${this.state.balance.USD} (ETH {this.state.balance.ETH})</strong> : 'Requesting balance...'}</div>,
      <div className="profile__row">
        <div className="profile__title profile__title--row">Wallet:</div>
        <div className="profile__val">{this.state.address || 'Requesting wallet address...'}</div>
      </div>
    ])
  }
}



  export default Wallet
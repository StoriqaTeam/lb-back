import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import Referral             from './../../../elements/referral/Referral'
import Chat                 from './Chat'
import { Scrollbars } from 'react-custom-scrollbars';
import css                  from './style.css'

import Popup              from './../../../elements/popup/Popup'

  


class Metamask extends Component {
 
  constructor(){
    super()
    this.state = {}
  }

  async checkMetamask() {
    if(!window.web3 ){
      return this.setState({
        popup: true,
        metamask: false 
      })
    }
    let currentAccount = await window.metamask.eth.getAccounts();
    if(!currentAccount[0]){
      return this.setState({
        popup: true,
        metamask: false 
      })
    }
    console.log("acc= ", currentAccount[0]);

    this.setState({
      popup: true,
      metamask: true,
      account: currentAccount[0]
    })
    
  }
  checkETHSum(){
    this.refs.ETH.value = this.refs.ETH.value.replace(/\D/g, '');

  }

  async sendTransaction(e){
    e.preventDefault()

    let tx = {
        to: '0x5f2f6e9d1de9820d26752a8dac3ff802db507f21', //change to smartcontract
        from: this.state.account,
        value: window.metamask.utils.toWei(this.refs.ETH.value, 'ether') //change to count
    };
    let transaction =  window.metamask.eth.sendTransaction(tx);
    console.log(transaction);   
    this.setState({
      popup: false
    })
  }


  render(){
    let cookies = new Cookies,
    token       = cookies.get('token'),
    date        = new Date()

    return ([
      <div className="metamask">
        <button className="btn btn_metamask" onClick={() => this.checkMetamask()}><img src="/src/img/metamask.png" alt=""/></button>
      </div>,
      this.state.popup &&
        <Popup closePopup={() => this.setState({popup: false})} scrollable>
          <div className="container-login100">
          <div className="wrap-login100 p-l-25 p-r-25 p-t-65 p-b-54">
            <div className='popup__close' onClick={() => this.setState({popup: false})}>×</div>
            <div className="login100-form validate-form" >
              <span className="login100-form-title p-b-49">
                {this.state.metamask ? 'Make a deposit' : 'Add Metamask' }
              </span>
              <div className='text-center'>
                { !this.state.metamask
                  ?  <div  >
                      Add <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' target='_blank'>Metamask extension</a> and login in it to deposit
                    </div>
                  : <form onSubmit={(e) => this.sendTransaction(e)}>
                      <div className="mt-2 wrap-input100 validate-input m-b-23 m-auto   text-center"  >
                        <input className="input100 p-0 text-center" type="text" ref="ETH" maxLength={42} placeholder="Enter ETH amount" autoComplete="off" onChange={() => this.checkETHSum()} />
                      </div>
                      <input type="submit" className=" mt-2 btn btn--green header-main__right-btn popup__confirm" value="Add" />
                      <small className="text-danger d-block error" data-symbol="">{this.state.error }</small>

                    </form> 
                  }
              </div>  
            </div>   
          </div>    
        </div>                          
      </Popup>
    ])
  }
}

export default Metamask        
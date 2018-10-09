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
import AddEmail             from './AddEmail'
import Cloudpayments        from './Cloudpayments'

class Profile extends Component {

  constructor(){
    super()
    this.state = {}
   this.setBalance = this.setBalance.bind(this)
   this.setWallet = this.setWallet.bind(this)
  }

  setBalance(ETH = 0){
    this.setState({
      balance: ETH
    })
  }

  setWallet(wallets){
    this.setState({
      wallets: wallets
    })
  }


  render(){
    let  date = this.props.user.createdAt && this.props.user.createdAt.split('T')[0].split('-') ; 
    console.log('status: ', this.props.user.kyc_status)
    return  (
      <div className="container profile ">
        <div className='profile__modals d-none'>
          { this.props.user.kyc_status < 1 &&
           <div className='profile__item referal__txt'>
            Please pass the KYC verification to add wallets or to withdraw funds
           </div>  
          }
          { !this.props.user.email   &&
           <AddEmail user={this.props.user} />  
          }          
        </div>
       <div className='prof__block'><img src='/src/img/profile/edit.png' className='rules__img' /></div>

        <div className="greed">
          <div className="greed__sec">
            <div className="blc">
              <div className="profile">
                <div className="profile__img">
                  <img src={this.props.user.avatar ? decodeURIComponent(this.props.user.avatar).replace('sz=50', 'sz=160') : "/src/img/profile/avatar.png"} alt />
                </div>
                <div className="profile__main">
                  <div className="profile__title">Nickname:</div>
                  <div className="profile__name">{this.props.user.name || `LuckyBlock user ${this.props.user.id}`}</div>
                  <Wallet user={this.props.user} setBalance={ this.setBalance}/>
                  <div className="profile__row">
                    <div className="profile__title profile__title--row">Join date:</div>
                    <div className="profile__val">{date ? `${date[2]}.${date[1]}.${date[0]}`: ''}</div>
                  </div>
                  <div className="profile__row">
                    <div className="profile__title profile__title--row">Email:</div>
                    <div className="profile__val">{this.props.user.email}</div>
                  </div>
                  { this.props.user.kyc_status >= 1 &&
                    <div className="profile__row">
                      <div className="profile__title profile__title--row">KYC status:</div>
                      <div className="profile__val">{this.props.user.kyc_status == 1 ? 'waiting for approve' : 'passed'}</div>
                    </div> 
                  }  
                  { this.props.user.google2fa_secret  &&
                    <div className="profile__row">
                      <div className="profile__title profile__title--row">2-FA:</div>
                      <div className="profile__val">activated</div>
                    </div> 
                  }                                       
                  { this.props.user.kyc_status < 1 &&
                   <KYC user={this.props.user} />  
                  }
                  <TwoFA user={this.props.user} />
                  < Cloudpayments user={this.props.user}/>
                  <AddWallet user={this.props.user} setWallet={this.setWallet} />  
                  <Withdraw user={this.props.user} balance={this.state.balance}/>               
                </div>
              </div>
            </div>
          </div>
          <div className="greed__sec">
            <div className="blc">
              <Referral user={this.props.user} />
            </div>
          </div>
          <div className="profile__iframes greed__sec">
            <div className="blc">
              <div className="referal">
                <div className="referal__title">DEPOSIT</div>
                <CurrencyIframe user={this.props.user} wallets={this.state.wallets} />
              </div>
            </div>
          </div> 
          <div className="greed__sec">
            <h2 className="greed__sec-title">Game history</h2>
            <div className="blc blc--table">
              <div className="table-overlay">
                <table className="table profile__table_game">
                  <thead>
                    <tr>
                      <th><span>Date</span></th>
                      <th><span>Value of jackpot</span></th>
                      <th><span>My bet</span></th>
                      <th><span>Prize</span></th>
                    </tr>
                  </thead>
                  <tbody style={{display: 'none'}}/>
                  </table>
                  <Scrollbars style={{ height: 240 }}   >

                   <table className="table ">
                    <thead style={{display: 'none'}}>
                      <tr>
                        <th><span>Date</span></th>
                        <th><span>Value of jackpot</span></th>
                        <th><span>My bet</span></th>
                        <th><span>Prize</span></th>
                      </tr>
                    </thead>
                    <tbody >

                   {Array(15).fill(0).map((item, i) =>  {
                      let jackpot = (Math.random()  * (250 - 100) + 50).toFixed(0),
                      bet         = (Math.random()  * (250 - 100) + 50).toFixed(0),
                      won         = Number(bet) + Number((Math.random()  * (250 - 100) + 50))
                      return (
                        <tr key={i} >
                          <td>02 Feb 2018</td>
                          <td>${jackpot},200</td>
                          <td>${bet}</td>
                          <td>${won.toFixed(0)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                 </Scrollbars>
              </div>
            </div>
          </div>

          <div className="greed__sec">
            <h2 className="greed__sec-title">Referral history</h2>
            <div className="blc blc--table">
              <div className="table-overlay">
                <table className="table profile__table_ref">
                  <thead>
                    <tr>
                      <th><span>Nickname</span></th>
                      <th><span>Bet</span></th>
                      <th><span>My bonus</span></th>
                    </tr>
                  </thead>
                  <tbody style={{display: 'none'}}/>
                  </table>
                 <Scrollbars style={{ height: 240 }}   >
                    <table className="table">

                  <thead style={{display: 'none'}}>
                    <tr>
                      <th><span>Nickname</span></th>
                      <th><span>Bet</span></th>
                      <th><span>My bonus</span></th>
                    </tr>
                  </thead>
                  <tbody >
                    {Array(15).fill(0).map((item, i) =>  {
                      let bet =   (Math.random()  * (400 - 100) + 50).toFixed(0),
                      bonus         = bet / 25
                      return (
                        <tr key={i}>
                          <td>
                            <div className="table__user">
                              <div className="table__user-icn"><img src="/src/img/example/ava.png" alt /></div>
                              <div className="table__user-nane">LuckyBlock user {(Math.random()  * (1000 - 50)).toFixed(0)}</div>
                            </div>
                          </td>
                          <td>${bet}</td>
                          <td>${bonus.toFixed(2)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile

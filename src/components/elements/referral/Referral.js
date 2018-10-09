import React, { Component } from "react"
import ShareLink from 'react-twitter-share-link'
import {API_URL}            from './../../../constants/constantsAPI' 
import css          from './style.css'

class Referral extends Component {

  shareFB(){
    window.FB.ui({
      method: 'share',
      href: `${window.location.href}/?ref=${Math.pow(this.props.user.id, 2)}`
    }, function(response){});
  }

  copy(id){
    var copyText = document.getElementById("copyRef");
    copyText.select();
    document.execCommand("copy");
    this.refs[id].innerHTML = 'Link copied'
    window.setTimeout(()=>    this.refs[id].innerHTML = 'Copy referral link', 3000)
  }

  async sendRef(e){
    e.preventDefault()

    let sentRef  = await fetch(`${API_URL}/api/v1/send_ref`,{
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email: this.refs.email.value, 
        id:    this.props.user.ref_code  
      })
    })
    .then(
      res => res.json(),
      err => err
    )
    .then (json => {
      console.log(json)
      return json.message === 'success send' ? 1 : 0
    })

    if (sentRef){
      this.refs.email.value = 'Referal link sent'
      window.setTimeout(()=>    this.refs.email.value = '', 3000)

    }
  }

  render(){
    return (
      <div className="referal">
        <div className="referal__title">REFERRAL</div>
        <div className="referal__alert">Get your bonuses by inviting friends!</div>
        <div className="referal__txt">Give your friends 3% of probability for winning jackpot. And get your 2% lucky bonus.</div>
        <form action="#" method="post" className="referal__form">
          <div className="referal__form-name">Share your Referral</div>
          <form className="referal__form-row"onSubmit={(e) => this.sendRef(e)}>
            <input type="email" ref='email' name="email" required ref='email' className="input referal__input" placeholder="myfriend@domain.com" />
            <input className="btn referal__form-submit" type="submit" value='Send'/>
          </form>
        </form>
        <div className="referal__bar">
          <div class="btn btn--facebook referal__facebook" 
            onClick={()=> this.shareFB()}
            data-href={`https://lb-front.stq.cloud/?ref=${Math.pow(this.props.user ?  (this.props.user.id, 2) : 0)}`} 
            data-size='large'
            data-layout="button">Share referral via Facebook
          </div>
          <ShareLink link={`${window && window.location.origin}/?ref=${this.props.user.ref_code}`}  >
             {link => (
                        <a href={link} target='_blank' className="btn btn--twitter referal__twitter">Share referral via Twitter</a>

             )}
          </ShareLink>
          <button className="btn btn--green btn--copy referal__copy" ref='copyRef' onClick={() => this.copy('copyRef')}>Copy referral link</button>
          <input style={{opacity: 0, height: 0}} id='copyRef' value={`${window && window.location.origin}?ref=${this.props.user.ref_code}`}/>
        </div>
      </div>
    )
  }
}

export default Referral
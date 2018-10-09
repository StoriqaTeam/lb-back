import React, { Component } from "react"
import {Cookies}            from "react-cookie"

import {API_URL}            from './../../../../constants/constantsAPI' 
import { Scrollbars }       from 'react-custom-scrollbars';

import css from './style.css'
class Chat extends Component {

  constructor(){
    super()
    this.state = {
      messages: []
    }
  }

  openSignModal(){
    let button = document.getElementById('login')
    console.log(button, this.props)
    button && !this.props.user && button.click()
  }

  validateInput(){
    return this.refs.message.value
     ? this.refs.sendMessage.classList.remove('disabled')
     : this.refs.sendMessage.classList.add('disabled')
  }

  componentDidMount(){
    this.getChat()
  }

  componentDidUpdate(){
    this.state.messages != 0 && this.refs.scrollbars.scrollToBottom()
  }


  async getChat(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')

    let user  = await fetch(`${API_URL}/api/v1/messages?limit=20&offset=0`,{
      method: 'GET'
    })
    .then(
      res => res.json(),
      err => err
    )
    .then (json => {
              console.log(json)

      this.setState({
        messages: json.reverse()
      })
    })
  }

  async sendMessage(e){
    e.preventDefault()
    if (!this.refs.message.value){
      return
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')

    let user  = await fetch(`${API_URL}/api/v1/message`,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_name: this.props.user.name || `LuckyBlock user #${this.props.user.id}`, 
        content:   encodeURIComponent(this.refs.message.value),
        user_id:       this.props.user.id  || ''
      })
    })
    .then(
      res => res.json(),
      err => err
    )
    .then (json => {
      console.log(json)
      if (json.status){

      }
      this.getChat()
      this.refs.message.value = ''
    })
  }


  render(){
    let cookies = new Cookies,
    token       = cookies.get('token'),
    date        = new Date()

    return (

        <div className="blc chat-blc">
          <div className="chat__wrap">
            <h3 className="chat__title">CHAT</h3>
            <div className="chat__list">
              <Scrollbars style={{ height: 510 }} ref='scrollbars' >
                { this.state.messages == 0
                  ? <div className="chat__item">
                      There're no messages here
                    </div>
                  : this.state.messages.map((message, i) => {
                      return (
                        <div className="chat__item" key={message.id}>
                          <div className="chat__icn"><img src={message.avatar ? decodeURIComponent(message.avatar) : "/src/img/example/ava.png"} alt /></div>
                          <div className="chat__main">
                            <div className="chat__name chat__name--green">{message.user_name} <img src="/src/img/icons/cup-yello.svg" alt /></div>
                            <div className="chat__txt">{decodeURIComponent(message.content)}</div>
                          </div>
                          <div className="chat__time">{message.createdAt.split('T')[1].split('.')[0]}</div>
                        </div>
                      )
                    })
                } 
              </Scrollbars>
            </div>
          </div>
          { this.props.user
            ? <form className="register chat__form" onSubmit={(e) => this.sendMessage(e)}>
                <input type='text' ref='message' className='register__main chat__input' onChange={() => this.validateInput()} placeholder='Type your message' />
                <input className="btn register__btn disabled btn btn--green header-main__right-btn chat__send" ref='sendMessage' type='submit' value='SEND'/>
              </form>
            :  <div className="register">
                <div className="register__main">REGISTER FOR CHAT</div>
                <button className="btn register__btn" onClick={() => this.openSignModal()}>Join</button>
              </div>
          }
        </div>
    )
  }
}

export default Chat        
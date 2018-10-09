import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import {Link}               from 'react-router-dom'
import {copyToClipboard, getProps}    from './../../constants/constantsApp' 
import LoginBlock           from './../elements/login_block/LoginBlock'
import Popup                from './../elements/popup/Popup'
import Logout               from './../elements/logout/Logout'
import VerifyEmail          from './../elements/verify_email/VerifyEmail'
import css                  from './style.css'



class Header extends Component {

	constructor(props){
		super(props)
		this.state = {
			jackpot: 'week',
			user: getProps('user', props)
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			user: nextProps.user
		})
	}

	toggleMenu(){
    this.refs.toggleMenu.classList.toggle('open');
    this.refs.menuList.classList.toggle('open');
	}

	copy(id){
		var copyText = document.getElementById("copyAddress");
		copyText.select();
		document.execCommand("copy");
		this.refs[id].innerHTML = 'ADDRESS COPIED'
		window.setTimeout(()=> 		this.refs[id].innerHTML = 'COPY ADDRESS', 3000)
	}

	componentDidMount(){
		let component = this,
		{minutes, seconds} = this.refs
		window.setInterval(() => {
			let content = minutes.innerHTML != '00' ? minutes.innerHTML - 1  : '59'
			minutes.innerHTML = content < 10 ? '0' + content : content
		}, 60000)
		window.setInterval(() => {
			let content = seconds.innerHTML != '00' ? seconds.innerHTML - 1  : '59'
			seconds.innerHTML = content < 10 ? '0' + content : content
		}, 1000)
	}




	render(){
		let cookies = new Cookies,
		token = cookies.get('token');
		let jackpots = {
			hour:  '10,000', 
			day:   '50,000', 
			week:  '300,000',
			month: '1,000,000', 
			year:  '100,000,000', 
			super: '1,000,000,000'
		}
		return 	(
	<header className="header" id="header">
  <div className="container">
    <div className="header__wrap">
      <div className="logo">
        <div className="logo__img">
          <img src="/src/img/logo.svg" alt="Lucky Block" />
          <div className="shine logo__shine" />
          <div className="shine logo__txt-shine logo__txt-shine--1" />
          <div className="shine logo__txt-shine logo__txt-shine--2" />
        </div>
      </div>
      <nav className="maine-menu">
        <ul>
          <li><a href="/" className='text-white_a'>HOME</a></li>
          <li><a href="/winners" className='text-white_a'>WINNERS</a></li>
        </ul>
        <ul>
          <li><a href="/faq" className='text-white_a'>FAQ</a></li>
          <li><a href="/rules" className='text-white_a'>RULES</a></li>
        </ul>
      </nav>
      <div className="header-bar">
        <div className='d-flex'>

			        { this.state.user
			        	?	[<a href="/profile" ><img className={(this.state.user && this.state.user.avatar) ? 'rounded-circle' : '' } src={this.state.user && this.state.user.avatar ? decodeURIComponent(this.state.user.avatar) : "/src/img/profile/prof.png"}/></a>,
									 
									  <Logout />
									 ]

			        	: [<a  className="user-btn" onClick={() => this.setState({popup: true})} id='login'>LOGIN</a>,
				        	this.state.popup &&
				        		<Popup closePopup={() => this.setState({popup: false})} scrollable>
				        			<LoginBlock  closePopup={() => this.setState({popup: false})}/>
				        		</Popup>
				        	]
			        }  


        </div>	
        <button className="btn menu-btn">
          <span />
          <span />
          <span />
        </button>

      </div>
    </div>
  </div>
</header>

		)			
	}
}

export default Header


			          // <button className="btn header-main__prev" title="Prev">Prev</button>

			          // <button className="btn header-main__next" title="Next">Next</button>

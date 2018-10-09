import React, {Component} from 'react'
import style              from './style.css'

class Popup extends Component {

 

  changeTitle(title){
    this.setState({
      title: title
    })
  }

  componentDidMount(){
    let component = this,
    popup = document.querySelector('#lucky-popup');
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        component.props.closePopup()
      }
    })
    if (this.props.scrollable){
      window.scrollTo(0,0)
      document.getElementById('main').classList.add('hidden')
    }
    this.setState({ 
      popup:  popup,
      parent: popup.parentElement
    })
    document.getElementById('app').appendChild(popup)

  }

  componentWillUnmount(){
    if (this.props.scrollable){
      document.getElementById('main').classList.remove('hidden')
    }
    this.state.parent.appendChild(this.state.popup)

    let component = this;
    window.removeEventListener('keydown', component.keyClose)
  }

  render(){

  	return(
			<div className="limiter" id='lucky-popup'>
			  {this.props.children}
			</div>

    )
  }
}

export default Popup
			          // <a href="#">
			          //   Forgot password?
			          // </a>
    // <div className="txt1 text-center p-t-54 p-b-20">
			 //          <span>
			 //            Or Sign Up Using
			 //          </span>
			 //        </div>
			 //        <div className="flex-c-m">
			 //          <a href="#" className="login100-social-item bg1">
			 //            <i className="fa fa-facebook" />
			 //          </a>
			 //          <a href="#" className="login100-social-item bg2">
			 //            <i className="fa fa-twitter" />
			 //          </a>
			 //          <a href="#" className="login100-social-item bg3">
			 //            <i className="fa fa-google" />
			 //          </a>
			 //        </div>
import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import Popup                from './../popup/Popup'
import css                  from './style.css'



class VerifyEmail extends Component {

	constructor(props){
		super(props)
		this.state = {
			popup: !!props.user.email
		}
	}

	addAdress(){

	}


	componentDidMount(){

	}




	render(){

		return this.state.popup
		?	(
  		<Popup closePopup={() => this.setState({popup: false})} scrollable>


				  <div className="container-login100">
				            <div className="wrap-login100 p-l-25 p-r-25 p-t-65 p-b-54">
				              <div className='popup__close' onClick={() => this.setState({popup: false})}>×</div>

				              <div className="login100-form validate-form" >
				                <span className="login100-form-title p-b-49">
            Add email address
				                </span>
				                <div className='text-center'>
													<form className='text-center' onSubmit={(e) => this.addAdress(e)}>
												                         <div> Add and verify your email address to join Lucky Block .</div>    

												           <div className="mt-2 wrap-input100 validate-input m-b-23 m-auto   text-center"  >
												            <input className="input100 p-0 text-center" type="email" ref="email" maxLength={42} placeholder="Enter your email" autoComplete="off"  />
												          </div>
												          <input type="submit" className=" mt-2 btn btn--green header-main__right-btn popup__confirm" value="Add" />
												          <small className="text-danger d-block error" data-symbol="">{this.state.error }</small>

												     		</form> 
				                </div>  
				              </div>   
				            </div>    
				          </div>             


     </Popup>


		)
		: null			
	}
}

export default VerifyEmail


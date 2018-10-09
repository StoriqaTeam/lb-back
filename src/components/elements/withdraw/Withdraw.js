import React, { Component } from "react"
import {Cookies}            from "react-cookie"

import css                  from './style.css'

class Withdraw extends Component {

  myCallback(){
    
  }

  render(){
    return (
      <div className='withdraw'>
        <div onClick={() => this.props.close()}>close</div>
      </div>
    )
  }
}

export default Withdraw

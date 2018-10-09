import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import Referral             from './../../../elements/referral/Referral'
import Chat                 from './Chat'
import Metamask             from './Metamask'
import { Scrollbars } from 'react-custom-scrollbars';
import css                  from './style.css'

class Counter extends Component {



  componentDidMount(){
    let mins = 59,
    secs = 59
    this.mins =  setInterval(() => {
      let minsToString = mins.toSting().split('');
      mins = mins - 1;
      letNewMinsToString = mins.toSting().split('');


    }, 60000)
    this.secs =  setInterval(() => {

      content = this.state.seconds != '00' ? this.state.seconds - 1  : '59'
     this.setState({seconds: content < 10 ? '0' + content : content })
    }, 1000)
 
  }

  componentWillUnmount(){
    clearInterval(this.mins)
    clearInterval(this.secs)
  }


  render(){
    let cookies = new Cookies,
    token       = cookies.get('token'),
    date        = new Date()

    return (
      <ul className="flip-counter default" id="myCounter">

       <li className="digit" id="myCounter-digit-a0">
          <div className="line"></div>
          <span className="front">0</span>
          <span className="back">0</span>
          <div className="hinge-wrap">
            <div className="hinge">
              <span className="front">0</span>
              <span className="back">0</span>
            </div>
          </div>
        </li>

       <li className="digit" id="myCounter-digit-a0">
          <div className="line"></div>
          <span className="front">0</span>
          <span className="back">0</span>
          <div className="hinge-wrap">
            <div className="hinge">
              <span className="front">0</span>
              <span className="back">0</span>
            </div>
          </div>
        </li>
        <li className="digit" id="myCounter-digit-a0">
          <div className="line"></div>
          <span className="front">0</span>
          <span className="back">0</span>
          <div className="hinge-wrap">
            <div className="hinge">
              <span className="front">0</span>
              <span className="back">0</span>
            </div>
          </div>
        </li>
        
       <li className="digit" id="myCounter-digit-a0">
          <div className="line"></div>
          <span className="front">0</span>
          <span className="back">0</span>
          <div className="hinge-wrap">
            <div className="hinge">
              <span className="front">0</span>
              <span className="back">0</span>
            </div>
          </div>
        </li>

        <li className='d-inline-block' id='sec-1'>
          <div className="digit" id="myCounter-digit-a0">
            <div className="line"></div>
            <span className="front">0</span>
            <span className="back">0</span>
            <div className="hinge-wrap">
              <div className="hinge">
                <span className="front">0</span>
                <span className="back">0</span>
              </div>
            </div>
          </div>
        </li>
        <li className='d-inline-block' id='sec-2'>
          <div className="digit" id="myCounter-digit-a0">
            <div className="line"></div>
            <span className="front">0</span>
            <span className="back">0</span>
            <div className="hinge-wrap">
              <div className="hinge">
                <span className="front">0</span>
                <span className="back">0</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

export default Counter        







   // <div className="row__test container">
   //    <div className="row__wrap">
   //      <div className="row__item">
   //        <div className="row__val grad"><span>$19 780</span><span>$19 780</span></div>
   //        <div className="row__time-txt">DAY</div>
   //        <div className="row__time-txt">12:31:59</div>
   //      </div>
   //      <div className="row__item">
   //        <div className="row__val grad"><span>$59 087</span><span>$59 087</span></div>
   //        <div className="row__time-txt">WEEK</div>
   //        <div className="row__time-txt">4D | 12:31</div>
   //      </div>
   //      <div className="row__item">
   //        <div className="row__val grad"><span>$84 980</span><span>$84 980</span></div>
   //        <div className="row__time-txt">MONTH</div>
   //        <div className="row__time-txt">28D | 24:47</div>
   //      </div>
   //      <div className="row__item">
   //        <div className="row__val grad"><span>$169 460</span><span>$169 460</span></div>
   //        <div className="row__time-txt">YEAR</div>
   //        <div className="row__time-txt">179D | 32:36</div>
   //      </div>                        
   //    </div>
   //  </div>
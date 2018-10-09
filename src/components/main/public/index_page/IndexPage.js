import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import Referral             from './../../../elements/referral/Referral'
import Chat                 from './Chat'
import Metamask             from './Metamask'
import Counter              from './Counter'
import { Scrollbars } from 'react-custom-scrollbars';
import css                  from './style.css'

class IndexPage extends Component {

  openSignModal(){
    let button = document.getElementById('login')
    console.log(button, this.props)
    button && !this.props.user && button.click()
  }



  render(){
    let cookies = new Cookies,
    token       = cookies.get('token'),
    date        = new Date()

    return (
<div>
  <div className="bg" id="js-bg">
  </div>
  <div className="stars" id="particles-js" />
  <div className="show" id="js-show">
    <div className="show__banner">
      <img src="/src/img/show/sweet-kitten.gif" alt className="show__banner-pic" />
      <img src="/src/img/show/coints.png" alt className="show__coints" />
      <div className="banner__shine banner__shine--1" />
      <div className="banner__shine banner__shine--2" />
      <div className="banner__shine banner__shine--3" />
      <div className="banner__shine banner__shine--4" />
      <div className="banner__shine banner__shine--5" />
      <div className="banner__shine banner__shine--6" />
      <div className="banner__shine banner__shine--7" />
    </div>
    {/*            <img src="/src/img/show/5.png" alt="" class="show__img" style="opacity: 1">*/}
    <img src="/src/img/show/0.png" alt className="show__img show__img--0" />
    <img src="/src/img/show/1.png" alt className="show__img show__img--1" />
    <img src="/src/img/show/2.png" alt className="show__img show__img--2" />
    <img src="/src/img/show/3.png" alt className="show__img show__img--3" />
    <img src="/src/img/show/4.png" alt className="show__img show__img--4" />
  </div>
  <main className="main">
    <div className="main-sec">                
      <div className="container">
        <div className="main-sec__middle">
          <button className="btn main-sec__btn"><span>GET LUCKY</span></button>

              <div className="clearfix">
                <Counter />
            </div>
          </div>
        <div className="main-sec__left">
          <div className="main-sec-title">
            The <br />
            BIGGEST <br />
            <span>PROOF-of-HONEST</span>
            BLOCKCHAIN <br />
            LOTTERY
          </div>
        </div>
        <div className="main-sec__right">
          <div className="frame">
            <div className="frame__title">
              <div className="frame__title-top">
                <div className="frame__title-gold grad"><span>ONE</span></div>
                <div className="frame__title-middle">BET<br />FOR</div>
                <div className="frame__title-gold grad"><span>SIX</span></div>
              </div>
              <div className="frame__title-bottom">LOTTERY</div>
            </div>
            <div className="qr"><img src="/src/img/qr.png" alt /></div>
            <button className="btn copy-code">COPY CODE</button>
            <button className="btn metamasc"><span>METAMASC</span></button>
          </div>
        </div>
      </div>
    </div>

    {/*
      <div class="content">
          <div class="container">
              <div class="tables">
                  <div class="tables__col"></div>
              </div>
          </div>
      </div>
*/}
  </main>
</div>

    )
  }
}

export default IndexPage        







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
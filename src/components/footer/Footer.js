import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import {Link}               from 'react-router-dom'


class Footer extends Component {

	render(){
		let cookies = new Cookies,
		token = cookies.get('token');
		return 	(
<footer className="footer">
  <div className="container">
    <div className="copyright">©2018-luckyblock.com, Inc. All rights reserved.</div>
    <a href="#header" className="up js-scroll" title="Up">Up</a>
  </div>
</footer>



		)			
	}
}

export default Footer
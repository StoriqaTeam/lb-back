import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
 import Dropdown from 'react-dropdown'
 import  {DropdownButton, MenuItem} from  'react-bootstrap'
import 'react-dropdown/style.css'
import crypto               from 'crypto'
import { Scrollbars }       from 'react-custom-scrollbars';

import css                  from './style.css'

class Shapeshift extends Component {

  constructor(){
  	super()
  	this.state = {}
  }

	componentDidMount(){
		this.getCoins()
	}

	t(){
		fetch('https://shapeshift.io/getcoins')
		.then(
			res => res.json(),
			err => err
		)
		.then(json => {
			console.log(json)
			this.setState({
				coins: json,
				selected: json.find(i => i.name == 'bcn')

			})
		})
	}

	makeTransaction(e, from, to, val = 100){
		e.preventDefault()
		fetch('https://cors.shapeshift.io/sendamount', {
			method: 'POST',
			headers: {
        "Content-Type": "application/x-www-form-urlencoded"
     },
			body: JSON.stringify({
				"amount": val , 
				"pair": `${from.toLowerCase()}_${to}`
			})
		})
			.then(
				res => res.json(),
				err => err
			)
			.then(json => {
				console.log(json)
				
			})
		}
	


	  async getCoins(){
  	let body = {
		  "id": "f61b1b93d0384a069c462079b21a1a05",
		  "jsonrpc": "2.0",
		  "method": "getCurrenciesFull",
		  "params": {
		  }
		}
    fetch(`https://api.changelly.com/`, {
      method: 'POST',
      headers: new Headers({
      	'Content-Type': 'application/json',
      	'api-key': 'f61b1b93d0384a069c462079b21a1a05',
      	'sign':  crypto.createHmac('sha512', '442f4c90573bd82567f5fdd546e0b605766fe8c7e731f94f9b7cd374e0e378f0').update(JSON.stringify(body)).digest('hex')      
    	}),
    	body: JSON.stringify(body)
    })
    .then(
      res => res.json(),
      err => err
    )
    .then(json => {
    	console.log(json)
    	this.setState({
    		coins: json.result,
        selected: json.result.find(i => i.name == 'bcn')

    	})
    })
  }

 

  render(){
  	let component = this
  	if (!this.state.coins){
  		return (<div>Requesting coins...</div>)
  	}

  						let top = [
  							{...this.state.coins.find(i => i.name  == 'btc'), qty: 0.05},
  						  {...this.state.coins.find(i => i.name  == 'dash'), qty: 5},
  						  {...this.state.coins.find(i => i.name  == 'xmr'),  qty: 10},
  						  this.state.selected
  						 ]

		console.log( top[0])
    return  (
					<Tabs>
					  <TabList className='currency__tab currency__tab-list_crypt'>
					  	{ top.map((coin, ii) => {
					  		console.log(coin)
									return(
										<Tab className='position-relative currency__tab_small'>
							      	<i className='position-relative currency__marker currency__marker_crypt'/>
							      	<img src={coin.image} className='currency__tab_img' alt />
							      	{
												ii == 3 &&

												<DropdownButton
										      title='select currency &#9662;'
										      className='position-relative'
										      id='drop'
										      onSelect={(e) => component.setState({selected: e})}
										    >
										     <Scrollbars style={{ height: 240, width: 250 }} autoHide={false}  >


										    	{
										    		Object.values(this.state.coins).map(c =>{
											    		return [
											    		 	<Tab>{c.symbol}</Tab>,
											    		 	<MenuItem eventKey={c}  className='shapeshift__item' onClick={() => {component.setState({selected: c});document.getElementById('drop').click()}}>
											    		 		<div className='d-inline-block coin__name_short'> {c.name.toUpperCase()}</div>
											    		 		<img src={c.image} className='currency__tab_img' /> 
											    		 		<div className='d-inline-block coin__name'>  {c.fullName}</div>
											    		 	</MenuItem>
											    		]
											    	})
										    	}
										    					    				    	</Scrollbars>												

										    </DropdownButton>  
							      	}
							      </Tab>
							     )
					  		})
				
					  	}	
	

				    </TabList>
						{ top.map(coin => {
								return(
					    		<TabPanel className='currency__tab-panel_small currency__gray'>
											<a className='currency__exchange' target='_blank' href={`https://changelly.com/widget/v1?auth=email&from=${coin.name.toUpperCase()}&to=ETH&merchant_id=aba39711a80e&address=&amount=${coin.qty || 50}&ref_id=aba39711a80e&color=00cf70&address=${this.props.wallets[0] && this.props.wallets[0].address}`}>
											  <img src="https://changelly.com/pay_button_exchange.png" alt="Changelly" />
											</a>

										<iframe src={`https://changelly.com/widget/v1?auth=email&from=${coin.name.toUpperCase()}&to=ETH&merchant_id=17cd70c57129&address=${this.props.wallets[0] && this.props.wallets[0].address}&amount=${coin.qty || 50}&ref_id=17cd70c57129&color=48d9a7`} width={600} height={400} className="changelly currency__iframe" scrolling="no" style={{overflowY: 'hidden', border: 'none'}}>
										  Can't load widget
										</iframe>
									</TabPanel>	
								)
							})
						} 		 
		    	</Tabs>	

		)
  }
}

  export default Shapeshift
import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import crypto               from 'crypto'
import Shapeshift           from './Shapeshift'
import css                  from './style.css'

class CurrencyIframe extends Component {

  copy(id){
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
    this.refs[id].innerHTML = 'Address copied'
    window.setTimeout(()=>    this.refs[id].innerHTML = 'Copy address', 3000)
  }


   open_widget(a, e) {
      e.preventDefault();
      var link = a.href;
      window.open(link, 'Changelly', 'width=600,height=470,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=0,left=0,top=0');
      return false;
  }



  render(){
    return  (
		  <Tabs className='currency__tabs'>
		    <TabList className='currency__tab_top'>
		      <Tab className='currency__tab_li currency__tab_curr'>Fiat <img src="/src/img/profile/card.png" alt /></Tab>
		      <Tab className='currency__tab_li currency__tab_crypt'>Cryptocurrency <img src="/src/img/profile/coin.png" alt /></Tab>
		    </TabList>

		    <TabPanel className='currency__tab-panel'>
					<Tabs>
					  <TabList className='currency__tab'>
				      <Tab className='position-relative currency__tab_small  currency__tab_curr_small'><i className='position-relative currency__marker'/>EUR</Tab>
				      <Tab className='position-relative currency__tab_small  currency__tab_curr_small'><i className='position-relative currency__marker'/>USD</Tab>
				    </TabList>

		    		<TabPanel className='currency__tab-panel_small'>



						<a className='currency__exchange' target='_blank' href="https://changelly.com/widget/v1?auth=email&from=EUR&to=ETH&to=${this.props.wallets[0] && this.props.wallets[0].address}&merchant_id=aba39711a80e&address=&amount=1&ref_id=aba39711a80e&color=00cf70">
						  <img src="https://changelly.com/pay_button_exchange.png" alt="Changelly" />
						</a>

					<iframe src="https://changelly.com/widget/v1?auth=email&from=EUR&to=ETH&merchant_id=17cd70c57129&to=${this.props.wallets[0] && this.props.wallets[0].address}&amount=50&ref_id=17cd70c57129&color=48d9a7" width={600} height={400} className="changelly currency__iframe" scrolling="no" style={{overflowY: 'hidden', border: 'none'}}>
					  Can't load widget
					</iframe>

						</TabPanel>	
						<TabPanel className='currency__tab-panel_small'>

						<a className='currency__exchange' target='_blank' href="https://changelly.com/widget/v1?auth=email&from=USD&to=ETH&to=${this.props.wallets[0] && this.props.wallets[0].address}&merchant_id=aba39711a80e&address=&amount=1&ref_id=aba39711a80e&color=00cf70">
						  <img src="https://changelly.com/pay_button_exchange.png" alt="Changelly" />
						</a>
						<iframe src="https://changelly.com/widget/v1?auth=email&from=USD&to=ETH&merchant_id=17cd70c57129&to=${this.props.wallets[0] && this.props.wallets[0].address}&amount=50&ref_id=17cd70c57129&color=48d9a7" width={600} height={400} className="changelly currency__iframe" scrolling="no" style={{overflowY: 'hidden', border: 'none'}}>
						  Can't load widget
						</iframe>

		    		</TabPanel>	  
		    	</Tabs>	  
				</TabPanel>
				<TabPanel className='currency__tab-panel'>
					 <Shapeshift  user={this.props.user} wallets={this.props.wallets}/>	
				 </TabPanel>
		  </Tabs>
		)
  }
}

  export default CurrencyIframe
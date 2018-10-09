import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import Calendar             from './Calendar'


class Winners extends Component {

render(){
    let cookies = new Cookies,
    token = cookies.get('token'),
    date  = new Date(),
    month  = date.getMonth() + 1

    return(
			<div className="container">
		  	<div className='winners__block'><img src='/src/img/winners/see.png' className='rules__img' /></div>

			  <div className="greed">
			   	<Calendar refresh={()=> this.setState({refreshed: true})} />
			    <div className="greed__sec greed__sec--long">
 			      <div className="blc blc--table">
			        <div className="winners">
			          <div className="winners__header">
			            <h3 className="winners__title text-center">ROUND STATISTICS</h3>
			            <div className="winners__bar">
			              <div className="winners-counters d-flex justify-content-center">
			                <div className="winners-counter pr-5">
			                  <div className="winners-counter__name">Total players:</div>
			                  <div className="winners-counter__val">4,734</div>
			                </div>
			                <div className="winners-counter pl-5 pr-5">
			                  <div className="winners-counter__name">Value of jackpot:</div>
			                  <div className="winners-counter__val">8,323,455 ETH</div>
			                </div>
			                <div className="winners-counter pl-5">
			                  <div className="winners-counter__name">Date of the draw:</div>
			                  <div className="winners-counter__val">{`${date.getFullYear()}.${month < 10 ? 0 : ''}${month}.${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`}</div>
			                </div>
			              </div>
			            </div>
 			            <div className="winners__tables">
			              <div className="table-overlay">
			                <table className="w-100">
			                  <thead>
			                    <tr>
			                    	<td/>
 			                      <th className='pt-5 pb-5'><span>Nickname</span><img src='/src/img/winners/arrow2.png' className='d-inline-block ml-4'/></th>
			                      <th><span>Bet</span><img src='/src/img/winners/arrow2.png' className='d-inline-block ml-4'/></th>
			                      <th><span>Win rate</span><img src='/src/img/winners/arrow2.png' className='d-inline-block ml-4'/></th>
			                      <th><span>Prize</span><img src='/src/img/winners/arrow2.png' className='d-inline-block ml-4'/></th>
			                    </tr>
			                  </thead>
			                  <tbody>
  												{Array(6).fill(0).map((item, i) =>  {
	                          let percent = (Math.random()  * (10 - 0.1)  + 10).toFixed(0),
	                          cash        = (Math.random()  * (1000 - 50) + 50).toFixed(0),
	                          won         = Number(cash) + Number((cash / 100) * percent)
	                          return (
	                     			  <tr>
	                     			  	<td>
					                          <div className="table__user-icn d-inline-block"><img src="/src/img/winners/prof.png" alt /></div>

	                     			  	</td>
 					                      <td>
					                        <div className="table__user">
					                          <div className="table__user-nane">LuckyBlock user {(Math.random()  * (1000 - 50)).toFixed(0)}</div>
					                        </div>
					                      </td>
					                      <td>${cash}</td>
					                      <td>{percent}%</td>
					                      <td>${won.toFixed(0)}</td>
					                    </tr>
	                          )
	                        })}                                                   
			                  </tbody>
			                </table>
			              </div>
			              
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
    )
  }
}

export default Winners
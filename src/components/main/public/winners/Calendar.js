import React, { Component } from "react"
import {Cookies}            from "react-cookie"
import css from './style.css'

class Calendar extends Component {

	constructor(){
		super()
		let date = new Date()
		this.state = {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			week:  null,
			day:   date.getDate(),
			hour:  7,
			clock: 'am'

		}
	}

 	update(newProps){
 		this.setState({
 			...this.state,
 			...newProps
 		})
 		this.props.refresh()
 	}

 	switchMonth(incr){
 		let newDate;
 		switch (true){
 			case !incr && this.state.month === 1:
				newDate = {
	 				year: this.state.year - 1,
	 				month: 12
	 			}
	 			break
	 		case !incr:
	 			newDate = {
	 				month: this.state.month - 1
	 			}
	 			break	
	 		case	incr && this.state.month === 12:
	 			newDate = {
	 				year:  this.state.year + 1,
	 				month: 1
	 			}
	 			break	
	 		default:
	 			newDate = {
	 				month:  this.state.month + 1
	 			}	 					 					
 		}
		return this.update(newDate) 
 	}

	render(){
    let cookies = new Cookies,
    token = cookies.get('token'),
    date  = new Date(this.state.year, this.state.month - 1),
    realDate = new Date(),
    nextDate = new Date(this.state.year, this.state.month ),
    months = [ 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'	],
  	longMonth = ((this.state.month <= 7) && (this.state.month % 2 != 0)) || ((this.state.month >= 8) && (this.state.month % 2 == 0)),
  	february = this.state.month == 2,
  	leapFebruary = this.state.month == 2 && this.state.year % 4 == 0,
  	getInitialDay = date.getDay(),
  	getNextDay = nextDate.getDay(),
  	daysNum = longMonth ? 31 : february ? leapFebruary ? 29 : 28: 30,
  	weeksNum,
  	counter = 0
  	switch (true){
  		case daysNum == 28 && getInitialDay == 0:
  			weeksNum = 4
  			break
  		case daysNum == 28 && getInitialDay != 0:
  		case daysNum == 30 && getInitialDay <= 5:
  		case daysNum == 31 && getInitialDay < 5:
  			weeksNum = 5
  			break
  		default:
  			weeksNum = 6		
  	}
  	console.log(getNextDay)
    return(
			[
				<div className="greed__sec">
			      <div className="blc">
			        <div className="calendar">                                
			          <div className="slider calendar__slider">
			            <div className="calendar__pagination text-center">
			              <div className="btn calendar__pagination-item text-white_a d-inline-block " onClick={() => this.update({year: this.state.year - 1, week: null, month: 1, day: 1})}>{this.state.year - 1}</div>
			            <img src='/src/img/winners/arrow.png' className="d-inline-block cursor-pointer slider__arrow slider__arrow--prev" title="Prev" onClick={() => this.update({year: this.state.year - 1, month: 1, week: null, day: 1})} />
			              <div className="btn calendar__pagination-item active text-white_a d-inline-block ">{this.state.year}</div>
			            <img src='/src/img/winners/arrow.png' className={`flip d-inline-block  slider__arrow slider__arrow--next ${this.state.year === realDate.getFullYear() ? 'disabled ' : 'cursor-pointer'}` } title="Next" onClick={() => this.update({year: this.state.year + 1, month: 1, week: null, day: 1})} />
			             
			             <div className={`btn calendar__pagination-item  text-white_a d-inline-block ${this.state.year === realDate.getFullYear() && 'disabled'}`} onClick={() => this.update({year: this.state.year + 1, week: null, month: 1, day: 1})}>{this.state.year + 1}</div>
			            </div>
			            <div className="calendar__main text-center">
			            	{
			            		months.map((month, i) => {
				              	return (
					              	<div key={i}
					              		className={`calendar__item d-inline-block ${this.state.month == i + 1 ? 'active' : ''} ${this.state.year === realDate.getFullYear() && realDate.getMonth() < i ? 'disabled' : 'cursor-pointer'}`} 
					              		onClick={() =>this.update({month:  i + 1, day: 1, week: null})}>
					              		{months[i]}
					              	</div>
					              )
				            	})
				            }
			              <div className="calendar__item calendar__item--long">SUPER JACKPOT {date.getFullYear()} — ${this.state.year - 2001},000,000</div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>,
			    <div className="greed__sec">
			      <div className="blc">
			        <div className="datepicker">
			          <div className="slider datepicker__slider">
			            <button className="btn slider__arrow slider__arrow--prev" title="Prev" onClick={() => this.switchMonth(0)}> Prev</button>
			            <div className="datepicker__main">
			              <div >
			                <table className="datepicker__table ">
			                  <thead>
			                    <tr className='bg-white p-2 text-dark'>
			                      <th className="datepicker__table-week pl-5">week</th>
			                      <th>S</th>
			                      <th>M</th>
			                      <th>T</th>
			                      <th>W</th>
			                      <th>T</th>
			                      <th>F</th>
			                      <th>S</th>
			                      <th  className='pr-5'></th>
			                    </tr>
			                  </thead>
			                  <tbody>
			                    {
				                    Array(weeksNum).fill(0).map((week, weekIndex )=> {
															
				                    	return (
					                    	<tr>
						                      <td 
						                      	className={`datepicker__table-week ${this.state.week === weekIndex  ? 'active' : ''} ${ counter - realDate.getDate() > 0 && this.state.month === realDate.getMonth() + 1  && 'disabled'}`} 
						                      	onClick={() => this.update({week: weekIndex, day: null})}>
						                      	 <span className={this.state.week === weekIndex ? 'active' : ''} >
																			{weekIndex + 1}
																		</span>	
						                      </td>
						                      { Array(7).fill(0).map((day, i) => {

																			day = (weekIndex == 0 &&  i < getInitialDay) ? '' : counter - 1
						                      		if (day || day === 0){
																				counter += 1
																			}
																			let thisDay = counter
																			let lastDay = (weekIndex === weeksNum -1 && counter > daysNum )
																			console.log(lastDay, weeksNum, weekIndex, i, getNextDay)
						                      		return (
						                      			<td onClick={() => this.update({day: thisDay, week: null })} className={`${this.state.day === counter ? 'active' : ''} ${lastDay || !counter || (this.state.year === realDate.getFullYear() && this.state.month === realDate.getMonth() + 1 && realDate.getDate() < counter) ? 'disabled' : ''} ${i === 0 ? 'weekend' : ''}`}>
						                      				<span className={this.state.day === counter ? 'active' : ''} >
						                      					{counter && !lastDay ? counter : ''}
						                      				</span>
						                      			</td>
						                      		)
						                      	})
						                   		}	
						                    </tr>
															)
				                   	})
			                    }
			                  </tbody>
			                </table>
			              </div>
			              <div className="datepicker__bar">


			                <div className=' '>
			                 <div className="datepicker__sliderbar">
			                  <div className="datepicker__hours-mark datepicker__hours-mark--1 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--2 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--3 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--4 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--5 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--6 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--7 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--8 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--9 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--10 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--11 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--12 active" />
			                  <div className="datepicker__hours-mark datepicker__hours-mark--13 active" />
			                </div>
			                  <input type="range" name="points" min="0" max="12" id='lol' value={this.state.hour} ref='hour' onChange={() => this.update({hour: this.refs.hour.value})} className='slider__hours'/>
			    						</div>
			    						<div className='d-flex justify-content-between mt-3'>
			                	<div className="datepicker__hours">
			                  	Hours <b>{this.state.hour}</b>
			                	</div>
			                	<div className="datepicker__am-pm d-flex">
			                  	<div className={`p-2 datepicker__am-pm-btn ${this.state.clock === 'am' ? 'active' : ''} `} onClick={() => this.update({clock: 'am'})}>AM</div>
			                  	<div className={`p-2 datepicker__am-pm-btn ${this.state.clock === 'pm' ? 'active' : ''} `} onClick={() => this.update({clock: 'pm'})}>PM</div>
			                	</div>
			                </div>	
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			]
    )
  }
}

export default Calendar


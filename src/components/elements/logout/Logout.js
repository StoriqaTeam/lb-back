import React, {Component} from 'react'

      import { connect }            from 'react-redux'
import { bindActionCreators }    from 'redux'
import * as userActions          from './../../../actions/userActions'

import style              from './style.css'

class Logout extends Component {

 

  render(){

  	return(
			<div className='pl-3 align-items-center d-flex' onClick={() => this.props.userActions.logout() }>EXIT</div>
    )
  }
}

			

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    userActions:   bindActionCreators(userActions,   dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)


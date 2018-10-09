import React, { Component }         from 'react'
import {  Route, Switch, Redirect } from 'react-router-dom'
import { withCookies, Cookies }     from 'react-cookie'
import FBRedirect                   from './../components/stuff/FBRedirect'
import TwRedirect                   from './../components/stuff/TwRedirect'
import GoogleRedirect               from './../components/stuff/GoogleRedirect'
import InstagramRedirect            from './../components/stuff/InstagramRedirect'
import Main                         from './../components/main/Main'
import IndexPage                    from './../components/main/public/index_page/IndexPage'
import Policy                       from './../components/main/public/policy/Policy'
import FAQ                          from './../components/main/public/faq/FAQ'
import Rules                        from './../components/main/public/rules/Rules'
import Winners                      from './../components/main/public/winners/Winners'
import Profile                      from './../components/main/private/profile/Profile'
import ActivationPage               from './../components/stuff/ActivationPage'

class Routes extends Component {
  render(){
    let cookies = new Cookies;
    return (
    	<Switch>
            < Route path='/fb'         render={(props)  => < FBRedirect        {...props}  {...this.props} /> }  key='FBRedirect'/ >
            < Route path='/tw'         render={(props)  => < TwRedirect        {...props}  {...this.props} /> }  key='TwRedirect'/ >           
            < Route path='/google'     render={(props)  => < GoogleRedirect    {...props}  {...this.props} /> }  key='GoogleRedirect'/ >           
            < Route path='/instagram'  render={(props)  => < InstagramRedirect {...props}  {...this.props} /> }  key='InstagramRedirect'/ >           
            <Main {...this.props}>
    			< Route exact path='/'        render={(props)  => < IndexPage {...props}  {...this.props} /> } key='IndexPage'/ >
	 			< Route       path='/winners' render={(props)  => < Winners   {...props}  {...this.props} /> } key='Winners'/ >                              
                < Route       path='/policy'  render={(props)  => < Policy    {...props}  {...this.props} /> } key='Policy'/ >                              
                < Route       path='/faq'     render={(props)  => < FAQ       {...props}  {...this.props} /> } key='Policy'/ >                              
                < Route       path='/rules'   render={(props)  => < Rules     {...props}  {...this.props} /> } key='Policy'/ >                              
            	{	this.props.user &&
 					< Route exact path='/profile'  render={(props)  => < Profile  {...props}  {...this.props} /> }  key='Profile'/ >
 				}
                < Route path='/user/activate' render={(props)  => < ActivationPage  {...props}  {...this.props} /> }  key='ActivationPage'/ >
                < Route path='* '             render={(props)  => '404' }/ >   	
    		</Main>
    	</Switch>
    )
  }
}

export default Routes;

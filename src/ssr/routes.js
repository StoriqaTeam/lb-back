 import 'babel-polyfill'
import React, { Component } from 'react'
import Page404              from './../components/stuff/Page404'
import IndexPage            from './../components/main/public/index_page/IndexPage'
import FAQ                  from './../components/main/public/faq/FAQ'
import Main                  from './../components/main/Main'



class Routes extends Component {

   renderRouter(r){

    let props = {
      ...this.props,
      location: {
        pathname: r
      }
    }

    switch(true) {                             //в рамках нашего проекта такая функция удобнее и быстрее чем StaticRouter
      case r === '/404':                       // рендерим компоненты из папки views. туда они попадают c помощью build
        return (
          <Main user={props.user}>
            <Page404 />
          </Main>
        ) 
        break 
      case r === '/403':
        return (
          <Main user={props.user}>
            <SignPage />
          </Main>
        ) 
        break  
      case /\/news\/general\/.*/.test(r):
        return (
          <Main user={props.user}>
            <SingleNewsPage {...props}/>
          </Main>
        ) 
        break   
      case r === '/faq':
        return (
          <Main user={props.user}>
            <FAQ  {...props}/>
          </Main>
        ) 
        break   
                      
      case r === '/':
        return (
          <Main user={props.user}>
            <IndexPage {...props} />
          </Main>
        )  
        break    
      default:
        return null
        break
    }          
  }

  render() {
    return this.renderRouter(this.props.route)
  }
}

export default Routes 



import React, { Component }   from 'react'
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet'


const Page404 = () => {
  // if (app.isFetching){
  //   appActions.endRequest()
  // }
  return (
    <div className="stuff__block container" id="not-found__block">
      <Helmet>
      <title>Страница не найдена</title>
      <meta name="prerender-status-code" content="404"/>
      </Helmet>
      <div className='stuff__wrapper wrap-center'>
        <h1>Ошибка 404 </h1>
        <div>Такие дела. Запрашиваемая вами страница не найдена. <br/> 
        Попробуйте перейти на <Link to="/" className='link__stuff'>главную страницу</Link> или <span className='link__stuff link' onClick={() => history.go(-1)}>вернитесь назад</span> 
      </div>
      </div>  
    </div>    
  )
}

export default Page404


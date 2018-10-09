import 'babel-polyfill'
import { Cookies } from 'react-cookie'
import * as reducers  from '../reducers'


const getProfile = (user, token, deviceId) => {

  return ({
    type: 'GOT_USER',
    payload: user
  })
}

const logout = () => {
  let cookies = new Cookies;
  cookies.remove('token', {path: '/'})
  cookies.remove('deviceId', {path: '/'})
  cookies.remove('refId', {path: '/'})
  cookies.remove('noMobileApp', {path: '/'})
  cookies.remove('utmData', {path: '/'})
  document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;'
	return {
		type: 'USER_LOGOUT'
	}
}



export {  getProfile, logout }


import {Cookies}            from "react-cookie"
import {setTokenCookie}     from './constantsApp'


const API_URL = ''

const GET_USER = async (code) => {
	let headers = new Headers()
	headers.append('X-Auth-Token', code)
	let user =	await fetch(`${API_URL}/api/v1/user/profile`,{
			method: 'GET',
			headers: new Headers({
				'X-Auth-Token': code,
				'Content-Type' : 'application/json'

			})
		})
		.then(
			res => res.json(),
			err => err
		)
		.then(json => {
			console.log(json)
			setTokenCookie(json.token)
			return json	
		})
		return user
}

export  {API_URL, GET_USER}

const URL        = '/api/v1/';
const pgConsts   = require('./../config/pg');
const pgAPI      = require('./pg');

module.exports = {
	async signUp(email, password, ref){
		return await pgAPI.execTheQuery('createUser', email, password, Math.sqrt(ref))
		.then(
			res => {
				return res.rows[0] || null 
			},
			err => err
		)
	},
	async signIn(email, password){
		return await pgAPI.execTheQuery('loginUser', email, password)
		.then(
			res => {
				return res.rows[0]
			},
			err => err
		)
	},
	async activateUser(hash){
		return await pgAPI.execTheQuery('activateUser', Math.sqrt(hash))
		.then(
			res => {
				let user = res.rows[0]
				delete user.password
				return 	user

			},
			err => err
		)		
	}
}
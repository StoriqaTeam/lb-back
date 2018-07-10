const URL        = '/api/v1/';
const pgConsts   = require('./../config/pg');
const pgAPI      = require('./pg');

module.exports = {
	async signUp(email, password){
		return await pgAPI.execTheQuery('createUser', email, password)
		.then(
			res => {
				console.log(res)
				return res.rows[0] && res.rows[0].id || null 
			},
			err => err
		)
	},
	async signIn(email, password){
		return await pgAPI.execTheQuery('loginUser', email, password)
		.then(
			res => {
				console.log(res)
				return res.rows[0]
			},
			err => err
		)
	}
}
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
	},
	async getUserBySocId(provider, soc_id){
		return await pgAPI.execTheQuery('getUserBySocId', provider, soc_id)
		.then(
			res => {
				let user = res.rows[0] || null
				return 	user

			},
			err => {
				console.log(err)
				return err
			}		)	
	},
	async getUserById(id){
		return await pgAPI.execTheQuery('getUserById', id)
		.then(
			res => {
				return 	res.rows[0] || null
			},
			err => {
				console.log(err)
				return err
			})
	},
	async createUserBySocialId(name, surname){
		return await pgAPI.execTheQuery('createUserBySocialId', name, surname)
		.then(
			res => {
				let user = res.rows[0]
				console.log(user)
				delete user.password
				return 	user

			},
			err => {
				console.log(err)
				return err
			}
		)			
	},
	async createUserSocial(params, cookies){
		return await pgAPI.execTheQuery('createUserSocial', params)
		.then(
			res => {
				console.log(res.rows)
				return res.rows[0]

			},
			err => {
				console.log(err)
				return err
			}
		)			
	},
		async sendRef(email, hash){
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
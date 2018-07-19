const URL        = '/api/v1/';
const pgConsts   = require('./../config/pg');
const pgAPI      = require('./pg');

module.exports = {
	async createMessage(message){
		return await pgAPI.execTheQuery('createMessage', message)
		.then(
			res => {
				
				console.log(res)
				return res.rows[0]
			},
			err => err
		)
	},
	async getMessages(){
		return await pgAPI.execTheQuery('getMessages')
		.then(
			res => {		
				console.log(res)
				return res.rows
			},
			err => err
		)		
	}
}
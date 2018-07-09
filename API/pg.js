const { Client } = require('pg');
const pg = require('./../config/pg')


module.exports = {
	async execTheQuery(query, ...params) {
		let client = new Client(pg.pgCredentials)
		await client.connect()
		let response = await client.query(pg[query](params))
		client.end()
		return response
	}
}
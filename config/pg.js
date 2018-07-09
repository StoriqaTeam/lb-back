module.exports = {
  pgCredentials: {
  	user: 'postgres',
  	host: '127.0.0.1',
  	database: 'lucky',
  	password: '1488',
  	port: 5433,
  	ssl: true
  },
  createUser(props){
  	  	console.log(props)

  	return {
  		text: 'INSERT INTO users (email, password, signed_up) VALUES ($1, $2, $3) RETURNING id;',
  		values: [props[0], props[1], new Date()]
  	}
  },
  loginUser(props){
  	console.log(props)
  	return {
  		text: 'SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1;',
  		values: [props[0], props[1],]
  	}  	
  }
}
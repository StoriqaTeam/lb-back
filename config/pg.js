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
  		text: 'INSERT INTO users (email, password, refed_by, signed_up) VALUES ($1, $2, $3, $4) RETURNING id, email;',
  		values: [props[0], props[1], props[2], new Date()]
  	}
  },
  loginUser(props){
  	console.log(props)
  	return {
  		text: 'SELECT * FROM users WHERE email = $1 AND password = $2 AND email_verified = true LIMIT 1;',
  		values: [props[0], props[1],]
  	}  	
  },
  activateUser(props){
    return {
      text: 'UPDATE users SET email_verified = true WHERE id = $1 RETURNING *;',
      values: [props[0]]
    }    
  },
  getUserBySocId(props){
    console.log(props)
    return {
      text: 'SELECT * FROM user_soc_providers WHERE provider = $1 AND soc_id = $2 LIMIT 1;',
      values: [props[0], props[1]]
    }
  },
  getUserById(props){
    console.log(props)
    return {
      text: 'SELECT * FROM users WHERE id = $1;',
      values: [props[0]]
    }    
  },
  createUserBySocialId(props){
    console.log(props)
    return {
      text: 'INSERT INTO users (name, surname, signed_up) VALUES ($1, $2, $3) RETURNING *;',
      values: [props[0], props[1], new Date()]
    }
  },
  createUserSocial(props){
    let params = props[0]
    return {
      text: `INSERT INTO user_soc_providers (name, surname, img, provider, soc_id, refed_by, signed_up) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      values: [params.name, params.surname, params.img, params.provider, params.soc_id, params.refed_by, new Date()]
    }
      
  }
}
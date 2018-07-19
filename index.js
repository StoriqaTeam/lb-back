const express     = require('express'),
          app     = express(),
    
         path     = require('path'),
          userAPI = require('./API/user'),
          chatAPI = require('./API/chat'),
          pg = require('./API/pg'),
          mailAPI = require('./helpers/mail'),
        mailTempl = require('./config/mail'),
     cookieParser = require('cookie-parser');


app.use(express.json());


app.use(cookieParser())
// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 5000);
console.log(`App listening on port ${process.env.PORT || 5000}`)
//SSR function import

app.use((req, res, next) => {
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://lb-front.stq.cloud', 'https://lb-front.stq.cloud'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, application/json');

  next();
});


app.post('/api/v1/signup', 
	async (req, res) => {
		let userCreated =  await userAPI.signUp(req.body.email, req.body.password, req.body.ref)
		console.log(userCreated)
		if (userCreated){
			await mailAPI.sendTheMessage(mailTempl.activation(req.body.email, userCreated.id))
		} 
		return (userCreated) 
		? res.status(200).json({
			status: 'success',
			message: 'Ссылка на активацию аккаунта выслана на указанный адрес эл.почты'
		})
		: res.status(500).json({
			status: 'error',
			message: false
		})

	}
)

app.post('/api/v1/signin', 
	async (req, res) => {
		let user = await userAPI.signIn(req.body.email, req.body.password)
		return (user)  
		? res.status(200).json({
			status: 'success',
			message: user
		})
		: res.status(401).json({
			status: 'error',
			message: 'Неверный логин/пароль'
		})

	}
)

app.post('/api/v1/activate', 
	async (req, res) => {
		let user = await userAPI.activateUser(req.body.hash)
		console.log('user: ', user)
		return (user)  
		? res.status(200).json({
			status: 'success',
			message: user
		})
		: res.status(403).json({
			status: 'error',
			message: 'Неверный логин/пароль'
		})

	}
)

app.post('/api/v1/soc_auth', 
	async (req, res, next) => {
		let user = await userAPI.getUserBySocId(req.body.provider, req.body.soc_id)
		return (user) 
		? res.status(200).json({status: 'success', message: user})
		: next()
		
	},
	async(req, res) => {
		console.log(req)
		// let user = await userAPI.createUserBySocialId(req.body)
		let socialsUser = await userAPI.createUserSocial(req.body)
		// console.log(user.name, socialsUser.id)
		res.status(200).json({
			status: 'success',
			message: socialsUser
		})
	}
)

app.post('/api/v1/send_ref', 
	async (req, res) => {
		let sentMail = 			await mailAPI.sendTheMessage(mailTempl.sendRef(req.body.email, req.body.id))
		return (sentMail)  
		? res.status(200).json({
			status: 'success',
			message: sentMail
		})
		: res.status(502).json({
			status: 'error',
			message: 'Ошибка доставки'
		})

	}
)
app.get('/api/v1/get_messages', 
	async (req, res) => {
		let getMessages = await chatAPI.getMessages()
		return (getMessages)  
		? res.status(200).json({
			status: 'success',
			message: getMessages
		})
		: res.status(502).json({
			status: 'error',
			message: 'Ошибка доставки'
		})

	}
)

app.post('/api/v1/create_message', 
	async (req, res) => {
		let createMessage = await chatAPI.createMessage(req.body)
		let getMessages = await chatAPI.getMessages()

		return (getMessages)  
		? res.status(200).json({
			status: 'success',
			message: getMessages
		})
		: res.status(502).json({
			status: 'error',
			message: 'Ошибка доставки'
		})

	}
)

app.get('*', 
  (req, res) => res.status(404).json({status: false})
)
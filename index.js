const express     = require('express'),
          app     = express(),
    
         path     = require('path'),
          userAPI = require('./API/user'),
          pg = require('./API/pg'),
          mailAPI = require('./helpers/mail'),
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
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, application/json');

  next();
});


app.post('/api/v1/signup', 
	async (req, res) => {
		let userCreated =  await userAPI.signUp(req.body.email, req.body.password)

		if (userCreated){
			await mailAPI.sendEmail('http://localhost:5000', Math.pow(userCreated, 2) )
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
		: res.status(403).json({
			status: 'error',
			message: 'Неверный логин/пароль'
		})

	}
)


app.get('*', 
  (req, res) => res.status(200).json({root: true})
)
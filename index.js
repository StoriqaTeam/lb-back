const express     = require('express'),
          app     = express(),
    
         path     = require('path'),
          userAPI = require('./API/user'),
          pg = require('./API/pg'),

     cookieParser = require('cookie-parser');

// const bodyParser = require('body-parser');

app.use(express.json());

// Serving static files
// app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
// app.use('/media', express.static(path.resolve(__dirname, 'media')));
// app.use('/src/images', express.static(path.resolve(__dirname, 'src/images')));
// app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
// app.use('/src/fonts',  express.static(path.resolve(__dirname, 'src/fonts')));
//Serving cookies
app.use(cookieParser())
// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 5000);
console.log(`App listening on port ${process.env.PORT || 5000}`)
//SSR function import


app.post('/api/v1/signup', 
	async (req, res) => {
		return (await userAPI.signUp(req.body.email, req.body.password))  
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
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const config = require('config');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
app.use(express.json());

app.use(cookieParser());
app.disable('x-powered-by');
app.listen(process.env.PORT || 3000);
console.log(`App listening on port ${process.env.PORT || 3000}`);

app.use((req, res, next) => {
    let allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://lb-front.stq.cloud', 'https://lb-front.stq.cloud'];
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, application/json');

    next();
});

require('./routes')(app);
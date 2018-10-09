const config = require("config");
const baseUrl = config.get("base_url");
const  template     = require('./../views/template');

const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const messageController = require('../controllers').messages;
const walletController = require('../controllers').wallets;
const mainController = require('../controllers').main;
const balanceController = require('../controllers').balance;
const betsController = require('../controllers').bets;

const auth = require('../middleware/auth');
const twofa = require('../middleware/2fa');


const ssr = require('./../views/server'); 

module.exports = (app) => {

  app.get('/',  auth.authRender, async  (req, res) => {

    let state = {
    	user: req.user
    }


    const  content  = ssr(req.path, state)
    const response = template("Lucky block.", state, content, req.hostname)
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    return res.status(200).send(response);

  });

  app.get('/faq', auth.authRender, async  (req, res) => {

    let state = {
    	user: req.user
    }

    const  content  = ssr(req.path, state)
    const response = template("Lucky block.", state, content, req.hostname)
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    return res.status(200).send(response);

  });

  app.get(['/fb', '/tw', '/google'], async  (req, res) => {

    let state = {
    	user: null
    }

    const  content  = ssr(req.path, state)
    const response = template("Lucky block.", state, content, req.hostname)
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    return res.status(200).send(response);

  });

  app.all('*', (req, res) => res.status(404).send({
       message: 'Error 404. Page not found',
       status: false
   }));

};

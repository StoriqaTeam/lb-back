const config = require("config");
const baseUrl = config.get("base_url");

const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const messageController = require('../controllers').messages;
const walletController = require('../controllers').wallets;

const auth = require('../middleware/auth');

module.exports = (app) => {
    app.get(baseUrl + '/', (req, res) => res.status(200).send({
        message: 'Welcome to the API v1.0!',
    }));

    app.post(baseUrl + '/signin', authController.signin);
    app.post(baseUrl + '/signup', authController.signup);
    app.post(baseUrl + '/user/activate', authController.activate);
    app.post(baseUrl + '/auth-social', authController.authSocial);
    app.post(baseUrl + '/auth/twitter', authController.authTwitter);
    app.post(baseUrl + '/auth/twitter/reverse', authController.authTwitter);

    app.get(baseUrl + '/2fa', authController.google2fa);
    app.post(baseUrl + '/2fa', auth, authController.google2fa_enable);

    app.get(baseUrl + '/users', usersController.list);
    app.get(baseUrl + '/users/:id', auth, usersController.get);
    app.put(baseUrl + '/users/:id', auth, usersController.update);
    app.delete(baseUrl + '/users/:id', auth, usersController.destroy);

    app.get(baseUrl + '/user/profile', auth, usersController.profile);
    app.post(baseUrl + '/user/deposit-address', usersController.getAddress);
    app.post(baseUrl + '/send_ref', usersController.sendRef);

    app.get(baseUrl + '/messages', messageController.list);
    app.post(baseUrl + '/message', messageController.create);

    app.get(baseUrl + '/transactions', walletController.getTransactions);
    app.get(baseUrl + '/wallets', walletController.list);
    app.post(baseUrl + '/transactions', walletController.getTransactions);

    app.get('*', (req, res) => res.status(404).send({
        message: 'Error 404. Page not found',
        status: false
    }));
};
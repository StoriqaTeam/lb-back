const config = require("config");
const baseUrl = config.get("base_url");

const usersController = require('../controllers').users;
const authController = require('../controllers').auth;

const auth = require('../middleware/auth');

module.exports = (app) => {
    app.get(baseUrl + '/', (req, res) => res.status(200).send({
        message: 'Welcome to the API v1.0!',
    }));

    app.post(baseUrl + '/signin', authController.signin);
    app.post(baseUrl + '/signup', authController.signup);


    require('./passport')(app);

    // app.get(baseUrl + '/2fa', authController.google2fa);

    app.get(baseUrl + '/users', usersController.list);
    app.get(baseUrl + '/users/:id', auth, usersController.get);
    app.put(baseUrl + '/users/:id', auth, usersController.update);
    app.delete(baseUrl + '/users/:id', auth, usersController.destroy);

    app.get(baseUrl + '/user/profile', auth, usersController.profile);


    app.get('*', (req, res) => res.status(404).send({
        message: 'Error 404. Page not found',
        status: false
    }));
};
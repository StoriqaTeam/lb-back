const usersController = require('../controllers').users;
const authController = require('../controllers').auth;

const auth = require('../middleware/auth');

module.exports = (app) => {
    app.get('/api/v1/', (req, res) => res.status(200).send({
        message: 'Welcome to the API v1.0!',
    }));

    app.post('/api/v1/signin', authController.signin);
    app.post('/api/v1/signup', authController.signup);
    app.get('/api/v1/users', usersController.list);
    // app.get('/api/products/:id', productsController.get);
    // app.post('/api/products', productsController.create);
    // app.put('/api/products/:id', productsController.update);
    app.delete('/api/v1/users/:id', auth, usersController.destroy);


    app.get('*', (req, res) => res.status(404).send({
        message: 'Error 404. Page not found',
        status: false
    }));
};
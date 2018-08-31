const config = require("config");
const baseUrl = config.get("base_url");

const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const messageController = require('../controllers').messages;
const walletController = require('../controllers').wallets;
const mainController = require('../controllers').main;

const auth = require('../middleware/auth');

module.exports = (app) => {
    app.get(baseUrl + '/', (req, res) => res.status(200).send({
        message: 'Welcome to the API v1.0!',
    }));

    /**
     * @swagger
     * /api/v1/signin:
     *   post:
     *     tags:
     *       - User
     *     description: Login user
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: email
     *          description: User email
     *          in: body
     *          required: true
     *          type: string
     *        - name: password
     *          description: User password
     *          in: body
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: Return token and User Object
     *         headers:
     *            x-auth-token:
     *              schema:
     *                  type: string
     *              description: User auth token
     *         schema:
     *           $ref: '#/definitions/User'
     */
    app.post(baseUrl + '/signin', authController.signin);
    /**
     * @swagger
     * /api/v1/signup:
     *   post:
     *     tags:
     *       - User
     *     description: User Registration
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: name
     *          description: User name
     *          in: body
     *          required: true
     *          type: string
     *        - name: email
     *          description: User email
     *          in: body
     *          required: true
     *          type: string
     *        - name: password
     *          description: User password
     *          in: body
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: Token and User
     *         headers:
     *            x-auth-token:
     *              schema:
     *                  type: string
     *              description: User auth token
     *         schema:
     *           $ref: '#/definitions/User'
     */
    app.post(baseUrl + '/signup', authController.signup);
    /**
     * @swagger
     * /api/v1/user/activate:
     *   post:
     *     tags:
     *       - User
     *     description: User Activation
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: code
     *          description: Activation code
     *          in: body
     *          required: true
     *          type: string
     *        - name: email
     *     responses:
     *       200:
     *         description: User successfull activated
     *       400:
     *         description: Invalid activation code.
     */
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
    // app.post(baseUrl + '/transactions', walletController.getTransactions);

    app.get(baseUrl + '/price', mainController.price);

    app.get('*', (req, res) => res.status(404).send({
        message: 'Error 404. Page not found',
        status: false
    }));
    /**
     * @swagger
     * definitions:
     *  User:
     *      properties:
     *          name:
     *              type: string
     *          email:
     *              type: string
     *          password:
     *              type: string
     *              format: password
     *          avatar:
     *              type: string
     *          is_verified:
     *              type: integer
     *          verification_code:
     *              type: string
     *          ref_id:
     *              type: integer
     *          ref_code:
     *              type: string
     *          google2fa_secret:
     *              type: string
     *          provider_type:
     *              type: string
     *          createdAt:
     *              type: string
     *              format: date-time
     *          updatedAt:
     *              type: string
     *              format: date-time
     */
};

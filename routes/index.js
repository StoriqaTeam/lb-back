const config = require("config");
const baseUrl = config.get("base_url");

const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const messageController = require('../controllers').messages;
const walletController = require('../controllers').wallets;
const mainController = require('../controllers').main;
const balanceController = require('../controllers').balance;

const auth = require('../middleware/auth');
const twofa = require('../middleware/2fa');

module.exports = (app) => {
    app.get(baseUrl + '/', (req, res) => res.status(200).send({
        message: 'Welcome to the API v1.0!',
    }));

    /**
     * @swagger
     * /api/v1/signin:
     *   post:
     *     tags:
     *       - User Auth
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
     *       - User Auth
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
     *       - User Auth
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
    /**
     * @swagger
     * /api/v1/auth-social:
     *   post:
     *     tags:
     *       - User Auth
     *     description: User authorizing by social network
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: provider
     *          description: Social network provider name
     *          in: body
     *          required: true
     *          type: string
     *        - name: profile
     *          description: Profile from social network
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
    app.post(baseUrl + '/auth-social', authController.authSocial);
    app.post(baseUrl + '/auth/twitter', authController.authTwitter);
    app.post(baseUrl + '/auth/twitter/reverse', authController.authTwitter);
    /**
     * @swagger
     * /api/v1/2fa:
     *   get:
     *     tags:
     *       - Two factor authentication
     *     description: Two factor authentication
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: x-auth-token
     *          description: User Auth token
     *          in: header
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: Return 2fa secret
     *         properties:
     *          secret:
     *              type: string
     *              description: Secret code
     *          image:
     *              type: string
     *              description: QR Code base64
     */
    app.get(baseUrl + '/2fa', auth, authController.google2fa);
    /**
     * @swagger
     * /api/v1/2fa:
     *   post:
     *     tags:
     *       - Two factor authentication
     *     description: Activate Two factor
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: x-auth-token
     *          description: User Auth token
     *          in: header
     *          required: true
     *          type: string
     *        - name: secret
     *          description: Secret
     *          in: body
     *          required: true
     *          type: string
     *        - name: token
     *          description: Token
     *          in: body
     *          required: true
     *          type: integer
     *          example: 123456
     *     responses:
     *       200:
     *         description: 2fa enable
     *       400:
     *         description: token not equal
     */
    app.post(baseUrl + '/2fa', auth, authController.google2fa_enable);

    /**
     * @swagger
     * /api/v1/users:
     *   get:
     *     tags:
     *       - User
     *     description: User list
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: User list
     *         properties:
     *          users:
     *              type: array
     *              items:
     *                  $ref: '#/definitions/User'
     *       400:
     *          description: Error
     */
    app.get(baseUrl + '/users', usersController.list);
    /**
     * @swagger
     * /api/v1/users/{id}:
     *   get:
     *     tags:
     *       - User
     *     description: User list
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-auth-token
     *         description: User Auth token
     *         in: header
     *         required: true
     *         type: string
     *       - name: id
     *         description: User's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: User list
     *         schema:
     *           $ref: '#/definitions/User'
     *       404:
     *          description: User Not Found
     */
    app.get(baseUrl + '/users/:id', auth, usersController.get);
    /**
     * @swagger
     * /api/v1/users/{id}:
     *   put:
     *     tags:
     *       - User
     *     description: Update user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-auth-token
     *         description: User Auth token
     *         in: header
     *         required: true
     *         type: string
     *       - name: id
     *         description: User's id
     *         in: path
     *         required: true
     *         type: integer
     *       - name: name
     *         description: User's name
     *         in: body
     *         required: true
     *         type: string
     *       - name: email
     *         description: User's email
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Successfully updated
     *         schema:
     *           $ref: '#/definitions/User'
     *       404:
     *          description: User Not Found
     */
    app.put(baseUrl + '/users/:id', auth, usersController.update);
    /**
     * @swagger
     * /api/v1/users/{id}:
     *   delete:
     *     tags:
     *       - User
     *     description: Deletes a single user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-auth-token
     *         description: User Auth token
     *         in: header
     *         required: true
     *         type: string
     *       - name: id
     *         description: User's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Successfully deleted
     *       404:
     *         description: User Not Found
     */
    app.delete(baseUrl + '/users/:id', auth, usersController.destroy);

    /**
     * @swagger
     * /api/v1/user/profile:
     *   get:
     *     tags:
     *       - User
     *     description: User list
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-auth-token
     *         description: User Auth token
     *         in: header
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: User Profile
     *         properties:
     *          user:
     *              $ref: '#/definitions/User'
     *          wallets:
     *              type: array
     *              items:
     *                  $ref: '#/definitions/Wallet'
     *          transactions:
     *              type: array
     *              items:
     *                  $ref: '#/definitions/Transactions'
     *       404:
     *          description: User Not Found
     */
    app.get(baseUrl + '/user/profile', auth, usersController.profile);
    /**
     * @swagger
     * /api/v1/user/deposit-address:
     *   post:
     *     tags:
     *       - User
     *     description: Get user deposit address
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: x-auth-token
     *          description: User Auth token
     *          in: header
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: 2fa enable
     *       404:
     *         description: User Not Found
     */
    app.post(baseUrl + '/user/deposit-address', usersController.getAddress);
    /**
     * @swagger
     * /api/v1/send_ref:
     *   post:
     *     tags:
     *       - User
     *     description: Send referral link
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: email
     *          description: Email
     *          in: body
     *          required: true
     *          type: string
     *        - name: id
     *          description: Referral code
     *          in: body
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: success send
     *       400:
     *         description: Error send
     */
    app.post(baseUrl + '/send_ref', usersController.sendRef);

    /**
     * @swagger
     * /api/v1/messages:
     *   get:
     *     tags:
     *       - Message
     *     description: List of messages
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: limit
     *         description: Limit
     *         in: query
     *         required: false
     *         type: integer
     *       - name: offset
     *         description: Offset
     *         in: query
     *         required: false
     *         type: integer
     *     responses:
     *       200:
     *         description: User Profile
     *         properties:
     *          messages:
     *              type: array
     *              items:
     *                  $ref: '#/definitions/Message'
     */
    app.get(baseUrl + '/messages', messageController.list);
    /**
     * @swagger
     * /api/v1/message:
     *   post:
     *     tags:
     *       - Message
     *     description: Create new message
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: user_id
     *          description: User's id
     *          in: body
     *          required: true
     *          type: integer
     *        - name: user_name
     *          description: User name
     *          in: body
     *          required: false
     *          type: string
     *        - name: content
     *          description: Text of message
     *          in: body
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: ok
     *         schema:
     *           $ref: '#/definitions/Message'
     *       400:
     *         description: Error create
     */
    app.post(baseUrl + '/message', messageController.create);

    app.get(baseUrl + '/transactions', walletController.getTransactions);
    /**
     * @swagger
     * /api/v1/wallets:
     *   get:
     *     tags:
     *       - Wallet
     *     description: List of wallets
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Wallets list
     *         properties:
     *          messages:
     *              type: array
     *              items:
     *                  $ref: '#/definitions/Wallet'
     */
    app.get(baseUrl + '/wallets', walletController.list);
    /**
     * @swagger
     * /api/v1/wallet/add:
     *   post:
     *     tags:
     *       - Wallet
     *     description: Add wallet to user
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: x-auth-token
     *          description: User Auth token
     *          in: header
     *          required: true
     *          type: string
     *        - name: currency
     *          description: Type of currency
     *          in: body
     *          required: true
     *          type: string
     *        - name: address
     *          description: Address
     *          in: body
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: Successfully created
     *         schema:
     *            $ref: '#/definitions/Wallet'
     */
    app.post(baseUrl + '/wallet/add', [auth, twofa], walletController.add);
    // app.post(baseUrl + '/transactions', walletController.getTransactions);

    /**
     * @swagger
     * /api/v1/balance:
     *   get:
     *     tags:
     *       - Balance
     *     description: Current user balance
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: x-auth-token
     *          description: User Auth token
     *          in: header
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: Balance
     *         schema:
     *            $ref: '#/definitions/Balance'
     */
    app.get(baseUrl + '/balance', auth, balanceController.index );
    /**
     * @swagger
     * /api/v1/balance/withdraw:
     *   get:
     *     tags:
     *       - Balance
     *     description: Current user balance
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: x-auth-token
     *          description: User Auth token
     *          in: header
     *          required: true
     *          type: string
     *        - name: amount
     *          description: Amount
     *          in: body
     *          required: true
     *          type: string
     *        - name: address
     *          description: Wallet Address
     *          in: body
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: Balance
     *         schema:
     *            $ref: '#/definitions/Balance'
     */
    app.post(baseUrl + '/balance/withdraw', [auth, twofa], balanceController.withdraw );

    /**
     * @swagger
     * /api/v1/accessToken:
     *   get:
     *     tags:
     *       - KYC
     *     description: Get access token
     *     produces:
     *       - application/json
     *     parameters:
     *        - name: x-auth-token
     *          description: User Auth token
     *          in: header
     *          required: true
     *          type: string
     *     responses:
     *       200:
     *         description: Return Token
     *         properties:
     *          token:
     *              type: string
     *              description: Token
     */
    app.get(baseUrl + '/accessToken', auth, mainController.accessToken);
    app.post(baseUrl + '/check2fa', authController.check2fa);
    app.post(baseUrl + '/disable2fa', authController.disable2fa);
    /**
     * @swagger
     * /api/v1/price:
     *   get:
     *     tags:
     *       - System
     *     description: Get usd price of btc and eth by coinmarketcap
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Prices
     *         properties:
     *          eth:
     *              type: number
     *              format: double
     *              description: ETH price
     *          btc:
     *              type: number
     *              format: double
     *              description: BTC price
     */
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
     *  Message:
     *      properties:
     *          user_id:
     *              type: integer
     *          user_name:
     *              type: string
     *          content:
     *              type: string
     *          avatar:
     *              type: string
     *          is_active:
     *              type: boolean
     *  Wallet:
     *      properties:
     *          user_id:
     *              type: integer
     *          currency:
     *              type: string
     *          address:
     *              type: string
     *          wallet_type:
     *              type: string
     *          is_active:
     *              type: boolean
     *          is_confirmed:
     *              type: boolean
     *          balance:
     *              type: number
     *              format: double
     *  Balance:
     *      properties:
     *          user_id:
     *              type: integer
     *          currency:
     *              type: string
     *          wallet_id:
     *              type: integer
     *          wallet_address:
     *              type: string
     *          amount:
     *              type: number
     *              format: double
     *  Transactions:
     *      properties:
     *          wallet_id:
     *              type: integer
     *          status:
     *              type: string
     *          tx_hash:
     *              type: string
     *          sender:
     *              type: string
     *          amount:
     *              type: number
     *              format: double
     *          price_usd:
     *              type: number
     *              format: double
     *          confirmations:
     *              type: integer
     */
};

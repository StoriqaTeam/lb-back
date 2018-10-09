const User = require('../models').User;
const Wallet = require('../models').Wallet;
const Transaction = require('../models').Transaction;
const walletGenerator = require('../helpers/wallet');
const mailer = require("../helpers/mailer");
const _ = require('lodash');
const userHelper = require('../helpers/user');

module.exports = {
    list(req, res) {
        return User
            .all({order: [
                    ['id', 'ASC']
                ]})
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).json({message: error}));
    },
    get(req, res) {
        return User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).json(user);
            })
            .catch(error => res.status(400).json({message: error}));
    },
    async getUser(req, res) {
        return User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User Not Found',
                    });
                }
                return user;
            })
            .catch(error => res.status(400).json({message: error}));
    },
    async update(req, res) {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: 'User Not Found',
            });
        }
        const isExistEmail = await userHelper.checkEmail(req.body.email);
        if (req.body.email && isExistEmail) {
            return res.status(400).json({message: `User with email ${req.body.email} already exist`});
        }
        await user.update({
            name: req.body.name || user.name,
            email: req.body.email || user.email
        });
        return res.status(200).json(user);
    },
    destroy(req, res) {
        return User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(200).json({message: 'User deleted.'}))
                    .catch(error => res.status(400).json({message: error}));
            })
            .catch(error => res.status(400).json({message: error}));
    },
    async profile(req, res) {
        // console.log("user", req.user);
        const wallets = await Wallet.findAll({where: {user_id: req.user.id}});
        const walletsId = new Array();
        for(const wallet of wallets) {
            walletsId[wallet.id] = wallet.id;
        }
        const transactions = await Transaction.findAll({where: {wallet_id: walletsId}});
        return User.findById(req.user.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).json({user, wallets, transactions});
            })
            .catch(error => res.status(400).json({message: error}));
    },
    async getAddress(req, res) {
        let user_id = req.user.id;
        let user = await User.findOne({where: {id: user_id}});
        if (!user_id || !user) {
            return res.status(400).json({message: 'User Not Found'});
        }
        return Wallet.findOne({where: {user_id: user_id, wallet_type: null}})
            .then(wallet => {

                if (!wallet) {
                    return walletGenerator.generateAddress()
                        .then(address => {
                            wallet = new Wallet;
                            wallet.user_id = user_id;//req.user.id;
                            wallet.address = address[0].Address;
                            wallet.currency = address[0].Currency;
                            wallet.is_active = true;
                            wallet.save();

                            return res.status(200).json(wallet);
                        })
                        .catch(error => res.status(400).json({message: error}));
                }
                return res.status(200).json(wallet);
            })
            .catch(error => res.status(400).json({message: error}));
    },
    sendRef(req, res) {
        const email = req.body.email;
        const refCode = req.body.id;
        if (refCode) {
            mailer.sendRef(email, refCode);
            return res.status(200).json({message: "success send"});
        }
        return res.status(400).json({message: "Error send"});
    }
};
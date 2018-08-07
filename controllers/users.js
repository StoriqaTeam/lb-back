const User = require('../models').User;
const Wallet = require('../models').Wallet;
const walletGenerator = require('../helpers/wallet');
const mailer = require("../helpers/mailer");

module.exports = {
    list(req, res) {
        return User
            .all()
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
    update(req, res) {
        return User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update({
                        name: req.body.name || user.name,
                        email: req.body.email || user.email
                    })
                    .then(() => res.status(200).json(user))
                    .catch((error) => res.status(400).json({message: error}));
            })
            .catch((error) => res.status(400).json({message: error}));
    },
    destroy(req, res) {
        return User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).json({
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
    profile(req, res) {
        // console.log("user", req.user);
        return User.findById(req.user.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User Not Found',
                    });
                }
                // let address = walletGenerator.generateAddress().then(address => console.log(address));
                // console.log("address", address);
                return res.status(200).json(user);
            })
            .catch(error => res.status(400).json({message: error}));
    },
    async getAddress(req, res) {
        let user_id = req.body.user_id;
        let user = await User.findById(user_id);
        if (!user) return res.status(404).json({
            message: 'User Not Found',
        });
        return Wallet.findOne({where: {user_id: user_id}})
            .then(wallet => {

                if (!wallet) {
                    return walletGenerator.generateAddress()
                        .then(address => {
                            wallet.user_id = req.user.id;
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
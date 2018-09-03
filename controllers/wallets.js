const axios = require('axios');
const config = require('config');
const Wallet = require('../models').Wallet;
const walletHelper = require('../helpers/wallet');

module.exports = {
    async list(req, res) {
        const wallets = await Wallet.all();
        return res.status(200).json(wallets);
    },
    async add(req, res) {
        const wallet = await Wallet.create({
            user_id: req.user.id,
            currency: req.body.currency ? req.body.currency : 'eth',
            address: req.body.address
        });
        return res.status(200).json(wallet);
    },
    async getTransactions(req, res) {
        const response = await axios.get(config.get('anypaycoins.url')+'/tx/', {
            headers: {'Authorization': config.get('anypaycoins.key')}
        });
        let transactions;
        if (response.data.Status == 'ok') {
            transactions = response.data.Result;
        }

        return res.status(200).json(transactions);
    },
    async sendTransaction(req, res) {

    }

};
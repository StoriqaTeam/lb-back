const axios = require('axios');
const config = require('config');
const Wallet = require('../models').Wallet;
const Balance = require('../models').Balance;

module.exports = {
    async withdraw(req, res) {
        if (req.user.kyc_status === 1) {
            return res.status(200).json('withdraw successfull');
        } else {
            return res.status(400).json({error: 'User not verified'});
        }
    },
    async index(req, res) {
        const balance = await Balance.findOne({where: {user_id: req.user.id}});
        return res.status(200).json(balance);
    }
};
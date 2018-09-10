const axios = require('axios');
const config = require('config');
const Wallet = require('../models').Wallet;
const Balance = require('../models').Balance;

module.exports = {
    async withdraw(req, res) {
        if (req.user.kyc_status === 2) return res.status(400).json('You need to complete KYC procedure');
        let balance = await Balance.findAll({where: {user_id: req.user.id}});
        if (balance.amount < req.body.amount) return res.status(400).json(`You have got ${balance.amount} but tried to withdraw more — ${req.body.amount}`);



        return res.status(200).json('withdraw successfull');
    },
    async index(req, res) {
        const balance = await Balance.findOne({where: {user_id: req.user.id}});
        return res.status(200).json(balance);
    }
};
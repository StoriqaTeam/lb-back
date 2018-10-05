const axios = require('axios');
const config = require('config');
const Wallet = require('../models').Wallet;
const Balance = require('../models').Balance;
const Decimal = require('decimal.js');

module.exports = {
    async withdraw(req, res) {
        if (req.user.kyc_status !== 1) {
            // return res.status(400).json({message: 'You need to complete KYC procedure'});
        }

        let balance = await Balance.findOne({where: {user_id: req.user.id}});
        // console.log(balance);
        if (!balance) {
            balance = {amount: 12};
            //return res.status(400).json({message: 'You have empty balance'});
        }
        let amount = (req.body.amount != undefined) ? new Decimal(req.body.amount) : new Decimal(0);
        let balanceAmount = (balance.amount != undefined) ? new Decimal(balance.amount) : new Decimal(0);
        // console.log(amount, ' = ', balanceAmount);
        if (amount.gt(0) && amount.gt(balanceAmount)) {
            return res.status(400).json(`You have got ${balance.amount} but tried to withdraw more — ${req.body.amount}`);
        }

        try {
            const response = await axios.get(config.get('anypaycoins.url')+'/transactions/', {
                headers: {'Authorization': config.get('anypaycoins.key')}
            });
            console.log(response);
            let transactions;
            if (response.data.Code == 200) {
                transactions = response.data.Result;
            }

            return res.status(200).json(transactions);
        } catch (e) {
            //console.log(e);
            return res.status(400).json({message: e.response.data.Result});
        }


        // return res.status(200).json('withdraw successfull');
    },
    async index(req, res) {
        const balance = await Balance.findOne({where: {user_id: req.user.id}});
        return res.status(200).json(balance);
    }
};
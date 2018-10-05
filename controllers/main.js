const axios = require('axios');
const config = require('config');
const User = require('../models').User;
const Payment = require('../models').payments;
const Wallet = require('../models').Wallet;
const Balance = require('../models').Balance;

const Decimal = require('decimal.js');

const apiUrl = config.get('sumsub.url');
const apiKey = config.get('sumsub.key');

module.exports = {
    async price(req, res) {
        const responseBtc = await axios.get('https://api.coinmarketcap.com/v2/ticker/1/');
        const responseEth = await axios.get('https://api.coinmarketcap.com/v2/ticker/1027/');

        return res.status(200).json({
            'eth': responseEth.data.data.quotes.USD.price,
            'btc': responseBtc.data.data.quotes.USD.price
        });
    },

    async accessToken(req, res) {
        try {
            const userId = req.user.id;
            const urlMethod = `${apiUrl}/resources/accessTokens?key=${apiKey}&userId=${userId}`;
            const response = await axios.post(urlMethod);

            return res.status(200).json({token: response.data.token});
        } catch (e) {
            return res.status(400).json({message: e.response.data.description});
        }
    },

    async kycCallback(req, res) {
        try {
            const answer = req.body;

            if (!answer.externalUserId) {
                console.log("Kyc error:", "External id not enter");
                return res.status(400).json({message: "External id not enter"});
            }

            const status = (answer.review.reviewAnswer == 'RED') ? 2 : (answer.review.reviewAnswer == 'GREEN') ? 1 : 0;
            await User.update({
                kyc_applicant_id: answer.applicantId,
                kyc_status: status,
                kyc_comment: (answer.review.reviewAnswer == 'RED') ? answer.review.moderationComment : ''
            }, {where: {id: answer.externalUserId}});
            console.log('kyc_status:', answer.review.reviewAnswer);
            return res.status(200).json({kyc_status: answer.review.reviewAnswer});
        } catch (e) {
            console.log("Kyc error:", e);
        }
    },

    async cloudCallback(req, res) {
        console.log("cloudCallback", req.body);
        return res.status(200).json({messages: "success"});
    },

    async cloudSuccess(req, res) {
        console.log("cloudSuccess", req.body);
        const userId = req.user.id;
        const amountWithdraw = 10000000000000000;
        await Payment.create({
            user_id: userId,
            tx_hash: req.body.invoiceId || null,
            amount: req.body.amount || 0,
        });

        const wallet = await Wallet.findOne({where: {user_id: userId, wallet_type: null}});
        if (!wallet) {
            console.log("Error! Wallet not found");
            res.status(404).json({messages: "Wallet not found"});
        }
        console.log("user = ", userId, " wallet = ", wallet.address);

        let balance = await Balance.findOne({where: {user_id: userId}});
        if (!balance) {
            balance = await Balance.create({
                currency: "ETH",
                wallet_id: wallet.id,
                wallet_address: wallet.address,
                amount: 0
            });
        }
        let amount = (amountWithdraw != undefined) ? new Decimal(amountWithdraw) : new Decimal(0);
        let balanceAmount = (balance.amount != undefined) ? new Decimal(balance.amount) : new Decimal(0);
        // console.log(amount, ' = ', balanceAmount);
        await balance.update({
            amount: amount.plus(balanceAmount).toNumber()
        });

        try {
            const method = `/tx/send?Currency=eth&Address=${wallet.address}&Amount=${amountWithdraw}"`;
            const response = await axios.post(config.get('anypaycoins.url')+method, {
                headers: {'Authorization': config.get('anypaycoins.key')}
            });
            console.log(response);
            let transactions;
            if (response.data.Code == 'ok') {
                transactions = response.data.Result.Txid;
            }
            console.log("transactions = ", transactions);

            return res.status(200).json({messages: "success", tx: transactions});
        } catch (e) {
            //console.log(e);
            return res.status(400).json({message: e.response.data.Result});
        }


        //return res.status(200).json({messages: "success"});
    },

};
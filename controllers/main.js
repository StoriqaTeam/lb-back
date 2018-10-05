const axios = require('axios');
const config = require('config');
const User = require('../models').User;

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
    }

};
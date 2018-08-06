const axios = require('axios');
const config = require('config');
const Wallet = require('../models').Wallet;

module.exports = {
    generateAddress(currency = 'eth', limit = 1) {
        return axios.get(config.get('anypaycoins.url')+'/addresses/?limit='+limit, {
            headers: {'Authorization': config.get('anypaycoins.key')}
        })
            .then(response => {
                if (response.data.Status == 'ok') {

                }
                return response.data.Result;
            })
            .catch(error => {
                console.log("generateAddressError", error);
            });
    }
};
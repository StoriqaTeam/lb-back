const config = require('config');
const axios = require('axios');


export class Anypaycoins {
    url;
    apikey;

    constructor() {
        this.url = config.get('anypaycoins.url');
        this.apikey = config.get('anypaycoins.key');
    }

    async transactions() {
        const response = await axios.get(config.get('anypaycoins.url')+'/tx/', {
            headers: {'Authorization': config.get('anypaycoins.key')}
        });
        let transactions;
        if (response.data.Status == 'ok') {
            transactions = response.data.Result;
        }
        return transactions;
    }

    async getBTCUSDPrice() {
        const response = await axios.get('https://api.coinmarketcap.com/v2/ticker/1/');
        return response.data.data.quotes.USD.price;
    }

    async getETHUSDPrice() {
        const response = await axios.get('https://api.coinmarketcap.com/v2/ticker/1027/');
        return console.log(response.data.data.quotes.USD.price);
    }
}
const axios = require('axios');

module.exports = {
    async price(req, res) {
        const responseBtc = await axios.get('https://api.coinmarketcap.com/v2/ticker/1/');
        const responseEth = await axios.get('https://api.coinmarketcap.com/v2/ticker/1027/');

        return res.status(200).json({
            'eth': responseEth.data.data.quotes.USD.price,
            'btc': responseBtc.data.data.quotes.USD.price
        });
    }

};
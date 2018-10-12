const config = require('../config/contract');
const baseLottery = require('./BaseLottery');

module.exports = (app) => {

    app.get('/contract', baseLottery.index);
    // function(req, res) {
    //     const bl = new baseLottery();
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(200).json(config);
    // }//
};
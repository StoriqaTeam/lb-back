const axios = require('axios');
const config = require('config');
const Bets = require('../models').bets;

module.exports = {

    async list(req, res) {
        const bets = await Bets.findAll();
        return res.status(200).json(bets);
    },

    async create(req, res) {
        const bet = await Bets.create({
            user_id: req.user.id,
            period: req.body.period,
            amount: req.body.amount,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
        });
        return res.status(200).json(bet);
    }

};
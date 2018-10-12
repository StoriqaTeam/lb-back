const config = require('../config/contract');
const Web3 = require('web3');
//
module.exports = {
    async index(req, res) {
        const client = new Web3();
        //client.setProvider(new Web3.providers.WebsocketProvider(config.provider.wss));
         client.setProvider(new Web3.providers.HttpProvider(config.provider.url));

        // const kyc = new client.eth.Contract(config.abi.kyc, config.contract.kyc);
        // const rng = new client.eth.Contract(config.abi.rng, config.contract.rng);
        // const mainlottery = new client.eth.Contract(config.abi.mainlottery, config.contract.mainlottery);
        const daily = new client.eth.Contract(config.abi.daily, config.contract.daily);
        // const weekly = new client.eth.Contract(config.abi.weekly, config.contract.weekly);
        // const monthly = new client.eth.Contract(config.abi.monthly, config.contract.monthly);
        // const yearly = new client.eth.Contract(config.abi.yearly, config.contract.yearly);
        // const jackpotchecker = new client.eth.Contract(config.abi.jackpotchecker, config.contract.jackpotchecker);
        // const jackpot = new client.eth.Contract(config.abi.jackpot, config.contract.jackpot);


        const participants = await daily.getPastEvents('ParticipantAdded', {
            filter: {},
            fromBlock: 9005011,
            toBlock: 'latest'
        }, function(error, events){
            console.log(events);
        });

        /*const participants = await daily.events.ParticipantAdded({
            filter: {},
            fromBlock: 9005011,
            toBlock: 'latest'
        }, function(error, events){
            console.log(error);
        });//*/

        // const participants = await daily.events.allEvents({
        //     fromBlock: 9005011,
        //     toBlock: 'latest'
        // }, (err, event) => {
        //     console.log(err, event)
        // });//*/

        //const dc = daily.at(config.contract.daily);
        //console.log(participants);
         return res.status(200).json(participants);
    }
};
import {logger} from "../logger";
import {DepositWatcher} from "./watcher/DepositWatcher";
import {Anypaycoins} from "./Client/Anypaycoins";
// import {Currency} from "../models/currencies";
// const Currency = require('../models').currencies;
// import {CryptoClientFactory} from "./Client/CryptoClientFactory";


// const DepositWatcher = require('./watcher/DepositWatcher');

async function init(short) {
    // const currency = await Currency.findOne({where: {short: "ETH"}});//findByName("ETH");//
    // const client = await CryptoClientFactory.create(currency);
    // if (!client || !client.available) return null;
    const client = new Anypaycoins();
    // const client = new EthCryptoClient(currency);

    const service = new DepositWatcher(client);
    service.start();

    return service;
}

init()
    .then(service => !!service || process.exit(0))
    .catch(e => logger.error(e));

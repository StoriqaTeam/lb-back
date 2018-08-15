import {Watcher} from "./Watcher";
import {logger} from "../../logger";
import {Wallet, Transaction, Balance} from "../../models";
import {Decimal} from 'decimal.js';
const _ = require('lodash');

// import {MINUTE} from "../date-utils";
// import {DepositUtils} from "./utils/DepositUtils";
// 'use strict';
// const Watcher = require('./Watcher');
// const logger = require('../../logger');
// const {Wallet, Transaction, Balance} = require('../../models');

export class DepositWatcher extends Watcher {

    client;
    depositUtils;
    logger;

    constructor(client) {
        super();
        this.client = client;
    }

    getName() {
        return `${super.getName()}`;
    }

    async run() {
        const transactions = await this.client.transactions();
        // const wallet = await Wallet.findOne({where: {id: 2}});
        // wallet.address = '0x8eb1443403038c591fc0d0eb5c307914cef17240';
        // wallet.save();
        // console.log(transactions);
        if (transactions) this.processTransactions(transactions);
    }

    async processTransactions(transactions) {

        for (const transaction of transactions) {
            let wallet = await Wallet.findOne({where: {address: transaction.Address}});
            // console.log('add',transaction.Address);
            // console.log('wall',wallet);
            if (!wallet) {
                wallet = {id:0};
            }
                // const balance = new Decimal(wallet.balance?wallet.balance:0);
                // console.log("w+", balance.plus(new Decimal(transaction.Amount)).toNumber());

            const currentTransactions = await Transaction.findOne({
                where: {tx_hash: transaction.Txid}
            });

            //console.log("current", currentTransactions);
            if (!currentTransactions) {
                if (transaction.Status == 'done' && transaction.Confirmations > 12 && wallet.id > 0) {
                    this.logger.info(`Deposit balance update #${wallet.address}`);
                    const balance = new Decimal(wallet.balance?wallet.balance:0);
                    wallet.balance = balance.plus(new Decimal(transaction.Amount)).toNumber();
                    wallet.is_confirmed = true;
                    wallet.save();
                }
                await Transaction.create({
                    wallet_id: wallet.id,
                    tx_hash: transaction.Txid,
                    sender: transaction.FromAddress,
                    amount: transaction.Amount,
                    confirmations: transaction.Confirmations,
                    price_usd: this.client.getETHUSDPrice()
                });
            } else {
                await currentTransactions.update({
                    wallet_id: wallet.id,
                    tx_hash: transaction.Txid,
                    sender: transaction.FromAddress,
                    amount: transaction.Amount,
                    confirmations: transaction.Confirmations
                });
            }
            // console.log(newTransaction);

        }
    }

}

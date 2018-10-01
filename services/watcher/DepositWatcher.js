import {Watcher} from "./Watcher";
import {Wallet, Transaction, Balance, BalanceChange} from "../../models";
import {Decimal} from 'decimal.js';
import {Op} from "sequelize";

const _ = require('lodash');

export class DepositWatcher extends Watcher {

    client;
    // depositUtils;
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
        if (transactions) this.processTransactions(transactions);
    }

    async processTransactions(transactions) {

        for (const transaction of transactions) {
            let wallet = await Wallet.findOne({where: {address: transaction.Address}});

            if (!wallet) wallet = {id: 0};

            const currentTransactions = await Transaction.findOne({
                where: {
                    tx_hash: transaction.Txid,
                    confirmations: {[Op.lt]: 20}
                },
            });

            if (!currentTransactions) {
                if (transaction.Status == 'done' && transaction.Confirmations > 12 && wallet.id > 0) {
                    await this.balanceUpdate(transaction, wallet);
                }
                await Transaction.create({
                    wallet_id: wallet.id,
                    tx_hash: transaction.Txid,
                    sender: transaction.FromAddress,
                    amount: transaction.Amount,
                    confirmations: transaction.Confirmations,
                    price_usd: this.client.getETHUSDPrice()
                });
                this.logger.info(`Transaction create amount: ${transaction.Amount}, confirmations: ${transaction.Confirmations}`);
            } else {
                await currentTransactions.update({
                    confirmations: transaction.Confirmations
                });
                this.logger.info(`Transaction #${currentTransactions.id} update confirmations: ${transaction.Confirmations}`);
            }
            // console.log(newTransaction);

        }
    }

    async balanceUpdate(transaction, wallet) {

        const balance = await Balance.findOne({where: {user_id: wallet.user_id}});
        const currentBalance = new Decimal(balance.amount ? balance.amount : 0);
        const newBalance = currentBalance.plus(new Decimal(transaction.Amount)).toNumber();

        if (!balance) {
            Balance.create({
                user_id: user_id,
                currency: transaction.Currency,
                wallet_id: wallet.id,
                wallet_address: wallet.address,
                amount: newBalance
            });
        } else {
            balance.update({
                amount: newBalance
            });
        }

        this.logger.info(`Deposit balance update ${currentBalance} to ${newBalance} #${balance.address}`);
    }

}

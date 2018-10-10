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
        let delimetr = Math.pow(10, 18);
        // console.log(transactions);
        for (const transaction of transactions) {
            //if (transaction.Type !== "receive") continue; //send
            //console.log(transaction);
            // console.log(transaction.Address, " ", transaction.Amount/Math.pow(10,18));
            // continue;
            let wallet = await Wallet.findOne({where: {address: transaction.Address}});

            if (!wallet) continue;

            const currentTransactions = await Transaction.findOne({
                where: {
                    tx_hash: transaction.Txid
                },
            });//confirmations: {[Op.lt]: 20}
            // console.log(currentTransactions);

            if (!currentTransactions) {
                if (transaction.Status == 'done' && transaction.Confirmations > 12 && wallet.id > 0) {
                    //await this.balanceUpdate(transaction, wallet, transaction.Type);
                }
                await Transaction.create({
                    wallet_id: wallet.id,
                    tx_hash: transaction.Txid,
                    sender: transaction.FromAddress,
                    amount: transaction.Amount,
                    confirmations: transaction.Confirmations,
                    price_usd: this.client.getETHUSDPrice()
                });
                this.logger.info(`Transaction create amount: ${transaction.Amount / delimetr}, hash: ${transaction.Txid} (${transaction.Type}), confirmations: ${transaction.Confirmations}`);

                await this.balanceUpdate(transaction, wallet, transaction.Type);
            } else {
                if (currentTransactions.confirmations !== transaction.Confirmations) {
                    await currentTransactions.update({
                        id: transaction.id,
                        confirmations: transaction.Confirmations
                    });
                    this.logger.info(`Transaction #${currentTransactions.id} update confirmations: ${transaction.Confirmations}`);
                }
            }
            // console.log(newTransaction);

        }
    }

    async balanceUpdate(transaction, wallet, type) {
        try {
            let delimetr = Math.pow(10, 18);
            const balance = await Balance.findOne({
                where: {
                    user_id: wallet.user_id,
                    wallet_id: wallet.id
                }
            });
            let currentBalance = 0;
            let newBalance = 0;

            if (!balance) {
                currentBalance = new Decimal(0);
                newBalance = (new Decimal(transaction.Amount)).toNumber();
                await Balance.create({
                    user_id: wallet.user_id,
                    currency: transaction.Currency,
                    wallet_id: wallet.id,
                    wallet_address: wallet.address,
                    amount: newBalance,
                    transaction_id: transaction.id
                });
                this.logger.info(`Deposit balance new ${currentBalance.toNumber() / delimetr} to ${newBalance / delimetr} #${wallet.address}`);
            } else {
                currentBalance = new Decimal(balance.amount ? balance.amount : 0);
                newBalance = currentBalance.plus(new Decimal(transaction.Amount)).toNumber();
                /*switch (type) {
                    case 'receive':
                        newBalance = currentBalance.plus(new Decimal(transaction.Amount)).toNumber();
                        break;
                    case 'send':
                        newBalance = currentBalance.minus(new Decimal(transaction.Amount)).toNumber();
                        break;
                    default:
                        newBalance = currentBalance.toNumber();
                }//*/

                await balance.update({
                    amount: newBalance
                });
                this.logger.info(`Deposit balance update ${currentBalance.toNumber() / delimetr} to ${newBalance / delimetr} #${wallet.address}`);
            }


        } catch (e) {
            console.log(e);
            this.logger.error(`Error ${e}`);
        }
    }

}

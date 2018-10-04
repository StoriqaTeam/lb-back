import Web3 from "web3";
import Tx from "ethereumjs-tx";
import {Decimal} from "../decimal";
import {CryptoClient} from "./CryptoClient";
import {Address, Deposit} from "../../models";
import {CurrencyPrivateKey} from "../../models/currency-private-key";
import db from "../../db";

export class EthCryptoClient extends CryptoClient {

    static supports(currency) {
        return ["ETH", "ETC"].includes(currency.short);
    }

    async getHeight() {
        return await this.client.eth.getBlockNumber();
    }

    createClient() {
        const {host, port} = this.currency;
        if (!host || !port) return;

        const url = `http://${host}:${port}`;
        this.client = new Web3();
        this.client.setProvider(new Web3.providers.HttpProvider(url));
    }

    get gasPrice() {
        if (!this.available) return null;
        return this._gasPrice || '20000000000';
    }

    set gasPrice(val) {
        this._gasPrice = val;
    }

    async checkDeposit(deposit) {
        const transaction = await this.client.eth.getTransaction(deposit.hash);

        return transaction.blockHash === deposit.blockHash;
    }

    async getBlockAddresses(transactions) {
        const publicKeys = transactions.map(tx => {
            if (tx.to) return tx.to.toLowerCase()
        });
        return await Address.findAll({where: {publicKey: publicKeys, currencyId: this.currency.id}});
    }

    async checkBlock(height) {
        const block = await this.client.eth.getBlock(height, true);

        if (!block) {
            this.logger.warn(`Unable to process ${this.currency.short} block ${height}: block not found.`);
            return [];
        }
        this.gasPrice = await this.client.eth.getGasPrice()

        this.logger.info(`Processing ${this.currency.short} block ${height} / ${block.hash} / ${block.transactions.length} tx(s)`);

        const addresses = await this.getBlockAddresses(block.transactions);
        const deposits = [];

        for (const tx of block.transactions) {
            const address = addresses.find(address => !!tx.to && address.publicKey === tx.to.toLowerCase());
            if (!address) continue;

            deposits.push(await this.checkTransaction(tx, address));
        }

        await this.currency.update({height}, {fields: ["height"]});
        this.logger.info(`Transactions ${this.currency.short} block ${height} updated`);

        return deposits;
    }

    async checkTransaction(tx, address) {
        this.logger.info(`Processing ${this.currency.short} tx ${tx.hash}`);

        let deposit = await Deposit.findOne({where: {hash: tx.hash, address: address.publicKey}});

        if (deposit) {
            await deposit.update({blockHash: tx.blockHash, blockNum: tx.blockNumber, confirmations: 1});
            return;
        }

        const amount = new Decimal(this.client.utils.fromWei(tx.value, "ether")).toNumber();
        deposit = await Deposit.create({
            userId: address.userId,
            currencyId: address.currencyId,
            addressId: address.id,
            address: address.publicKey,
            hash: tx.hash,
            blockHash: tx.blockHash,
            blockNum: tx.blockNumber,
            amount
        });

        this.logger.info(`Deposit ${amount} ${this.currency.short} to ${address.publicKey}`);

        return [deposit];
    }

    /**
     * Перевод ETH на горячий кошелек
     * Комиссия эфириума на транзакцию берется из суммы перевода
     */
    async moveCoins(address) {
        this.logger.info(`Try to move ${address.received} ${this.currency.short} from ${address.publicKey} to hot wallet`);
        const tx = await this.sendCoins(address.publicKey, address.privateKey, address.received, this.currency.hotAddress, true);
        this.logger.info(`Moved ${address.received} ${this.currency.short} from ${address.publicKey} to hot wallet: ${tx.transactionHash}`);

        this.currency.update({hotAddressApproxBalance: db.literal(`"hotAddressApproxBalance" + ${address.received}`)});

        return tx.transactionHash;
    }

    /**
     * Если передан networkFeeIncluded, расходы на транзакцию в сети, будут взяты из суммы транзакции
     * В противном случае, расходы на транзакцию будут взять с остатка на кошельке
     */
    async sendCoins(publicKey, privateKey, amount, destination, networkFeeIncluded = true) {
        const gasPrice = new Decimal(this.gasPrice);
        const gasLimit = "0x5208"; // 21000
        const nonce = await this.client.eth.getTransactionCount(publicKey);
        const weiAmount = this.client.utils.toWei("" + amount, "ether")
        let sendAmount = new Decimal(weiAmount);

        if (networkFeeIncluded) {
            const fee = gasPrice.mul(gasLimit);
            sendAmount = sendAmount.minus(fee);
        }

        const tx = new Tx({
            gasLimit,
            to: destination,
            nonce: "0x" + nonce.toString(16),
            gasPrice: gasPrice.toHex(),
            value: sendAmount.toHex()
        });

        tx.sign(Buffer.from(privateKey, "hex"));

        const serialized = "0x" + tx.serialize().toString("hex");
        return this.client.eth.sendSignedTransaction(serialized)
    }

    /**
     * Вывод ETH
     * Комиссия эфириума на транзакцию добавляется к сумме перевода
     */
    async withdrawCoins(userId, amount, destination) {
        const {hotAddress} = this.currency;
        const {key: hotSecret} = await CurrencyPrivateKey.forCurrency(this.currency.id);
        const sendAmount = new Decimal(amount).minus(this.currency.withdrawalFee).toNumber();

        this.logger.info(`Try to withdraw ${amount} ${this.currency.short} from ${hotAddress} to ${destination}`);
        const hash = await this.sendCoins(hotAddress, hotSecret, sendAmount, destination, false);
        this.logger.info(`Withdraw ${amount} ${this.currency.short} from ${hotAddress} to ${destination}: ${hash}`);

        this.currency.update({hotAddressApproxBalance: db.literal(`"hotAddressApproxBalance" - ${sendAmount}`)});

        return hash;
    }

}

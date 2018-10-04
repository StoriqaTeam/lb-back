import {Op} from "sequelize";
import {Decimal} from "../decimal";
import db from "../../db";
import {Address, Deposit} from "../../models";
import {CurrencyPrivateKey} from "../../models/currency-private-key";
import {logger} from "../../logging";
import {AddressGenerator} from "../address-generator";

export class CryptoClient {

    currency;
    logger;
    height;
    client;

    get interval() {
        return (process.env.NODE_ENV === "production" ? 60 : 5) * 1000;
    }

    constructor(currency) {
        this.currency = currency;
        this.height = currency.height || 0;
        this.logger = logger.child({'currency_id': currency.id});
    }

    get available() {
        return !!this.client;
    }

    get networkFee() {
        return new Decimal(this.currency.withdrawalFee).div(2.5).toNumber();
    }

    async generateHotWallet() {
        const {publicKey, privateKey} = await AddressGenerator.generate(this.currency);
        const currencyPrivateKey = await CurrencyPrivateKey.forCurrency(this.currency.id);

        await this.currency.update({hotAddress: publicKey});
        await currencyPrivateKey.update({key: privateKey});
    }

    flatArray(arr) {
        if (arr && arr instanceof Array) {
            return arr
                .filter(list => list && list instanceof Array)
                .reduce((flat, list) => {
                    flat.push(...list.filter(item => !!item));
                    return flat;
                }, []);
        }

        return [];
    }

    async update() {
        let confirmed = [];
        let moved = [];
        let created = [];

        if (!this.available) return [confirmed, moved, created];

        try {
            const height = await this.getHeight();

            if (!height || height <= this.height) return [confirmed, moved, created];
            if (this.height === 0) this.height = height - 1;

            this.logger.info(`${this.currency.short} old height: ${this.height}, new height: ${height}`);

            confirmed = await this.updateConfirmations(height - this.height) || [];
            moved.push(...this.flatArray(await this.moveDeposits()));

            while (this.height < height) {
                created.push(...this.flatArray(await this.checkBlock(++this.height)));
            }

        } catch (error) {
            this.logger.warnOrError(error, `Unable to update block data for ${this.currency.short}`);
        }

        return [confirmed, moved, created];
    }

    async updateConfirmations(diff) {
        await Deposit.update({confirmations: db.literal(`confirmations + ${diff}`)}, {where: {
            currencyId: this.currency.id,
            confirmed: false,
            confirmations: {[Op.lte]: this.currency.numConf}
        }});

        const depositsForCheck = await Deposit.findAll({where: {
            currencyId: this.currency.id,
            confirmed: false,
            confirmations: {[Op.gte]: this.currency.numConf}
        }});

        for (const deposit of depositsForCheck) {
            if (!await this.checkDeposit(deposit)) {
                this.logger.warn(`Deposit with hash ${deposit.hash} not found in block ${deposit.blockHash}`);
                await deposit.destroy();
            }
        }

        const [count, deposits] = await Deposit.update({confirmed: true}, {returning: true, where: {
            currencyId: this.currency.id,
            confirmed: false,
            confirmations: {[Op.gte]: this.currency.numConf}
        }});

        if (!deposits.length) return [];

        this.logger.info(`${this.currency.short}: ${deposits.length} deposit(s) became mature`);

        for (const deposit of deposits) await deposit.mature();

        return deposits;
    }

    async moveDeposits() {
        const addresses = await Address.findAll({where: {
            currencyId: this.currency.id,
            received: {[Op.gte]: this.currency.minimalAmount}
        }});

        const moved = [];

        for (const address of addresses) {
            moved.push(await this.moveDeposit(address));
        }

        return moved;
    }

    async moveDeposit(address) {
        await this.moveCoins(address);
        await address.update({received: 0});
        const [count, deposits] = await Deposit.update({moved: true}, {returning: true, where: {
            addressId: address.id,
            confirmed: true,
            moved: false
        }});

        return deposits;
    }

    static supports(currency) {
        throw new Error(`Method not implemented: ${this.supports.name}`);
    }

    createClient() {
        throw new Error(`Method not implemented: ${this.createClient.name}`);
    }

    async getHeight() {
        throw new Error(`Method not implemented: ${this.getHeight.name}`);
    }

    async checkDeposit(deposit) {
        throw new Error(`Method not implemented: ${this.checkDeposit.name}`);
    }

    async checkBlock(height) {
        throw new Error(`Method not implemented: ${this.checkBlock.name}`);
    }

    async moveCoins(address) {
        throw new Error(`Method not implemented: ${this.moveCoins.name}`);
    }

    async withdrawCoins(userId, amount, destination) {
        throw new Error(`Method not implemented: ${this.withdrawCoins.name}`);
    }

}

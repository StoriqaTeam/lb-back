import {EthCryptoClient} from "./EthCryptoClient";

const REGISTERED_CLIENTS = [
    EthCryptoClient
];

const AVAILABLE_CLIENTS = {};

export class CryptoClientFactory {

    static async create(currency) {
        for (const client of REGISTERED_CLIENTS) {
            if (client.supports(currency)) {
                const instance = new client(currency);
                await instance.createClient();

                if (instance.available && !currency.hotAddress) await instance.generateHotWallet();

                AVAILABLE_CLIENTS[currency.id] = instance;
                return instance;
            }
        }

        return null;
    }

    static getForCurrency(currencyId) {
        return AVAILABLE_CLIENTS[currencyId] || null;
    }

}

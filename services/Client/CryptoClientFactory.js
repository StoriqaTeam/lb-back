import {BchCryptoClient} from "./BchCryptoClient";
import {BioCryptoClient} from "./BioCryptoClient";
import {BtcCryptoClient} from "./BtcCryptoClient";
import {EthCryptoClient} from "./EthCryptoClient";
import {ColorsibCryptoClient} from "./ColorsibCryptoClient";
import {PigCryptoClient} from "./PigCryptoClient";
import {DgdCryptoClient} from "./DgdCryptoClient";
import {PptCryptoClient} from "./PptCryptoClient";
import {BnbCryptoClient} from "./BnbCryptoClient";
import {OmgCryptoClient} from "./OmgCryptoClient";
import {VenCryptoClient} from "./VenCryptoClient";
import {CappCryptoClient} from "./CappCryptoClient";
import {QiwiCryptoClient} from "./QiwiCryptoClient";
import {UsdtCryptoClient} from "./UsdtCryptoClient";
import {XrpCryptoClient} from "./XrpCryptoClient";
import {NeoCryptoClient} from "./NeoCryptoClient";
import {SibCryptoClient} from "./SibCryptoClient";

const REGISTERED_CLIENTS = [
    BchCryptoClient, BioCryptoClient, BtcCryptoClient,
    EthCryptoClient, CappCryptoClient, UsdtCryptoClient,
    QiwiCryptoClient,
    XrpCryptoClient,
	VenCryptoClient,
    XrpCryptoClient,
    NeoCryptoClient,
    XrpCryptoClient,
	OmgCryptoClient,
	BnbCryptoClient,
	PptCryptoClient,
	DgdCryptoClient,
    SibCryptoClient,
	PigCryptoClient,
	ColorsibCryptoClient
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

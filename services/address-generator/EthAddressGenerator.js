import keythereum from "keythereum";

export class EthAddressGenerator {

    static supports(currency) {
        return ["ETH"].includes(currency.short);
    }

    static generate(currency) {
        const key = keythereum.create();

        return {
            publicKey: `0x${keythereum.dump("", key.privateKey, key.salt, key.iv).address}`,
            privateKey: key.privateKey.toString("hex")
        };
    }

}

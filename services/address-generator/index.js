import {EthAddressGenerator} from "./EthAddressGenerator";

const GENERATORS = [
    EthAddressGenerator,
];

export class AddressGenerator {

    static async generate(currency) {
        for (const generator of GENERATORS) {
            if (generator.supports(currency)) return await generator.generate(currency);
        }
        //return BaseAddressGenerator.generate(currency);
    }

}

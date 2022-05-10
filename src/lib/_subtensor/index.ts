import { ApiPromise, WsProvider } from '@polkadot/api';


interface Subtensor {
    network: string;
    chain_endpoint: string;
}

class Subtensor {
    constructor(
        network: string = 'nakamoto',
        chain_endpoint: string = 'AtreusLB-2c6154f73e6429a9.elb.us-east-2.amazonaws.com:9944',

    ) {
        this.network = network;
        this.chain_endpoint = chain_endpoint;
    }

    _types() {
        const types =  {
            Balance: {
                value: "u64"
            },
            NeuronMetadataOf: {
                version: 'u32',
                ip: "u128", 
                port: "u16", 
                ip_type: "u8", 
                uid: "u32", 
                modality: "u8", 
                hotkey: "AccountId", 
                coldkey: "AccountId", 
                active: "u32",
                last_update: "u64",
                priority: "u64",
                stake: "u64",
                rank: "u64",
                trust: "u64",
                consensus: "u64",
                incentive: "u64",
                dividends: "u64",
                emission: "u64",
                bonds: "Vec<(u32, u64)>",
                weights: "Vec<(u32, u32)>"
            }
        }
        return types;
    }

    async create_api() {
        const provider = new WsProvider(`ws://${this.chain_endpoint}`);

        const api = await ApiPromise.create({
            provider,
            types: this._types(),
        });

        return api;

    }


}


export default Subtensor;
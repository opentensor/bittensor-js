import { ApiPromise } from '@polkadot/api';
interface Subtensor {
    network: string;
    chain_endpoint: string;
}
declare class Subtensor {
    constructor(network?: string, chain_endpoint?: string);
    _types(): {
        Balance: {
            value: string;
        };
        NeuronMetadataOf: {
            version: string;
            ip: string;
            port: string;
            ip_type: string;
            uid: string;
            modality: string;
            hotkey: string;
            coldkey: string;
            active: string;
            last_update: string;
            priority: string;
            stake: string;
            rank: string;
            trust: string;
            consensus: string;
            incentive: string;
            dividends: string;
            emission: string;
            bonds: string;
            weights: string;
        };
    };
    create_api(): Promise<ApiPromise>;
}
export default Subtensor;

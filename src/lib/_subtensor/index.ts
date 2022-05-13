
// const { machine_types } = require('./index.config');
// const {subtensor_custom_types, subtensor_custom_types_priority} = require('../../types/subtensor');
const { ApiPromise, WsProvider } = require('@polkadot/api');

const RAOPERTAO = 1000000000;

/// subtensor custom types
const subtensor_custom_types = {
    Balance: "u64",
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
};
/// subtensor custom type with priority - nobunaga
const subtensor_custom_types_priority = {
    Balance: "u64",
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
};

const substrate_types = {
    SUBSTRATE_HOST_AKATSUKI: "archivelb.nakamoto.opentensor.ai:9944",
    SUBSTRATE_HOST_NOBUNAGA: "archivelb.nakamoto.opentensor.ai:9944",
    SUBSTRATE_HOST_NAKAMOTO: "archivelb.nakamoto.opentensor.ai:9944",
}

// interface Subtensor {
//         network: string;
//         chain_endpoint: string;
//         wsProvider: any;
//         api: any;
//         dismissNewBlock: any;
//         dataType: string;
//         inProgress: boolean;
// }

/**
 * Handles interactions with the subtensor chain.
 * Referenced from https://github.com/opentensor/bittensor
 */
class Subtensor {

    /**
     * Constructor
     * @param {*} network - not yet confirmed
     * @param {*} chain_endpoint - Substrate chain endpoint
     * @param {*} wsProvider - Substrate websocket provider
     * @param {*} api - Substrate api
     * @param {*} dismissNewBlock - callback to dismiss new block event
     * @param {*} dataType - custom data type
     * @param {*} inProgress - in progress flag
     */
    constructor(network="", chain_endpoint ="") {
        this.network = network;
        this.chain_endpoint = this.getEndpoint(chain_endpoint);
        this.wsProvider = null;
        this.api = null;
        this.dismissNewBlock = null;
        this.dataType = this.getDataType(chain_endpoint);
        this.inProgress = false;
    }


    async create() {
        this.wsProvider = new WsProvider(this.chain_endpoint);
        this.api = await ApiPromise.create({ 
            provider: this.wsProvider,
            types: this.dataType
          });

    }
    
    /**
     * retrieve full host endpoint from keyword
     * @param {*} endpoint 
     * @returns 
     */
    getEndpoint(endpoint) {
        if (endpoint === "" || endpoint === "akatsuki" ){
            return 'ws://' + substrate_types.SUBSTRATE_HOST_AKATSUKI;
        }
        else if ( endpoint === "nobunaga" ) {
            return 'ws://' + substrate_types.SUBSTRATE_HOST_NOBUNAGA;
        }
        else if ( endpoint === 'nakamoto' ) {
            return 'ws://' + substrate_types.SUBSTRATE_HOST_NAKAMOTO;
        }
        return 'ws://' + substrate_types.SUBSTRATE_HOST_AKATSUKI;
    }

    /**
     * retrieve custom datattype from keyword
     * @param {*} endpoint 
     * @returns 
     */
    getDataType(endpoint) {
        if(endpoint === "nobunaga") {
            return subtensor_custom_types_priority;
        }else if ( endpoint === 'nakamoto'){
            return subtensor_custom_types_priority;
        }
        return subtensor_custom_types;
    }


    /**
     * retrieve coldkey balance from substrate chain
     * @param {*} coldkey - string - coldkey address
     * @returns balance - number - balance
     * 
     * @example
     * const balance = await Subtensor.getColdkeyBalance('0x...');
     * console.log(balance);
     * // => 1000000000000
    **/

    async getColdkeyBalance(coldkey) {
        const system = await this.api.query.system.account(coldkey)
        const balance = system.data.free/RAOPERTAO;
        // console.log(this.api)
        return balance;
    }

    /**
     * retrieve rho parameter from substrate chain
     * @returns rho - int - Incentive mechanism rho parameter.
     * 
     **/
    async rho () {

        const rho = await this.api.query.subtensorModule.rho();

        const value = rho.toHuman()
        return value;
    }

    async kappa () {
        const kappa = await this.api.query.subtensorModule.kappa();

        const value = kappa.toHuman()
        return value;
    }

    async difficulty () {
        const difficulty = await this.api.query.subtensorModule.difficulty();

        const value = difficulty.toHuman()
        return value;
    }

    async total_issuance () {
        const totalIssuance = await this.api.query.subtensorModule.totalIssuance();

        const value = totalIssuance.toHuman()
        return value;
    }

    async immunity_period () {
        const immunityPeriod = await this.api.query.subtensorModule.immunityPeriod();

        const value = immunityPeriod.toHuman()
        return value;
    }

    async validator_batch_size () {
        const validatorBatchSize = await this.api.query.subtensorModule.validatorBatchSize();

        const value = validatorBatchSize.toHuman()
        return value;
    }

    async validator_sequence_length () {
        const validatorSequenceLength = await this.api.query.subtensorModule.validatorSequenceLength();

        const value = validatorSequenceLength.toHuman()
        return value;
    }

    async validator_epochs_per_reset () {
        const validatorEpochsPerReset = await this.api.query.subtensorModule.validatorEpochsPerReset();

        const value = validatorEpochsPerReset.toHuman()
        return value;
    }

    async validator_epoch_length () {
        const validatorEpochLength = await this.api.query.subtensorModule.validatorEpochLength();

        const value = validatorEpochLength.toHuman()
        return value;
    }

    async total_stake () {
        const totalStake = await this.api.query.subtensorModule.totalStake();

        const value = totalStake.toHuman()
        return value;
    }

    async min_allowed_weights () {
        const minAllowedWeights = await this.api.query.subtensorModule.minAllowedWeights();

        const value = minAllowedWeights.toHuman()
        return value;
    }

    async max_allowed_min_max_ratio () {
        const maxAllowedMinMaxRatio = await this.api.query.subtensorModule.maxAllowedMinMaxRatio();

        const value = maxAllowedMinMaxRatio.toHuman()
        return value;
    }








 
}



module.exports = { Subtensor };
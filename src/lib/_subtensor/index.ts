
const { machine_types } = require('./index.config');

const { ApiPromise, WsProvider } = require('@polkadot/api');
const {subtensor_custom_types, subtensor_custom_types_priority} = require('./types/subtensor');




/**
 * Handles interactions with the subtensor chain.
 * Referenced from https://github.com/opentensor/bittensor
 */
class Subtensor {
    /** 
     * Subtensor Type Definitions
     * @param {*} network - nakamoto, nobunaga, akatsuki
     * @param {*} chain_endpoint - substrate chain endpoint
     * @param {*} wsProvider - substrate chain provider
     * @param {*} api - substrate chain api
     * @param {*} dismissNewBlock - callback to dismiss new block event
     * @param {*} dataType - custom datatype
     * @param {*} inProgress - boolean to check if request is in progress
     */
    network: string;
    chain_endpoint: string;
    wsProvider: any;
    api: any;
    dismissNewBlock: any;
    dataType: string;
    inProgress: boolean;

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
    constructor(network="", chain_endpoint =""){
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
            return machine_types.SUBSTRATE_HOST_AKATSUKI;
        }
        else if ( endpoint === "nobunaga" ) {
            return machine_types.SUBSTRATE_HOST_NOBUNAGA;
        }
        else if ( endpoint === 'nakamoto' ) {
            return machine_types.SUBSTRATE_HOST_NAKAMOTO;
        }
        return machine_types.SUBSTRATE_HOST_AKATSUKI;
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
     * Retrun the latest block number of the chain
     * @returns 
     */
    async get_current_block() {
        const blockNumber = await this.api.rpc.chain.getHeader();
        return parseInt(blockNumber.number.toString());
    }

    /**
     * Returns the number of neurons on the chain at block
     * @param blockhash block hash - currently reserved value 
     * @returns number of neurons subscribed to the chain
     */
     async gen_n(blockHash?: string): Promise<number> {
        if(blockHash){
            var n = await this.api.query.subtensorModule.n.at(blockHash);
            return parseInt(n.toString());
        }
        var n = await this.api.query.subtensorModule.n();
        return parseInt(n.toString());
    }

    paginate<T>(arr: T[], size: number): T[][] {
        return arr.reduce((acc, val, i) => {
            let idx = Math.floor(i / size)
            let page = acc[idx] || (acc[idx] = [])
            page.push(val)
        
            return acc
        }, [])
    }

    paginateAtBlock<T>(arr: T[], size: number, block: (val: T, i: number) => void): T[][] {
        return arr.reduce((acc, val, i) => {
            let idx = Math.floor(i / size)
            let page = acc[idx] || (acc[idx] = [])
            page.push(val)
            block(val, i);
        
            return acc;
        }, [])
    }
    /**
     * Returns list of neuron from the chain
     * @param {*} n_total total number of neurons in the chain
     * @returns total neuron objects
     */
    async neurons(n_total, page_size = 100) {
        var uids = Array.from({length: n_total}, (_, i) => i);
        var metadata = [];
        const pages = this.paginate(uids, page_size);
        for(var i = 0; i < 1; i++){
           const ret = await this.api.query.subtensorModule.neurons.multi(pages[i]);
           metadata = [...metadata, ...ret];
        };
        return metadata;
    }

    /**
     * Retrieve Neuron Status of given uid
     * @param {*} uid 
     * @return neuron state
     */
    async neuron(uid, block) {
        if (block) {
            const blockHash = await this.getBlockHash(block);
            const nueron_data = await this.api.query.subtensorModule.neurons.at(blockHash, uid);
            return nueron_data;

        }
        const neuron_data = await this.api.query.subtensorModule.neurons(uid);
        return neuron_data;
    }

    /**
     *  get Neuron Metadata by pagination
     * @param {*} n_total 
     * @param {*} callback 
     * @param {*} pageCallback 
     * @param {*} page_size 
     */
    async getNeurons(n_total, blockHash, pageCallback, onComplete, page_size= 50) {
        var uids = Array.from({length: n_total}, (_, i) => i);
        const pages = this.paginate(uids, page_size);
       
        var cur_page = 0;
        this._getNeurons(pages, cur_page, blockHash, pageCallback, onComplete);
    }

    /**
     * get Neuron by pagination
     * 
     * @param {*} pages 
     * @param {*} cur_page 
     * @param {*} callback 
     * @param {*} pageCallback 
     */
    async _getNeurons(pages, cur_page, blockHash, pageCallback, onComplete) {
        const apiAt = await this.api.at(blockHash);
        const page_param = [];
        
        pages[cur_page].map((val)=>{
            page_param.push([apiAt.query.subtensorModule.neurons, val]);
        });

        const page = await apiAt.queryMulti(page_param);
         
        await pageCallback(page);
        cur_page++;

        if (cur_page >= pages.length) {
            onComplete();
        }else {
            // loop next page
            setTimeout(()=>{
                this._getNeurons(pages, cur_page, blockHash, pageCallback, onComplete);
            }, 100);
        }
    }
    
    /**
     * Returns blockhash on the block number
     * @param {*} block  - request block number
     * @returns 
     */
    async getBlockHash(block) {
        return await this.api.rpc.chain.getBlockHash(block);
    }

    /**
     * Returns latest block info
     * @returns latest chain block
     */
    async getLastBlock() {
        return await this.api.rpc.chain.getHeader();
    }

    /**
     * Reutrns neuron object from the chain
     * @param {*} uid the uid of the neuron to query for
     * @returns neuron object associated with ui
     */
    async neurons_by_uid(uid) {
        var neuron = await this.api.query.subtensorModule.neurons(uid);
        return neuron;
    }
    
    /**
     * Register callback for new block update
     * @param {*} callback callback for new block update
     */
    async registerNewBlockCallback(callback) {
        return await this.api.rpc.chain.subscribeNewHeads((header) => {
            callback(header);
        });
    }
}



module.exports = Subtensor;
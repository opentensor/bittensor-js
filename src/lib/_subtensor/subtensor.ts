import { ApiPromise, WsProvider } from '@polkadot/api';


interface Subtensor {
    network: string;
}

class Subtensor {
    constructor(
        network: string = 'nakamoto',
    ) {
        this.network = network;
    }

}

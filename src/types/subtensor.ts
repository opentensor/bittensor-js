export interface Subtensor {
    network: string;
    chain_endpoint: string;
    wsProvider: any;
    api: any;
    dismissNewBlock: any;
    dataType: string;
    inProgress: boolean;
}

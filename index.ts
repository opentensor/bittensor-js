// import {Subtensor} from 'src/lib/_subtensor/index'

const { Subtensor } = require('./src/lib/_subtensor/index.ts');

const substrate_host = 'ws://archivelb.nakamoto.opentensor.ai:9944';

const subtensor = new Subtensor("nakamoto", substrate_host);
// subtensor.create().then(()=>{
//     console.log(`subtensor ${substrate_host} connected`);
// });


const connect_to_subtensor = async () => {
    const api = await subtensor.create()
    return api;
}

const run = async () => {
    const sub = await connect_to_subtensor();

    console.log(sub);
}

run();
// import {Subtensor} from 'src/lib/_subtensor/index'

const { Subtensor } = require('./src/lib/_subtensor/index.ts');

const substrate_host = 'ws://archivelb.nakamoto.opentensor.ai:9944';
const RAOPERTAO = 1000000000;

const subtensor = new Subtensor("nakamoto", substrate_host);
// subtensor.create().then(()=>{
//     console.log(`subtensor ${substrate_host} connected`);
// });


const connect_to_subtensor = async () => {
    await subtensor.create();
}

const run = async () => {
    await connect_to_subtensor();

    const balance = await subtensor.getColdkeyBalance('5H9ApXP8beRy3RsVsBy9hhCZZPMbF9dLax6jTy5z27bQ4LkU');
    
    
    console.log(balance);
}

run();
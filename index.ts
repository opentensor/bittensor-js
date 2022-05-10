// import Subtensor from src/lib/subtensor/index.ts

const { Subtensor } = require('@bittensor/subtensor');

const substrate_host = 'nakamoto';

const subtensor = new Subtensor("", substrate_host);
subtensor.connect().then(()=>{
    console.log(`subtensor ${substrate_host} connected`);
});
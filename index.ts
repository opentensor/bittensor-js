import Subtensor from 'src/lib/_subtensor/index'

// const Subtensor = require('src/lib/_subtensor/index.ts');

const substrate_host = 'nakamoto';

const subtensor = new Subtensor("", substrate_host);
subtensor.connect().then(()=>{
    console.log(`subtensor ${substrate_host} connected`);
});
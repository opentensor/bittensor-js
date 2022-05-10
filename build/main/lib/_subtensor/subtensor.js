"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@polkadot/api");
class Subtensor {
    constructor(network = 'nakamoto', chain_endpoint = 'AtreusLB-2c6154f73e6429a9.elb.us-east-2.amazonaws.com:9944') {
        this.network = network;
        this.chain_endpoint = chain_endpoint;
    }
    _types() {
        const types = {
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
        };
        return types;
    }
    async create_api() {
        const provider = new api_1.WsProvider(`ws://${this.chain_endpoint}`);
        const api = await api_1.ApiPromise.create({
            provider,
            types: this._types(),
        });
        return api;
    }
}
exports.default = Subtensor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VidGVuc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9fc3VidGVuc29yL3N1YnRlbnNvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF1RDtBQVF2RCxNQUFNLFNBQVM7SUFDWCxZQUNJLFVBQWtCLFVBQVUsRUFDNUIsaUJBQXlCLDREQUE0RDtRQUdyRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sS0FBSyxHQUFJO1lBQ1gsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBRSxLQUFLO2FBQ2Y7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxPQUFPLEVBQUUsS0FBSztnQkFDZCxFQUFFLEVBQUUsTUFBTTtnQkFDVixJQUFJLEVBQUUsS0FBSztnQkFDWCxPQUFPLEVBQUUsSUFBSTtnQkFDYixHQUFHLEVBQUUsS0FBSztnQkFDVixRQUFRLEVBQUUsSUFBSTtnQkFDZCxNQUFNLEVBQUUsV0FBVztnQkFDbkIsT0FBTyxFQUFFLFdBQVc7Z0JBQ3BCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixRQUFRLEVBQUUsS0FBSztnQkFDZixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsS0FBSztnQkFDWixTQUFTLEVBQUUsS0FBSztnQkFDaEIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixRQUFRLEVBQUUsS0FBSztnQkFDZixLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixPQUFPLEVBQUUsaUJBQWlCO2FBQzdCO1NBQ0osQ0FBQTtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVTtRQUNaLE1BQU0sUUFBUSxHQUFHLElBQUksZ0JBQVUsQ0FBQyxRQUFRLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBRS9ELE1BQU0sR0FBRyxHQUFHLE1BQU0sZ0JBQVUsQ0FBQyxNQUFNLENBQUM7WUFDaEMsUUFBUTtZQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBRWYsQ0FBQztDQUdKO0FBR0Qsa0JBQWUsU0FBUyxDQUFDIn0=
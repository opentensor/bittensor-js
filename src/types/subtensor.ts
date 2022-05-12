
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

module.exports= {
    subtensor_custom_types,
    subtensor_custom_types_priority
};
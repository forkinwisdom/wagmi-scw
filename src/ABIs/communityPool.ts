export const communityPoolABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "_to", "type": "address" },
            { "name": "_amount", "type": "uint256" },
            { "name": "_tag", "type": "string" },
            { "name": "_concept", "type": "string" }
        ],
        "name": "transferCommunityUSDC",
        "outputs": [],
        "type": "function"
    },
    {
        "constants": false,
        "inputs": [
            { "name": "_to", "type": "address" },
            { "name": "_amount", "type": "uint256" },
            { "name": "_tag", "type": "string" },
            { "name": "_concept", "type": "string" }
        ],
        "name": "assignCommunityUSDC",
        "outputs": [],
        "type": "function"
    }
];

export const communityPoolAddress = '0x789F24d0f3AF9DbACE2c62cd3A7dEF445Ff0A7A2';

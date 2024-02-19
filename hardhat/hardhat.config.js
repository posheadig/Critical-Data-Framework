require("@nomiclabs/hardhat-waffle");

module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      gas: 1000000000000000, 
      blockGasLimit: 1000000000000000
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.21"
      },
      {
        version: "0.8.17"
      },
      {
        version: "0.8.0"
      },
      {
        version: "0.6.6"
      },
      {
        version: "0.5.16"
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000,
        details: { yul: false },
      },
    }
  },
};
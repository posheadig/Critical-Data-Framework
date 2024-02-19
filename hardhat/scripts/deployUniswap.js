const { Contract, ContractFactory, utils, BigNumber, constants } = require("ethers");
require('dotenv').config()
const WETH9 = require("../WETH9.json");

const factoryArtifact = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const routerArtifact = require('@uniswap/v2-periphery/build/UniswapV2Router02.json');

async function main() {
  const [owner] = await ethers.getSigners();
  console.log('owner', owner.address);

  const Factory = new ContractFactory(factoryArtifact.abi, factoryArtifact.bytecode, owner);
  const factory = await Factory.deploy(owner.address);
  console.log('factory', factory.address);

  // Create WETH
  const Weth = new ContractFactory(WETH9.abi, WETH9.bytecode, owner);
  const weth = await Weth.deploy();
  console.log('weth', weth.address);

  const Router = new ContractFactory(routerArtifact.abi, routerArtifact.bytecode, owner);
  const router = await Router.deploy(factory.address, weth.address);
  console.log('router', router.address);
}

// Run the script
// npx hardhat run --network localhost scripts/01_deployContracts.js

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

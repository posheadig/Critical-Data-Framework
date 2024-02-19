const hre = require('hardhat');
const { Contract, ContractFactory, utils, BigNumber, constants } = require("ethers")
const fs = require('fs');

async function main() {

 console.log('Deploying ovTokenBase contract...');
 const CreateOVT = await hre.ethers.getContractFactory('ovTokenBase');
  const createOVT = await CreateOVT.deploy();
  await createOVT.deployed();
  console.log('createOVT deployed:', createOVT.address);

  console.log('Deploying ovPoolBase contract...');
  const CreateOVP = await hre.ethers.getContractFactory('ovPoolBase');
   const createOVP = await CreateOVP.deploy();
   await createOVP.deployed();
   console.log('createOVP deployed:', createOVP.address);

  console.log('Deployment complete!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

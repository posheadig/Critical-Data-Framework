const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');
require('dotenv').config()
const csv = require('csv-parser'); // Import csv-parser

const OVTOKENBASE_ADDRESS = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
const OVPOOLBASE_ADDRESS = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
const ovtokenbase_abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "TokenCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "ETH_INITIAL_LIQUIDITY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "TOKEN_INITIAL_LIQUIDITY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "desiredTokenAmount",
          "type": "uint256"
        }
      ],
      "name": "createTokenAndAddLiquidity",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "desiredTokenAmount",
          "type": "uint256"
        }
      ],
      "name": "getEstimatedETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTokenCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokens",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "uniswapV2Router",
      "outputs": [
        {
          "internalType": "contract IUniswapV2Router02",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
const ovpoolbase_abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "name": "LiquidityAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "pair",
          "type": "address"
        }
      ],
      "name": "PairCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "RemainderTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "minAmountTokenA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "minAmountTokenB",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "addOwnedTokensAsLiquidity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "minAmountTokenA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "minAmountTokenB",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "buyTokensAsLiquidity",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "uniswapV2Router",
      "outputs": [
        {
          "internalType": "contract IUniswapV2Router02",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ];


  async function readCSV(filePath) {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', reject);
    });
}

async function createTokenAndAddLiquidity(contract, name, buyTokenAmount, estimatedETH) {
    const tx = await contract.createTokenAndAddLiquidity(
        name,
        ethers.utils.parseUnits(buyTokenAmount, 18),
        { value: estimatedETH, gasLimit: 6000000 }
    );
    const receipt = await tx.wait();
    return receipt.events?.filter((x) => x.event === "TokenCreated")[0]?.args?.token;
}

async function token() {
    try {
        const signer = await ethers.getSigner();
        const createTokenContract = new ethers.Contract(OVTOKENBASE_ADDRESS, ovtokenbase_abi, signer);
        const csvFilePath = path.join(__dirname, '../datasets/laptop_price.csv'); // Update with the correct CSV file path
        const csvData = await readCSV(csvFilePath);

        // Generate tokens for unique companies
        const uniqueCompanies = [...new Set(csvData.map(row => row.Company))];
        const companyTokenAddresses = new Map();
        for (const company of uniqueCompanies) {
            const estimatedETH = await createTokenContract.getEstimatedETH("0");
            const tokenAddress = await createTokenAndAddLiquidity(createTokenContract, company, "0", estimatedETH);
            companyTokenAddresses.set(company, tokenAddress);
            console.log(`Token created for company: ${company}, Address: ${tokenAddress}`);
        }

        // Generate tokens for unique TypeNames
        const uniqueTypeNames = [...new Set(csvData.map(row => row.TypeName))];
        const typeNameTokenAddresses = new Map();
        for (const typeName of uniqueTypeNames) {
            const estimatedETH = await createTokenContract.getEstimatedETH("0");
            const tokenAddress = await createTokenAndAddLiquidity(createTokenContract, typeName, "0", estimatedETH);
            typeNameTokenAddresses.set(typeName, tokenAddress);
            console.log(`Token created for TypeName: ${typeName}, Address: ${tokenAddress}`);
        }

        // Create tokens for product names and link them to their corresponding company and TypeName tokens
        for (const row of csvData) {
            const companyTokenAddress = companyTokenAddresses.get(row.Company);
            const typeNameTokenAddress = typeNameTokenAddresses.get(row.TypeName);
            const productName = `${row.Product} ${row.Inches}" ${row.ScreenResolution} ${row.Cpu} ${row.Ram} ${row.Memory} ${row.Gpu} ${row.OpSys} ${row.Weight} ${row.Price_euros} euros`;
            const estimatedETH = await createTokenContract.getEstimatedETH("0");
            const productTokenAddress = await createTokenAndAddLiquidity(createTokenContract, productName, "0", estimatedETH);
            console.log(`Token created for product: ${productName}, Address: ${productTokenAddress}`);

            // Linking process with the company token
            const createLContract = new ethers.Contract(OVPOOLBASE_ADDRESS, ovpoolbase_abi, signer);
            const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
            await linkTokens(createLContract, companyTokenAddress, productTokenAddress, deadline);
            await linkTokens(createLContract, typeNameTokenAddress, productTokenAddress, deadline);
            console.log(`Links created for product: ${productName} with company: ${row.Company} and TypeName: ${row.TypeName}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function linkTokens(createLContract, tokenA, tokenB, deadline) {
    const tx = await createLContract.buyTokensAsLiquidity(
        tokenA,
        tokenB,
        ethers.utils.parseUnits("0", 18),
        ethers.utils.parseUnits("0", 18),
        deadline,
        { value: ethers.utils.parseUnits("0.001", 18), gasLimit: 5000000 }
    );
    await tx.wait();
}

token();
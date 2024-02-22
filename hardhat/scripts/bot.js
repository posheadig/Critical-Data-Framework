const { ethers } = require('hardhat');


async function fetchAllPairsHardHat(ETH_ADDRESS) {
    let allTokens = [];
    let allPairs = [];
    let skip = 0;
    const fetchSize = 1000; // Max items per query
 
    while (true) {
        const query = `
            query {
                tokens(first: ${fetchSize}, skip: ${skip}) {
                    id
                    name
                    address
                }
                pairs(first: ${fetchSize}, skip: ${skip}) {
                    id
                    token0
                    token1
                    address
                    token1Name
                    token0Name
                    reserve1
                    reserve0
                }
            }`;
 
        try {
            const response = await fetch('http://localhost:8000/subgraphs/name/seven/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query
                })
            });
 
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.statusText}`);
            }
 
            const data = await response.json();
            if (data.errors) {
                throw new Error(`GraphQL Error: ${data.errors.map(e => e.message).join('\n')}`);
            }
           // saveToFile;
            allTokens = allTokens.concat(data.data.tokens);
            allPairs = allPairs.concat(data.data.pairs);
 
            // Check if we've fetched all available data
            if (data.data.tokens.length < fetchSize && data.data.pairs.length < fetchSize) {
                break; // Exit loop if fewer items than fetchSize were returned for both tokens and pairs
            }
 
            skip += fetchSize; // Prepare `skip` for the next iteration
        } catch (error) {
            console.error('Fetch Error:', error);
            break; // Exit loop in case of error
        }
    }
   // saveDataAsJson(allTokens, allPairs);   /// save as JSON and upload to IPFS for serving to GPT
    const processed = await processData(allTokens, allPairs, ETH_ADDRESS);
    return processed;
 }

async function bot() {
    const signer = await ethers.getSigner();
    const UNISWAP_ROUTER = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
    const WETH_ADDRESS = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';
    const uniswap_router_abi = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_factory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_WETH",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "WETH",
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
              "name": "amountADesired",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountBDesired",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountAMin",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountBMin",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "addLiquidity",
          "outputs": [
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
              "name": "liquidity",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amountTokenDesired",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountTokenMin",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountETHMin",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "addLiquidityETH",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountToken",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountETH",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "liquidity",
              "type": "uint256"
            }
          ],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "factory",
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reserveIn",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reserveOut",
              "type": "uint256"
            }
          ],
          "name": "getAmountIn",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reserveIn",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reserveOut",
              "type": "uint256"
            }
          ],
          "name": "getAmountOut",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            }
          ],
          "name": "getAmountsIn",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            }
          ],
          "name": "getAmountsOut",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountA",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reserveA",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reserveB",
              "type": "uint256"
            }
          ],
          "name": "quote",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountB",
              "type": "uint256"
            }
          ],
          "stateMutability": "pure",
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
              "name": "liquidity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountAMin",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountBMin",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "removeLiquidity",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountA",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountB",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "liquidity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountTokenMin",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountETHMin",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "removeLiquidityETH",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountToken",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountETH",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "liquidity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountTokenMin",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountETHMin",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountETH",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "liquidity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountTokenMin",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountETHMin",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "approveMax",
              "type": "bool"
            },
            {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
            }
          ],
          "name": "removeLiquidityETHWithPermit",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountToken",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountETH",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "liquidity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountTokenMin",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountETHMin",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "approveMax",
              "type": "bool"
            },
            {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
            }
          ],
          "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountETH",
              "type": "uint256"
            }
          ],
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
              "name": "liquidity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountAMin",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountBMin",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "approveMax",
              "type": "bool"
            },
            {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
            }
          ],
          "name": "removeLiquidityWithPermit",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amountA",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountB",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "swapETHForExactTokens",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "swapExactETHForTokens",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "swapExactTokensForETH",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "swapExactTokensForTokens",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountInMax",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "swapTokensForExactETH",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountInMax",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "name": "swapTokensForExactTokens",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ];
const pairsObject = await fetchAllPairsHardHat();
const pairsArrayTokens = Object.values(pairsObject.tokens);
const pairsArrayPairs = Object.values(pairsObject.pairs);
console.log(pairsArrayTokens, pairsArrayPairs);
    const opportunities = await findArbitrageOpportunities(pairsArrayPairs, pairsArrayTokens, WETH_ADDRESS, UNISWAP_ROUTER, uniswap_router_abi, signer);
    console.log('oppurtunities', opportunities);
    if (opportunities.length > 0) {
        await executeArbitrageOpportunities(opportunities);
    }
}


async function findArbitrageOpportunities(pairs, tokens, ETH_ADDRESS, UNISWAP_ROUTER, uniswap_router_abi, signer, threshold = 0.0001) {
    let opportunities = [];
    const routerContract = new ethers.Contract(UNISWAP_ROUTER, uniswap_router_abi, signer);

    for (const token1 of tokens) {
        //starting it at .001 because anything above that will show. 
        const ethAmountIn = ethers.utils.parseEther(".001");
        const ethToToken1Path = [ETH_ADDRESS, token1.address];

        try {
            const ethToToken1AmountOut = await routerContract.getAmountsOut(ethAmountIn, ethToToken1Path);
console.log('token amount out', ethers.utils.formatEther(ethToToken1AmountOut[1]));
            for (const pair of pairs) {
                if (pair.token0Address === token1.address || pair.token1Address === token1.address) {
                    let token2Address = (pair.token0Address === token1.address) ? pair.token1Address : pair.token0Address;
                    let token2 = tokens.find(t => t.address === token2Address);

                    if (token2) {
                        // Use reserves to calculate the swap amount from token1 to token2 directly
                        const token1ToToken2AmountOut = calculateSwapAmountOut(pair, token1.address, ethToToken1AmountOut[1]);

                        // Token2 back to ETH swap simulation
                        const token2ToEthAmountOut = await routerContract.getAmountsOut(token1ToToken2AmountOut, [token2.address, ETH_ADDRESS]);
console.log(ethers.utils.formatEther(token2ToEthAmountOut[1]));
                        // Check if the arbitrage is profitable considering the threshold
                        const finalEthAmount = token2ToEthAmountOut[1];
                        if (parseFloat(ethers.utils.formatEther(finalEthAmount)) > parseFloat(ethers.utils.formatEther(ethAmountIn)) * (1 + threshold)) {
                            opportunities.push({
                                step1: { token: token1.address, tokenName: token1.name, amountOut: ethers.utils.formatEther(ethToToken1AmountOut[1]) },
                                step2: { pair: pair.pairAddress, token1: token1.address, token1Name: token1.name, token2: token2Address, token2Name: token2.name, amountOut: ethers.utils.formatEther(token1ToToken2AmountOut) },
                                step3: { token: token2Address, amountOut: ethers.utils.formatEther(finalEthAmount) },
                                opportunityType: "ETH -> Token1 -> Token2 -> ETH"
                            });
                        }
                    }
                }
            }
        } catch (error) {
            console.error(`Error processing token ${token1.name}:`, error);
        }
    }

    console.log('opportunities', opportunities);
return opportunities;
}


async function findArbitrageOpportunitiesRead(pairs, tokens, ETH_ADDRESS, UNISWAP_ROUTER, uniswap_router_abi, signer, threshold = 0.0001) {
    let opportunities = [];
    const routerContract = new ethers.Contract(UNISWAP_ROUTER, uniswap_router_abi, signer);

    for (const token1 of tokens) {
        //starting it at .001 because anything above that will show. 
        const ethAmountIn = ethers.utils.parseEther("1.0");
        const ethToToken1Path = [ETH_ADDRESS, token1.address];

        try {
            const ethToToken1AmountOut = await routerContract.getAmountsOut(ethAmountIn, ethToToken1Path);
console.log('token amount out', ethers.utils.formatEther(ethToToken1AmountOut[1]));
            for (const pair of pairs) {
                if (pair.token0Address === token1.address || pair.token1Address === token1.address) {
                    let token2Address = (pair.token0Address === token1.address) ? pair.token1Address : pair.token0Address;
                    let token2 = tokens.find(t => t.address === token2Address);

                    if (token2) {
                        // Use reserves to calculate the swap amount from token1 to token2 directly
                        const token1ToToken2AmountOut = calculateSwapAmountOut(pair, token1.address, ethToToken1AmountOut[1]);

                        // Token2 back to ETH swap simulation
                        const token2ToEthAmountOut = await routerContract.getAmountsOut(token1ToToken2AmountOut, [token2.address, ETH_ADDRESS]);
console.log(ethers.utils.formatEther(token2ToEthAmountOut[1]));
                        // Check if the arbitrage is profitable considering the threshold
                        const finalEthAmount = token2ToEthAmountOut[1];
                        if (parseFloat(ethers.utils.formatEther(finalEthAmount)) > parseFloat(ethers.utils.formatEther(ethAmountIn)) * (1 + threshold)) {
                            opportunities.push({
                                step1: { token: token1.name, amountOut: ethers.utils.formatEther(ethToToken1AmountOut[1]) },
                                step2: { pair: pair.pairAddress, token1: token1.name, token2: token2.name, amountOut: ethers.utils.formatEther(token1ToToken2AmountOut) },
                                step3: { token: token2.name, amountOut: ethers.utils.formatEther(finalEthAmount) },
                                opportunityType: "ETH -> Token1 -> Token2 -> ETH"
                            });
                        }
                    }
                }
            }
        } catch (error) {
            console.error(`Error processing token ${token1.name}:`, error);
        }
    }

    console.log('opportunities', opportunities);
    return opportunities;
}

function calculateSwapAmountOut(pair, tokenInAddress, amountIn) {
    let reserveIn, reserveOut;
    if (tokenInAddress === pair.token0Address) {
        reserveIn = ethers.utils.parseUnits(pair.token0Reserve, 'ether');
        reserveOut = ethers.utils.parseUnits(pair.token1Reserve, 'ether');
    } else {
        reserveIn = ethers.utils.parseUnits(pair.token1Reserve, 'ether');
        reserveOut = ethers.utils.parseUnits(pair.token0Reserve, 'ether');
    }
    console.log('token0',pair.token0Address, pair.token0Reserve, 'token1', pair.token1Address, pair.token1Reserve)
    console.log('token0 amounts', 'in', ethers.utils.formatEther(reserveIn),'out',ethers.utils.formatEther(reserveOut));
    const amountInWithFee = amountIn.mul(997);
    const numerator = amountInWithFee.mul(reserveOut);
    const denominator = reserveIn.mul(1000).add(amountInWithFee);
    const amountOut = numerator.div(denominator);
    console.log(ethers.utils.formatEther(amountOut));
    return amountOut;
}


async function executeArbitrageOpportunities(opportunities) {
    const signer = await ethers.getSigner();
    const WETH_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    const ARBITRAGE_EXECUTOR_ADDRESS = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
    const arbitrageExecutorABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "name": "executeArbitrage",
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
    const arbitrageExecutorContract = new ethers.Contract(ARBITRAGE_EXECUTOR_ADDRESS, arbitrageExecutorABI, signer);

    const slippageToleranceBps = 50;
    const oneHundredPercentBps = 10000;

    for (const opportunity of opportunities) {
        const path = [
            WETH_ADDRESS,
            opportunity.step1.token,
            opportunity.step2.token2,
            WETH_ADDRESS
        ];
console.log('paths', path);
        // Adjust the amounts by the slippage tolerance
        const amounts = [
            ethers.utils.parseUnits(opportunity.step1.amountOut, 'ether'), 
            ethers.utils.parseUnits(opportunity.step2.amountOut, 'ether'), 
            ethers.utils.parseUnits(opportunity.step3.amountOut, 'ether') 
        ].map(amount => 
            // Adjust the amount by the slippage tolerance
            amount.mul(oneHundredPercentBps - slippageToleranceBps).div(oneHundredPercentBps)
        );
console.log('amounts', amounts);
        // Calculate the ETH amount to send with the transaction based on your strategy
        // This might be more than the sum of amounts in case of slippage or less if you're confident in the liquidity
        const ethAmountToSend = ethers.utils.parseEther("1.0"); // Example, adjust based on your logic and needs

        try {
            const tx = await arbitrageExecutorContract.executeArbitrage(path, amounts.map(a => a.toString()), {
                value: ethAmountToSend,
                gasLimit: ethers.utils.hexlify(2000000) // Adjust based on estimations
            });
            console.log(`Executing arbitrage: ${tx.hash}`);
            await tx.wait();
            console.log(`Arbitrage executed successfully: ${tx.hash}`);
        } catch (error) {
            console.error(`Failed to execute arbitrage: ${error.message}`);
        }
    }
}








////////////////
function processTokenData(token, pairs) {
    // Find the corresponding ETH pair for this token
    const ETH_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    const ethPair = pairs.find(p => (p.token0 === token.id || p.token1 === token.id) && (p.token0 === ETH_ADDRESS || p.token1 === ETH_ADDRESS));
    let currentPrice = 0;
    if (ethPair) {
       const ethReserve = ethPair.token0 === ETH_ADDRESS ? ethPair.reserve0 : ethPair.reserve1;
       const tokenReserve = ethPair.token0 === ETH_ADDRESS ? ethPair.reserve1 : ethPair.reserve0;
       currentPrice = parseFloat(ethers.utils.formatEther(ethReserve)) / parseFloat(ethers.utils.formatEther(tokenReserve));
    }
 
    return {
       ...token,
       currentPrice
    };
 }
 
 function processPairData(pair, tokenPrices) {
    const token0Price = tokenPrices[pair.token0] || 0;
    const token1Price = tokenPrices[pair.token1] || 0;
    const token0ReserveInEth = parseFloat(ethers.utils.formatEther(pair.reserve0)) * token0Price;
    const token1ReserveInEth = parseFloat(ethers.utils.formatEther(pair.reserve1)) * token1Price;
    const totalValue = token0ReserveInEth + token1ReserveInEth;
 
    return {
       pairAddress: pair.id,
       token0Address: pair.token0,
       token1Address: pair.token1,
       token0Name: pair.token0Name,
       token1Name: pair.token1Name,
       token0Reserve: ethers.utils.formatEther(pair.reserve0),
       token1Reserve: ethers.utils.formatEther(pair.reserve1),
       totalValue
    };
 }
 
 async function processData(tokens, pairs) {
    // Filter out ETH pairs and process tokens
    const ETH_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    const ethPairs = pairs.filter(p => p.token0 === ETH_ADDRESS || p.token1 === ETH_ADDRESS);
    const processedTokens = tokens.map(token => processTokenData(token, ethPairs));
 
    // Create a map of token prices for easy lookup
    const tokenPrices = processedTokens.reduce((acc, token) => {
       acc[token.id] = token.currentPrice;
       return acc;
    }, {});
 
    // Process non-ETH pairs
    const nonEthPairs = pairs.filter(p => p.token0 !== ETH_ADDRESS && p.token1 !== ETH_ADDRESS);
    const processedPairs = nonEthPairs.map(pair => processPairData(pair, tokenPrices));
 
    return {
       tokens: processedTokens,
       pairs: processedPairs
    };
 }


 bot();
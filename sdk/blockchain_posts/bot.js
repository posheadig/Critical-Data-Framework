import { initializeProviderFromCurrentNetwork } from '../network_utilities/provider';
import { getConstantsForNetwork } from '../network_utilities/getConstants';
import * as ethers from 'ethers';

 export async function pairDetails() {
        const pairsQuery = `
                 query MyQuery {
                     tokens(first: 100) {
                         id
                         name
                         address
                     }
                     pairs(first: 100) {
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
           const response = await fetch('https://api.studio.thegraph.com/proxy/53594/dadastest/v0.3.9', {
              method: 'POST',
              headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
              },
              body: JSON.stringify({
                 query: pairsQuery
              })
           });
     
           if (!response.ok) {
              throw new Error(`HTTP Error: ${response.statusText}`);
           }
     
           const data = await response.json();
           console.log(data);
           if (data.errors) {
              throw new Error(`GraphQL Error: ${data.errors.map(e => e.message).join('\n')}`);
           }
           const proced = processData(data.data.tokens, data.data.pairs);
           console.log(proced);
           return proced
        } catch (error) {
           console.error('Fetch Error:', error);
        }
     }
     

export async function bot() {
    const { signer, network } = await initializeProviderFromCurrentNetwork();
    const {
    UNISWAP_ROUTER, 
    uniswap_router_abi, 
    WETH_ADDRESS,
    OVSWAPBASE_ADDRESS,
    ovswapbase_abi 
    } = getConstantsForNetwork(network);
    const pairsObject = await pairDetails();
const pairsArrayTokens = Object.values(pairsObject.tokens);
const pairsArrayPairs = Object.values(pairsObject.pairs);
console.log(pairsArrayTokens, pairsArrayPairs);
    const opportunities = await findArbitrageOpportunities(pairsArrayPairs, pairsArrayTokens, WETH_ADDRESS, UNISWAP_ROUTER, uniswap_router_abi, signer);
    console.log('oppurtunities', opportunities);
    displayOpportunitiesInModal(opportunities);
    if (opportunities.length > 0) {
        await executeArbitrageOpportunities(opportunities);
    }
}

function displayOpportunitiesInModal(opportunities) {
    const modal = document.getElementById('opportunitiesModal');
    const list = document.getElementById('opportunitiesList');
    list.innerHTML = ''; // Clear previous content

    if (opportunities.length === 0) {
        list.innerHTML = '<p>No arbitrage opportunities found.</p>';
    } else {
        opportunities.forEach((op, index) => {
            const item = document.createElement('div');
            item.className = 'opportunity-item';
            item.innerHTML = `
                <h4>#${index + 1}</h4>
                <div><strong>Increased</strong> <strong2><a href = "${op.step1.tokenName}" target = "blank">${op.step1.tokenName}</a></strong2></div>
                <div><strong>Swappped</strong> <a href = "${op.step1.token1Name}" target = "blank">${op.step1.tokenName}</a> for <strong2><a href = "${op.step2.token2Name}" target = "blank">${op.step2.token2Name}</a></strong2></div>
                <div><strong>Decreased</strong> <strong2><a href = "${op.step2.token2Name}" target = "blank">${op.step2.token2Name}</a></strong2></div>
            `;
            list.appendChild(item);
        });
    }

    modal.style.display = 'block'; // Show the modal
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
    const { signer, network } = await initializeProviderFromCurrentNetwork();
    const { ARBITRAGE_EXECUTOR_ADDRESS, WETH_ADDRESS, arbitrageExecutorABI } = getConstantsForNetwork(network);

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
        const ethAmountToSend = ethers.utils.parseEther("0.001"); // Example, adjust based on your logic and needs

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
 
 export function processData(tokens, pairs) {
    // Filter out ETH pairs and process tokens
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
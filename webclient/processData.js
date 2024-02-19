async function processData(tokens, pairs, ETH_ADDRESS) {
    // Filter out ETH pairs and process tokens
    const ethPairs = pairs.filter(p => p.token0 === ETH_ADDRESS || p.token1 === ETH_ADDRESS);
    const processedTokens = tokens.map(token => processTokenData(token, ethPairs, ETH_ADDRESS));
 
    // Create a map of token prices for easy lookup
    const tokenPrices = processedTokens.reduce((acc, token) => {
       acc[token.id] = token.currentPrice;
       return acc;
    }, {});
 
    // Process non-ETH pairs
    const nonEthPairs = pairs.filter(p => p.token0 !== ETH_ADDRESS && p.token1 !== ETH_ADDRESS);
    const processedPairs = nonEthPairs.map(pair => processPairData(pair, tokenPrices, ETH_ADDRESS));
 
    return {
       tokens: processedTokens,
       pairs: processedPairs
    };
 }

 function processTokenData(token, pairs, ETH_ADDRESS) {
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
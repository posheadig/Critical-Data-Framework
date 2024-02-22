import { initializeProviderFromCurrentNetwork } from '../network_utilities/provider';
import { getConstantsForNetwork } from '../network_utilities/getConstants';
import { events } from '../network_utilities/eventHandler';
import * as ethers from 'ethers';

export async function sell(tokenAddress, tokenAmount) {
    try {
  
    const { signer, account, network } = await initializeProviderFromCurrentNetwork();
    const {
      UNISWAP_ROUTER, 
      uniswap_router_abi, 
      WETH_ADDRESS, 
      nameassymbolerc20_abi,
      OVSWAPBASE_ADDRESS,
      ovswapbase_abi 
    } = getConstantsForNetwork(network);

    const beginningEvent = new CustomEvent('status', { detail: 'starting' });
    events.dispatchEvent(beginningEvent);
  
    const routerContract = new ethers.Contract(UNISWAP_ROUTER, uniswap_router_abi, signer);
    const txContract = new ethers.Contract(OVSWAPBASE_ADDRESS, ovswapbase_abi, signer);
  
    // Calculate the minimum amount of ETH to be received
    const tokensToSell = ethers.utils.parseUnits(tokenAmount.toString(), 18);
    const path = [tokenAddress, WETH_ADDRESS];
    const amountsOut = await routerContract.getAmountsOut(tokensToSell, path);
    const minETHReceived = amountsOut[1];
    const ETHReceived = ethers.utils.formatEther(minETHReceived);
    
    const calculatedEthReceived = new CustomEvent('transactionData', {detail: 'going to make ' + ETHReceived + ' ETH'});
    events.dispatchEvent(calculatedEthReceived);

    // Approval step
    const tokenContract = new ethers.Contract(tokenAddress, nameassymbolerc20_abi, signer); 

    const statusEvent = new CustomEvent('status', { detail: 'waiting for approvals' });
    events.dispatchEvent(statusEvent);

    const currentAllowance = await tokenContract.allowance(account, OVSWAPBASE_ADDRESS);
    if (currentAllowance.lt(tokensToSell)) {
        // Only approve if necessary
        const approveTx = await tokenContract.approve(OVSWAPBASE_ADDRESS, tokensToSell);
        await approveTx.wait();
    }
  
    // Swap tokens for ETH
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from the current Unix time

    const almostEvent = new CustomEvent('status', { detail: 'beginning transaction' });
    events.dispatchEvent(almostEvent);

    const transaction = await txContract.sellExactTokenForETH(
      tokenAddress,
      tokensToSell, 
      minETHReceived, 
      deadline,
      { 
        gasLimit: ethers.utils.hexlify(2000000) 
      }
    );

    // Transaction hash is available here
    const transactionHash = transaction.hash;

    const waitingReceiptEvent = new CustomEvent('status', { detail: 'waiting for receipt' });
    events.dispatchEvent(waitingReceiptEvent);


    const result = { 
        status: "200", 
        data: "Sold tokens successfully",
    };
    
    return result;
    }catch (error) {
      console.log("Sell Error:", error);
      const errorEvent = new CustomEvent('error', { detail: error });
      events.dispatchEvent(errorEvent);
      throw error;
    }
  }
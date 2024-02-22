import { initializeProviderFromCurrentNetwork } from '../network_utilities/provider';
import { getConstantsForNetwork } from '../network_utilities/getConstants';
import { events } from '../network_utilities/eventHandler';
import * as ethers from 'ethers';

export async function buy(tokenAddress, tokenAmount) {
    try {
        const { signer, network } = await initializeProviderFromCurrentNetwork();
        const {
        UNISWAP_ROUTER, 
        uniswap_router_abi, 
        WETH_ADDRESS,
        OVSWAPBASE_ADDRESS,
        ovswapbase_abi 
        } = getConstantsForNetwork(network);
    
        const beginningEvent = new CustomEvent('status', { detail: 'starting' });
        events.dispatchEvent(beginningEvent);
    
        const routerContract = new ethers.Contract(UNISWAP_ROUTER, uniswap_router_abi, signer);
        const txContract = new ethers.Contract(OVSWAPBASE_ADDRESS, ovswapbase_abi, signer);
    
        const desiredTokens = ethers.utils.parseUnits(tokenAmount.toString(), 18);
        const path = [WETH_ADDRESS, tokenAddress];
        const amountsIn = await routerContract.getAmountsIn(desiredTokens, path);
        const amountETHRequired = amountsIn[0];
        const ethSpent = ethers.utils.formatEther(amountETHRequired);
    
        const calculatedEthSpent = new CustomEvent('transactionData', {detail: 'going to cost ' + ethSpent + ' ETH'});
        events.dispatchEvent(calculatedEthSpent);
    
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
    
        const statusEvent = new CustomEvent('status', { detail: 'waiting for approvals' });
        events.dispatchEvent(statusEvent);
    
        const transaction = await txContract.buyExactTokenWithETH(
            tokenAddress,
            desiredTokens, 
            deadline,
            { 
                value: amountETHRequired,
                gasLimit: ethers.utils.hexlify(2000000) 
            }
        );
    
        const waitingReceiptEvent = new CustomEvent('status', { detail: 'waiting for receipt' });
        events.dispatchEvent(waitingReceiptEvent);

        const receipt = await transaction.wait();

        const result = { 
            status: "200", 
            data: "Bought tokens successfully",
        };
        
        return result;
    }catch (error) {
        console.log("Buy Error:", error);
        const errorEvent = new CustomEvent('error', { detail: error });
        events.dispatchEvent(errorEvent);
        throw error;
    }
    }
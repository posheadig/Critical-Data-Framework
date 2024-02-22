import { initializeProviderFromCurrentNetwork } from '../network_utilities/provider';
import { getConstantsForNetwork } from '../network_utilities/getConstants';
import { events } from '../network_utilities/eventHandler';
import * as ethers from 'ethers';

export async function swapTokensForTokens(tokenInAddress, tokenOutAddress, tokenInAmount) {
    try {
        const { signer, network, account } = await initializeProviderFromCurrentNetwork();
        const {
            UNISWAP_ROUTER, 
            uniswap_router_abi,
            nameassymbolerc20_abi
        } = getConstantsForNetwork(network);
    
        const beginningEvent = new CustomEvent('status', { detail: 'starting' });
        events.dispatchEvent(beginningEvent);
    
        const routerContract = new ethers.Contract(UNISWAP_ROUTER, uniswap_router_abi, signer);
        const tokenInContract = new ethers.Contract(tokenInAddress, nameassymbolerc20_abi, signer);
        const amountIn = ethers.utils.parseUnits(tokenInAmount.toString(), 18);
        console.log("waiting for approvals...", 'amountint', ethers.utils.formatEther(amountIn));
      
        const amountsOut = await routerContract.getAmountsOut(amountIn, [tokenInAddress, tokenOutAddress]);
        const amountOutMin = amountsOut[1].sub(amountsOut[1].div(10));
        console.log(ethers.utils.formatEther(amountOutMin));
                // Approve the Router contract to move your tokens
        await tokenInContract.approve(UNISWAP_ROUTER, amountIn);
        const path = [tokenInAddress, tokenOutAddress];
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

        const statusEvent = new CustomEvent('status', { detail: 'waiting for approvals' });
        events.dispatchEvent(statusEvent);

        const transaction = await routerContract.swapExactTokensForTokens(
            amountIn, 
            amountOutMin, 
            path, 
            account,
            deadline,
            {
                gasLimit: ethers.utils.hexlify(2000000) // Adjust gas limit as needed
            }
        );

        const waitingReceiptEvent = new CustomEvent('status', { detail: 'waiting for receipt' });
        events.dispatchEvent(waitingReceiptEvent);

        const receipt = await transaction.wait();

        const result = { 
            status: "200", 
            data: "Swapped tokens successfully",
        };

        return result;
    } catch (error) {
        console.log("Swap Error:", error);
        const errorEvent = new CustomEvent('error', { detail: error });
        events.dispatchEvent(errorEvent);
        throw error;
    }
}
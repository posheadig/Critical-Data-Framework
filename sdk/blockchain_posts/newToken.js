import { initializeProviderFromCurrentNetwork } from '../network_utilities/provider';
import { events } from '../network_utilities/eventHandler';
import { getConstantsForNetwork } from '../network_utilities/getConstants.js';
import * as ethers from 'ethers';

export async function token(content, buyTokenAmount) {
    try{
    const { account, signer, network } = await initializeProviderFromCurrentNetwork();
    const {
        OVTOKENBASE_ADDRESS,
        ovtokenbase_abi
      } = getConstantsForNetwork(network);

    const name = content;
    const createToken = new ethers.Contract(OVTOKENBASE_ADDRESS, ovtokenbase_abi, signer);
    const estimatedETH = await createToken.getEstimatedETH(ethers.utils.parseUnits(buyTokenAmount, 18));
    console.log('estimated ETH', ethers.utils.formatEther(estimatedETH));

     let tx = await createToken.createTokenAndAddLiquidity(
         name,
         ethers.utils.parseUnits(buyTokenAmount, 18),
         { value: estimatedETH, gasLimit: 6000000  }
     );


    const transactionHash = tx.hash;
    console.log(transactionHash);
    let receipt = await tx.wait();

    const result = { 
        status: "200", 
        data: "New token, pair, and liquidity created successfully",
    };
    
    return result;
    } catch (error) {
       console.log("Quest Error:", error);
       const errorEvent = new CustomEvent('error', { detail: error });
       events.dispatchEvent(errorEvent);
       throw error;
   }
 }
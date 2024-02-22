import * as sepoliaConstants from '../constants/sepolia';
import * as hardhatConstants from '../constants/hardhat';
//import * as mainConstants from '../constants/main';


export function getConstantsForNetwork(network) {
    switch (network) {
      case 'sepolia':
        return sepoliaConstants;
      case 'hardhat':
        return hardhatConstants;
      //  case 'main':
      //    return mainConstants;
      default:
        throw new Error('Invalid network specified.');
    }
  }
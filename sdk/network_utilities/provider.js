import * as ethers from 'ethers';
// Helper function
function getWeb3Provider() {
  if (!window.ethereum) {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    throw new Error('Non-Ethereum browser detected');
  }
  return new ethers.providers.Web3Provider(window.ethereum);
}

export async function initializeProviderFromCurrentNetwork() {
  const provider = getWeb3Provider();

  const network = await provider.getNetwork();
  
  const networkMapping = {
    0xaa36a7: 'sepolia',
    0x7a69: 'hardhat',
   // 0x1: 'main',
  };

  const selectedNetwork = networkMapping[network.chainId];
  if (!selectedNetwork) {
    throw new Error('Unsupported network detected. Please switch to Sepolia network.');
  }

  return await initializeProvider(selectedNetwork);
}

export async function initializeProvider(selectedNetwork = 'sepolia') {
  if (!['sepolia'].includes(selectedNetwork)) {
    throw new Error('Invalid network specified.');
  }

  let provider;

  if (window.ethereum) {
    provider = getWeb3Provider();
    // Request accounts access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }

  const signer = provider.getSigner();
  const account = await signer.getAddress();

  return { provider, signer, account, network: selectedNetwork };
}
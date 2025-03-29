import { ethers } from 'ethers';

// Standard ERC20 ABI for token interactions
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
];

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  allowance?: string;
}

export interface TokenTransaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  timestamp: number;
}

export const connectMetaMask = async () => {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = accounts[0];

    // Get ETH balance
    const ethBalance = await provider.getBalance(address);
    const formattedEthBalance = ethers.utils.formatEther(ethBalance);

    // Get list of tokens (you might want to store this in a database or configuration)
    const tokens: { [key: string]: string } = {
      // Mainnet tokens
      '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': 'UNI', // Uniswap
      '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI', // DAI
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': 'WBTC', // Wrapped BTC
      '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0': 'MATIC', // Polygon
      '0x514910771AF9Ca656af840dff83E8264EcF986CA': 'LINK', // Chainlink
      '0x0D8775F648430679A709E98d2b0Cb6250d2887EF': 'BAT', // Basic Attention Token
      '0x1fE24F25b1Cf609B9c4e7E12D802e3640fFA2E88': 'CGG', // ChainGuardians
      '0x4Fabb145d64652a948d72533023f6E7A623C7C53': 'BUSD', // Binance USD
      '0x4E15361FD6b4BB609Fa63C81A2be19d873717870': 'Fantom',
      '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2': 'MKR', // Maker
      '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e': 'YFI', // Yearn Finance
      '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9': 'AAVE', // Aave
    };

    // Get token balances
    const tokenBalances: TokenInfo[] = await Promise.all(
      Object.entries(tokens).map(async ([tokenAddress, symbol]) => {
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        const [balance, decimals, name] = await Promise.all([
          tokenContract.balanceOf(address),
          tokenContract.decimals(),
          tokenContract.name(),
        ]);
        return {
          address: tokenAddress,
          symbol,
          name,
          decimals,
          balance: ethers.utils.formatUnits(balance, decimals),
        };
      })
    );

    return {
      address,
      provider,
      signer,
      ethBalance: formattedEthBalance,
      tokens: tokenBalances,
    };
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    throw error;
  }
};

// Function to transfer tokens
export const transferTokens = async (
  tokenAddress: string,
  to: string,
  amount: string,
  decimals: number,
  signer: ethers.Signer
) => {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const amountWei = ethers.utils.parseUnits(amount, decimals);
    const tx = await tokenContract.transfer(to, amountWei);
    return await tx.wait();
  } catch (error) {
    console.error('Error transferring tokens:', error);
    throw error;
  }
};

// Function to approve token spending
export const approveTokens = async (
  tokenAddress: string,
  spender: string,
  amount: string,
  decimals: number,
  signer: ethers.Signer
) => {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const amountWei = ethers.utils.parseUnits(amount, decimals);
    const tx = await tokenContract.approve(spender, amountWei);
    return await tx.wait();
  } catch (error) {
    console.error('Error approving tokens:', error);
    throw error;
  }
};

// Function to get token allowance
export const getTokenAllowance = async (
  tokenAddress: string,
  owner: string,
  spender: string,
  provider: ethers.providers.Provider
) => {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const allowance = await tokenContract.allowance(owner, spender);
    const decimals = await tokenContract.decimals();
    return ethers.utils.formatUnits(allowance, decimals);
  } catch (error) {
    console.error('Error getting token allowance:', error);
    throw error;
  }
};

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
} 
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const key = '5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a';
const apiKey = 'JDQQBCT983XAA7NR7HZIB9MBD5VV71HXPP';
const accounts = [
  '0x98a112b164308a8df6b0136976cb5e2b4895a49fe78eee3e34c1256d16c756af',
];

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    bsctest: {
      url: 'https://data-seed-prebsc-2-s2.binance.org:8545',
      accounts: [key],
    },
    hardhat: {
      chainId: 31337, // We set 1337 to make interacting with MetaMask simpler
    },
    localganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: accounts,
    },
  },
  etherscan: {
    apiKey: apiKey,
  },
  typechain: {
    outDir: './src/typechain',
  },
};

export default config;

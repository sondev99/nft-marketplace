import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import {
  NftABI,
  NFTAddress,
  NFTMarketplaceABI,
  NFTMarketplaceAddress,
} from './constance';

const fetchNftContract = (
  signerOrProvider: ethers.Signer | ethers.providers.Provider | undefined
) => new ethers.Contract(NFTAddress, NftABI, signerOrProvider);

const fetchMarketPlaceContract = (
  signerOrProvider: ethers.Signer | ethers.providers.Provider | undefined
) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

export const connectingWithNftSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchNftContract(signer);
    return contract;
  } catch (error) {
    console.log('Something went wrong while connecting with smart contract');
  }
};

export const connectingWithMarketplaceSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchMarketPlaceContract(signer);
    return contract;
  } catch (error) {
    console.log('Something went wrong while connecting with smart contract');
  }
};

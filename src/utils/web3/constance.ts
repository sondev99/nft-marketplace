import nftMarketplace from '@/contracts/NFTMarketplace.json';
import monoNft from '@/contracts/MonoNFT.json';
import contractAddress from '@/contracts/contract-address.json';

export const NFTMarketplaceAddress = contractAddress.marketplaceAddress;
export const NFTAddress = contractAddress.nftAddress;

export const NFTMarketplaceABI = nftMarketplace.abi;
export const NftABI = monoNft.abi;

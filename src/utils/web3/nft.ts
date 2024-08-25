import axios from 'axios';
import { BaseListReturn } from './marketplace';
import { useWeb3Store } from '@/store/web3Store';
import { ethers } from 'ethers';

export const getUserNFTs = async (
  _url: string,
  walletAddress: string,
  offset: number,
  limit: number
): Promise<BaseListReturn> => {
  const { nftContract } = useWeb3Store.getState();
  console.log(limit);

  const totalNfts = await nftContract!.balanceOf(walletAddress);

  if (totalNfts.toNumber() < offset)
    return {
      items: [],
      meta: {
        totalItem: 0,
        totalPage: 0,
      },
    };

  return {
    items: (
      await Promise.all(
        Array.from(Array(limit).keys()).map(async (i) => {
          if (i + offset >= totalNfts.toNumber()) return null;

          const nftId = (
            await nftContract!.tokenOfOwnerByIndex(walletAddress, i + offset)
          ).toNumber();

          const tokenURI = await nftContract!.tokenURI(nftId);

          return {
            ...(await axios.get(tokenURI)).data,
            tokenId: nftId,
          };
        })
      )
    ).filter((nft) => nft),
    meta: {
      totalItem: totalNfts.toNumber(),
      totalPage: Math.ceil(totalNfts.toNumber() / limit),
    },
  };
};

export const getNFTById = async (_url: string, tokenId: number) => {
  console.log(tokenId);
  const { nftContract } = useWeb3Store.getState();

  if (!nftContract) return null;

  const [tokenURI, owner, getApproved] = await Promise.all([
    nftContract.tokenURI(tokenId),
    nftContract.ownerOf(tokenId),
    nftContract.getApproved(tokenId),
  ]);

  return {
    ...(await axios.get(tokenURI)).data,
    tokenId,
    owner,
    getApproved,
  };
};

//-- UPLOAD TO IPFS
export const uploadToPinata = async (file: File) => {
  if (file) {
    try {
      const formData = new FormData();
      formData.append('file', file as Blob);
      const response = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          pinata_api_key: `23898613fcca0fe2cea4`,
          pinata_secret_api_key: `10514616330b599c40ebc5babece86b62bc5058c1f543a43f04758dd215e5ca4`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      return ImgHash;
    } catch (error) {
      console.log(error);
    }
  }
};

//-- CREATE NFT
export const createNft = async (
  name: string,
  image: any,
  description: string,
  category: string,
  nftContract: any
) => {
  if (!name || !description || !image || !category) {
    return console.log('Data is missing');
  }

  const data = JSON.stringify({ name, description, image, category });
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data: data,
      headers: {
        pinata_api_key: `23898613fcca0fe2cea4`,
        pinata_secret_api_key: `10514616330b599c40ebc5babece86b62bc5058c1f543a43f04758dd215e5ca4`,
        'Content-Type': 'application/json',
      },
    });
    const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    console.log('url: ' + url);
    return await createNFT(url, nftContract);
  } catch (error) {
    console.log('Error while creating NFT');
  }
};

const createNFT = async (url: string, nftContract: any) => {
  if (!window.ethereum || !nftContract) {
    return;
  }

  try {
    const signerProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signerSigner = signerProvider.getSigner();
    const connectNFTContract = nftContract.connect(signerSigner);

    await Promise.all([(await connectNFTContract?.mintToken(url)).wait()]);
  } catch (error: any) {
    console.log('Error while creating NFT');
  }
};

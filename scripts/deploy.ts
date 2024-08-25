// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

import { Contract } from 'ethers';
import { network, artifacts, ethers, hardhatArguments } from 'hardhat';
import path from 'path';
import fs from 'fs';
import { MonoNFT } from '@/typechain';

async function main() {
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev';

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    'Deploying the contracts with the account:',
    await deployer.getAddress()
  );

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory('MonoNFT');
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
  const Auction = await ethers.getContractFactory('Auction');

  // deploy marketplace contract
  const marketplaceContract = await NFTMarketplace.deploy(
    ethers.utils.parseEther('0.1')
  );
  await marketplaceContract.deployed();

  // deploy nft contract
  const nftContract = await Token.deploy(marketplaceContract.address);
  await nftContract.deployed();

  //deploy auction contract
  const auctionContract = await Auction.deploy(nftContract.address);
  await auctionContract.deployed();

  console.log('Token address:', nftContract.address);
  console.log('Marketplace address:', marketplaceContract.address);
  console.log('Aution address:', marketplaceContract.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles({
    marketplaceContract,
    marketplaceName: 'NFTMarketplace',
    nftContract,
    nftName: 'MonoNFT',
    auctionContract,
    auctionName: 'Auction',
  });
}

function saveFrontendFiles({
  nftContract,
  marketplaceContract,
  nftName,
  marketplaceName,
  auctionContract,
  auctionName,
}: {
  nftContract: Contract;
  marketplaceContract: Contract;
  nftName: string;
  marketplaceName: string;
  auctionContract: Contract;
  auctionName: string;
}) {
  const contractsDir = path.join(__dirname, '..', 'src', 'contracts');

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, 'contract-address.json'),
    JSON.stringify(
      {
        nftAddress: nftContract.address,
        marketplaceAddress: marketplaceContract.address,
        auctionAddress: auctionContract.address,
      },
      undefined,
      2
    )
  );

  const TokenArtifact = artifacts.readArtifactSync(nftName);
  const MarketplaceArtifact = artifacts.readArtifactSync(marketplaceName);
  const AutionArtifact = artifacts.readArtifactSync(auctionName);

  fs.writeFileSync(
    path.join(contractsDir, nftName + '.json'),
    JSON.stringify(TokenArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, marketplaceName + '.json'),
    JSON.stringify(MarketplaceArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, auctionName + '.json'),
    JSON.stringify(AutionArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

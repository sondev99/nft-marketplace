'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import Head from 'next/head';
import {
  IoArrowBack,
  IoArrowBackCircle,
  IoArrowUpCircle,
  IoHome,
} from 'react-icons/io5';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import { useWeb3Store } from '@/store/web3Store';
import BackButton from '@/components/Button/BackButton';
import Button, { ButtonPreset } from '@/components/Button/Button';
import Loading from '@/components/Loading';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import NullData from '@/components/NullData';
import Image from 'next/image';
import { CategoryIcon } from '@/icon';
import { FaRegHeart } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { CiMenuKebab } from 'react-icons/ci';
import Link from 'next/link';
import images from '@/img';
import routes from '@/routes';
import { truncateText } from '@/utils/truncatText';
import { getMarketplaceNFTById } from '@/utils/web3/marketplace';
import transactionApi from '@/apis/transactionApi';
import { TransactionRequest } from '@/type/transactions';
import moment from 'moment';
import { useUser } from '@/store/useUser';
import axios from 'axios';
import { formatPrice } from '@/lib/formatPrice';

type PageProps = {
  id: number;
};

function NftDetailPage({ params }: { params: PageProps }) {
  const now = moment();
  const router = useRouter();
  const id = params.id;
  const GET_MARKET_NFT = 'getMarketNFT';

  const { isInit, marketplaceContract, walletAddress } = useWeb3Store();

  const { userInfo } = useUser();

  const { data: nftData, isValidating } = useSWR(
    isInit && [GET_MARKET_NFT, id],
    ([GET_MARKET_NFT, id]) => getMarketplaceNFTById(GET_MARKET_NFT, id)
  );

  console.log(nftData);

  const { data: ethPrice } = useSWR(isInit && ['getEthPrice'], () =>
    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      )
      .then((res) => res.data.ethereum.usd)
  );

  const onBuyClicked = async () => {
    if (!nftData || !marketplaceContract) {
      toast.error('NFT not found, please try again later');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    if (!signer) return;

    toast.promise(
      marketplaceContract
        .connect(signer)
        .buyItem(parseInt(id as unknown as string), {
          value: ethers.utils.parseEther(nftData.price),
        })
        .then((res: any) => res.wait()),
      {
        loading: 'Buying NFT...',
        success: () => {
          const transactionRequset: TransactionRequest = {
            nftId: nftData.tokenId.toNumber(),
            quantity: 1,
            price: ethPrice * nftData.price,
            walletAddress: walletAddress,
            userId: userInfo?.id,
          };
          transactionApi.createTransaction(transactionRequset);
          router.push(`/my-nft/${nftData.tokenId}`);
          return `NFT id ${nftData.tokenId} bought successfully`;
        },
        error: (e) => {
          return e.reason || e.message || 'Error buying NFT';
        },
      }
    );
  };

  return (
    <MaxWidthWrapper>
      <Head>
        <title>{nftData?.name || 'Loading...'}</title>
      </Head>
      <div className="sticky top-10 left-20 my-3">
        <BackButton />
      </div>
      {(nftData && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          <div className="space-y-8 lg:space-y-10">
            <div className="relative">
              <div
                className="nc-NcImage aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
                data-nc-id="NcImage"
              >
                <Image
                  fill
                  src={nftData?.image || ''}
                  className="object-cover w-full h-full"
                  alt="nc-imgs"
                />
              </div>
              <div className="bg-black/50  flex items-center justify-center rounded-full text-white absolute left-3 top-3  w-8 h-8 md:w-10 md:h-10">
                <CategoryIcon />
              </div>
              <button className="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white absolute right-3 top-3 ">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <FaRegHeart size={20} />
                </svg>
                <span className="ml-2 text-sm">22</span>
              </button>
            </div>
            <div className="w-full rounded-2xl">
              <div className="mt-5 md:mt-8">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75"
                  id="headlessui-disclosure-button-:r1a:"
                  type="button"
                  aria-expanded="true"
                  aria-controls="headlessui-disclosure-panel-:r1b:"
                >
                  <span>Details</span>
                  <IoIosArrowDown />
                </button>
                <div
                  className="px-4 pt-4 pb-2 flex flex-col text-xs text-neutral-500 dark:text-neutral-400 overflow-hidden"
                  id="headlessui-disclosure-panel-:r1b:"
                >
                  <span>2000 x 2000 px.IMAGE(685KB)</span>
                  <br />
                  <div>
                    <span className="font-bold text-base">
                      Contract Address: {marketplaceContract?.address}
                    </span>
                  </div>
                  <br />
                  <div>
                    <span className="font-bold text-base">Token ID: </span>
                    <span className="text-base font-bold">
                      {nftData?.tokenId.toNumber()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              <div className="pb-9 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-green-800 bg-green-100  ">
                    Virtual Worlds
                  </span>
                  <CiMenuKebab />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  {nftData?.name}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
                  <div className="flex items-center ">
                    <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-9 w-9 ring-1 ring-white dark:ring-neutral-900">
                      <Image
                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                        src={images.user1}
                        alt="John Doe"
                      />
                      <span className="wil-avatar__name">J</span>
                    </div>
                    <Link
                      href={{
                        pathname: routes.author,
                        query: `${nftData?.seller}`,
                      }}
                    >
                      <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                        <span className="text-sm">Creator</span>
                        <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                          <span>{truncateText(nftData?.seller)}</span>
                          <span className="ml-1">
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 17 17"
                              fill="none"
                            >
                              <path
                                d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                                fill="#38BDF8"
                                stroke="#38BDF8"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <button
                className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75"
                id="headlessui-disclosure-button-:r18:"
                type="button"
                aria-expanded="true"
                aria-controls="headlessui-disclosure-panel-:r19:"
              >
                <span>Descriptions</span>
                <IoIosArrowDown />
              </button>
              <p
                className="px-4 pt-4 pb-2 text-neutral-500 text-sm dark:text-neutral-400"
                id="headlessui-disclosure-panel-:r19:"
              >
                {nftData?.description}
              </p>
              <div className="pb-9 pt-6">
                <div className="flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative">
                  <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                    Price
                  </span>
                  <span className="text-3xl xl:text-4xl font-semibold text-green-500">
                    {nftData.price} ETH
                  </span>
                  <span className="text-lg text-neutral-400 sm:ml-5">
                    ( ≈ {formatPrice(nftData.price * ethPrice)})
                  </span>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  {walletAddress === nftData.seller ? (
                    <p className="w-full">You can't buy your own NFT</p>
                  ) : (
                    <Button
                      onClick={onBuyClicked}
                      preset={
                        nftData.isSold
                          ? ButtonPreset.Disabled
                          : ButtonPreset.Fill
                      }
                    >
                      <span>{nftData.isSold ? 'Sold' : 'Buy'}</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )) ||
        (isValidating && <Loading />) ||
        (!isValidating && !nftData && <NullData title="NFT Not Found" />)}
    </MaxWidthWrapper>
  );
}

export default NftDetailPage;

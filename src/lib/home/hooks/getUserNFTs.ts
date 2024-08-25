import { useCallback } from 'react';
import useSWR from 'swr';
import { getUserNFTs } from '@/utils/web3/nft';
import { useWeb3Store } from '@/store/web3Store';

export const GET_USER_NFTS_KEY = 'getUserNFTs';
export const GET_TOTAL_PAGE_KEY = 'getTotalPage';

export type UseGetUserNFTsProps = {
  limit: number;
  offset: number;
  walletAddress: string | null;
};

export const useGetUserNFTs = ({
  limit,
  offset,
  walletAddress,
}: UseGetUserNFTsProps) => {
  const { isInit } = useWeb3Store();

  const nfts = useSWR(
    isInit &&
      walletAddress && [GET_USER_NFTS_KEY, walletAddress, offset, limit],
    ([GET_USER_NFTS_KEY, walletAddress, offset, limit]) =>
      getUserNFTs(GET_USER_NFTS_KEY, walletAddress, offset, limit)
  );

  return { nfts };
};

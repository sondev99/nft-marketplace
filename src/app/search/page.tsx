'use client';
import Image from 'next/image';

import Filter from '@/components/Filter';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/Input/SearchBar';
import images from '@/img';
import { useWeb3Store } from '@/store/web3Store';
import useSWR from 'swr';
import { getMarketplaceNFTs } from '@/utils/web3/marketplace';
import axios from 'axios';
import Card from '@/components/Card/Card';
import CardShimmer from '@/components/Card/CardShimmer';
import ReactPaginate from 'react-paginate';
import Fuse from 'fuse.js';

type SearchPageProps = {};

const SearchPage = (props: SearchPageProps) => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || '');

  console.log(encodedSearchQuery);

  if (!encodedSearchQuery) {
    router.push('/');
  }
  const GET_MARKET_PLACE_NFT = 'getMarketplaceNFTs';

  const { isInit } = useWeb3Store();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(8);
  const { data: marketplaceData, isValidating } = useSWR(
    isInit && [GET_MARKET_PLACE_NFT, offset, limit],
    ([GET_MARKET_PLACE_NFT, offset, limit]) =>
      getMarketplaceNFTs(GET_MARKET_PLACE_NFT, offset, limit)
  );

  const { data: ethPrice } = useSWR(isInit && ['getEthPrice'], () =>
    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      )
      .then((res) => res.data.ethereum.usd)
  );
  const handlePageClick = ({ selected }: { selected: number }) => {
    setOffset(Math.ceil(selected * limit));
  };

  const options = {
    includeScore: true, // Bao gồm điểm số của mỗi kết quả trong kết quả trả về
    threshold: 0.3, // Độ chính xác (0.0 là chính xác hoàn toàn, 1.0 là không chính xác)
    keys: ['name'], // Trường mà bạn muốn tìm kiếm gần đúng (ở đây là 'name')
  };

  const fuse = new Fuse(marketplaceData?.items || [], options);
  let searchNftData = fuse
    .search(encodedSearchQuery)
    .map((result) => result.item);

  console.log(searchNftData);

  return (
    <MaxWidthWrapper>
      <section>
        <h2 className="text-2xl font-bold my-3">Marketplace NFT</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {searchNftData?.map((value, index) => (
            <Card
              key={index}
              imageUrl={value.image}
              url={`/nft/${value.marketplaceItemIndex}`}
              name={value.name}
              price={value.price}
              ethPrice={ethPrice}
              isSold={value.isSold}
            />
          )) ||
            (isValidating &&
              [...Array(limit)].map((value, index) => (
                <CardShimmer key={index} />
              )))}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={marketplaceData?.meta?.totalPage || 0}
          previousLabel="< prev"
          containerClassName="flex justify-center items-center space-x-2 mt-4"
          activeClassName="bg-[#202938] text-white p-2 rounded"
          pageClassName="bg-gray-300 p-2 aspect-square w-10 text-center rounded font-semibold text-white"
          previousClassName="text-white bg-[#0479B7] p-2 text-center rounded font-semibold"
          nextClassName="text-white bg-[#0479B7] p-2 text-center rounded font-semibold"
          pageLinkClassName="block"
        />{' '}
        <div className="h-12"></div>
      </section>
    </MaxWidthWrapper>
  );
};

export default SearchPage;

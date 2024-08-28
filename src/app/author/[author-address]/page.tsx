"use client";

import { useEffect, useState } from "react";

//INTENAL IMPORT
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AuthorInfor from "../component/AuthorInfor";
import AuthorNFTCardBox from "../component/AuthorNFTCardBox";
import AuthorTaps from "../component/AuthorTaps";
import userApi from "@/apis/userApi";
import { usePathname } from "next/navigation";
import { useWeb3Store } from "@/store/web3Store";
import useSWR from "swr";
import { getMarketplaceNFTs } from "@/utils/web3/marketplace";
import axios from "axios";
import ReactPaginate from "react-paginate";
import CardShimmer from "@/components/Card/CardShimmer";
import Card from "@/components/Card/Card";

const authorPage = () => {
  const path = usePathname();
  const [user, setUser] = useState<UserInfo>();
  const parts = path.split("/");
  const address = parts[2];
  const GET_MARKET_PLACE_NFT = "getMarketplaceNFTs";

  const { isInit } = useWeb3Store();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(8);
  const { data: marketplaceData, isValidating } = useSWR(
    isInit && [GET_MARKET_PLACE_NFT, offset, limit],
    ([GET_MARKET_PLACE_NFT, offset, limit]) =>
      getMarketplaceNFTs(GET_MARKET_PLACE_NFT, offset, limit)
  );

  const { data: ethPrice } = useSWR(isInit && ["getEthPrice"], () =>
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
      .then((res) => res.data.ethereum.usd)
  );
  const handlePageClick = ({ selected }: { selected: number }) => {
    setOffset(Math.ceil(selected * limit));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.getByWalletAddress(address);
        if (response.code === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="relative w-full h-40 md:h-60 2xl:h-72">
        <div className="nc-NcImage absolute inset-0" data-nc-id="NcImage">
          <img
            src="https://chisnghiax.com/ciscryp/static/media/authorBanner.ebee7e43db5be48a5283.png"
            className="object-cover w-full h-full"
            alt="nc-imgs"
          />
        </div>
      </div>
      <MaxWidthWrapper className="-mt-10 lg:-mt-16">
        <AuthorInfor
          name={`${user?.firstName} ${user?.lastName}`}
          walletAddress={user?.walletAddress}
        />
        <section>
          <h2 className="text-2xl font-bold my-3"> NFT</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {marketplaceData?.items?.map((value, index) => (
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
          />{" "}
          <div className="h-12"></div>
        </section>
      </MaxWidthWrapper>
    </>
  );
};

export default authorPage;

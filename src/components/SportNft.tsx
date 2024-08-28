import { useWeb3Store } from "@/store/web3Store";
import axios from "axios";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import Card from "./Card/Card";
import CardShimmer from "./Card/CardShimmer";
import { getMarketplaceNFTs } from "@/utils/web3/marketplace";
import NullData from "./NullData";

export const SportNft = () => {
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

  const sportNFT = marketplaceData?.items
    .filter((item) => item.category === "Sports")
    .slice(0, 4);
  return (
    <section>
      <h2 className="text-2xl font-bold my-3">Sport NFT</h2>
      {sportNFT && sportNFT?.length === 0 ? (
        <NullData title="No Sports NFT" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sportNFT?.map((value, index) => (
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
      )}
    </section>
  );
};

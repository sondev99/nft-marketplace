// import { useWeb3Store } from '@/store/web3Store';
// import { getMarketplaceNFTs } from '@/utils/marketplace';
// import axios from 'axios';
// import { useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import useSWR from 'swr';
// import Card from './Card/Card';
// import CardShimmer from './Card/CardShimmer';

// export const NFTAuction = () => {
//   const GET_AUCTION_NFT = 'getAuctionNft';

//   const { isInit, auctionContract } = useWeb3Store();
//   const [offset, setOffset] = useState(0);
//   const [limit, setLimit] = useState(8);

//   const { data: ethPrice } = useSWR(isInit && ['getEthPrice'], () =>
//     axios
//       .get(
//         'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
//       )
//       .then((res) => res.data.ethereum.usd)
//   );

//   return (
//     <section>
//       <h2 className="text-2xl font-bold my-3">Live Auctions</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {auctionData?.items.map((value, index) => (
//           <Card
//             key={index}
//             imageUrl={value.image}
//             url={`/nft/${value.marketplaceItemIndex}`}
//             name={value.name}
//             price={value.price}
//             ethPrice={ethPrice}
//             isSold={value.isSold}
//           />
//         )) ||
//           (isValidating &&
//             [...Array(limit)].map((value, index) => (
//               <CardShimmer key={index} />
//             )))}
//       </div>
//     </section>
//   );
// };

'use client';

import ProductReel from '@/components/ProductReel';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { HeroSections } from '@/components/Hero';
import { SubcribeSection } from '@/components/SubcribeSection';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/context/app-context';

// interface ProductReel {
//   title: string;
//   href?: string;
//   products?: ProductResponse[] | undefined;
// }

export default function Home() {
  // const baseCatListRes = await getBaseCategoryAction();

  // const productReels: ProductReel[] = baseCatListRes.data.map(
  //   (category: Category) => {
  //     return {
  //       title: category.name,
  //       href: `category/${category.name}?id=${category.id}`,
  //       products: category.products,
  //     };
  //   }
  // );
  // const productReels: ProductReel[] = [
  //   {
  //     title: 'Arts',
  //     // href: `category/${category.name}?id=${category.id}`,
  //     href: `category/Arts`,
  //     products: undefined,
  //   },
  // ];

  const [nfts, setNfts] = useState([]);
  const { fetchNFTs } = useContext(AppContext);

  useEffect(() => {
    //@ts-ignore
    fetchNFTs().then((item) => {
      console.log('jdofijg');
      setNfts(item);
      // setNftsCopy(item);
    });
    // const fetchNfts = async () => {
    //   try {
    //     const response = await fetchNFTs();
    //     setNfts(response);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
  }, []);
  console.log(nfts);

  return (
    <>
      <MaxWidthWrapper>
        <HeroSections />
        {/* {productReels.map((item) => (
          <ProductReel
            key={item.title}
            title={item.title}
            href={item.href}
            products={item.products}
          />
        ))} */}
        <ProductReel
          key="All Nfts"
          title="All Nfts"
          // href={item.href}
          nfts={nfts}
        />
        <SubcribeSection />
      </MaxWidthWrapper>
    </>
  );
}

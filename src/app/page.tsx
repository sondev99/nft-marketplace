'use client';

import { HeroSections } from '@/components/Hero';
import { MarketplaceNFTs } from '@/components/MarketplaceNFTs';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { SubcribeSection } from '@/components/SubcribeSection';
import { useUser } from '@/store/useUser';
import { useEffect, useState } from 'react';

export default function Home() {
  const [nfts, setNfts] = useState([]);

  const { getCurrentUser } = useUser();

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <>
      <MaxWidthWrapper>
        <HeroSections />
        <MarketplaceNFTs />
        {/* <NFTAuction /> */}
        <SubcribeSection />
      </MaxWidthWrapper>
    </>
  );
}

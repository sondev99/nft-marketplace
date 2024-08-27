'use client';

import { AnimeNft } from '@/components/AnimeNft';
import { ArtNft } from '@/components/ArtNft';
import { GamingNft } from '@/components/GamingNft';
import { HeroSections } from '@/components/Hero';
import { MarketplaceNFTs } from '@/components/MarketplaceNFTs';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { SportNft } from '@/components/SportNft';
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
        <SportNft />
        <GamingNft />
        <AnimeNft />
        <ArtNft />
        <SubcribeSection />
      </MaxWidthWrapper>
    </>
  );
}

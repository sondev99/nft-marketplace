'use client';

import { usePathname } from 'next/navigation';
import NavItems from './NavItems';
import MaxWidthWrapper from '../MaxWidthWrapper';
import NavItem from './NavItem';
import { MdHome, MdOutlineSportsFootball } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';
import { GiJapaneseBridge } from 'react-icons/gi';

import { FaArtstation } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <MaxWidthWrapper>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/">
            <NavItem label="All" icon={MdHome} selected={pathname === '/'} />
          </Link>
          <Link href="/category/sports">
            <NavItem
              label="Sports"
              icon={MdOutlineSportsFootball}
              selected={pathname === '/category/sports'}
            />
          </Link>
          <Link href="/category/gaming">
            <NavItem
              label="Gaming"
              icon={IoGameController}
              selected={pathname === '/category/gaming'}
            />
          </Link>
          <Link href="/category/arts">
            <NavItem
              label="Arts"
              icon={FaArtstation}
              selected={pathname === '/category/arts'}
            />
          </Link>
          <Link href="/category/anime">
            <NavItem
              label="Anime"
              icon={GiJapaneseBridge}
              selected={pathname === '/category/anime'}
            />
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;

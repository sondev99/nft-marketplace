'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Navigation } from './Header';
import NavItem from './NavItem';
interface NavbarItemProps {
  categories: Category[];
}

const NavItems = ({ categories }: NavbarItemProps) => {
  return (
    <div className=" flex flex-row items-center justify-center overflow-x-auto gap-3">
      {categories?.map((item) => (
        <NavItem category={item} key={item.label} />
      ))}
    </div>
  );
};

export default NavItems;

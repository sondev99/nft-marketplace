'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Navigation } from './Header';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface NavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

const NavItem = ({ selected, icon: Icon, label }: NavItemProps) => {
  return (
    <div
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? 'border-b-slate-800 text-slate-800 dark:text-slate-100'
          : 'border-transparent text-slate-500 dark:text-slate-600'
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
};

export default NavItem;

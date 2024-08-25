'use client';

import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Link from 'next/link';
import AdminNavItem from './AdminNavItem';
import { MdDashboard } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <MaxWidthWrapper>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathname === '/admin'}
            />
          </Link>
          <Link href="/admin/user-management">
            <AdminNavItem
              label="User"
              icon={FaUser}
              selected={pathname === '/admin/user-management'}
            />
          </Link>
          <Link href="/admin/transaction-management">
            <AdminNavItem
              label="Transaction"
              icon={GrTransaction}
              selected={pathname === '/admin/transaction-management'}
            />
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AdminNav;

import AdminNav from '@/components/Admin/AdminNav';
import Navbar from '@/components/Header/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper>
      <AdminNav />
      {children}
    </MaxWidthWrapper>
  );
};

export default AdminLayout;

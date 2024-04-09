import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import ManageOrdersClient from './ManageOrdersClient';

const ManageOrders = () => {
  return (
    <div className="pt-8">
      <MaxWidthWrapper>
        <ManageOrdersClient />
      </MaxWidthWrapper>
    </div>
  );
};

export default ManageOrders;

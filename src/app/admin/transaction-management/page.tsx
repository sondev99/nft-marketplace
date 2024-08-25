'use client';

import transactionApi from '@/apis/transactionApi';
import NullData from '@/components/NullData';
import { DataTable } from '@/components/Table';
import { TransactionDto } from '@/type/transactions';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nftId',
    headerName: 'NftId',
    width: 50,
    type: 'number',
  },
  {
    field: 'quantity',
    type: 'number',
    headerName: 'Quantity',
    width: 80,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Price ($)',
    width: 100,
  },
  {
    field: 'transactionDate',
    type: 'string',
    headerName: 'Date',
    width: 100,
  },
  {
    field: 'walletAddress',
    type: 'string',
    headerName: 'Wallet Address',
    width: 150,
  },
  {
    field: 'userId',
    headerName: 'User Id',
    width: 150,
    type: 'string',
  },
];
const TransactionManagement = () => {
  const [data, setData] = useState<TransactionDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await transactionApi.getAllTransaction();
        if (response.code === 200) {
          setIsLoading(false);

          setData(response.data);

          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="">
        <h1 className="text-primary flex-1 text-center lg:text-left text-4xl font-bold rounded-lg !py-5 md:!py-[26px] lg:!py-5">
          Transaction Management
        </h1>
      </div>
      <div className="flex flex-col-reverse gap-4  md:flex-col lg:flex-row lg:justify-between p-5 pt-0">
        <div className="flex flex-col gap-3">{/* <AddBannerDialog /> */}</div>
      </div>
      <div className="flex flex-col flex-1 p-5 text-primary">
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
          {/* <Text>
                Category:{' '}
                <Text weight={'bold'}>
                  All <Text weight={'light'}>({data ? data.length : 0})</Text>
                </Text>
              </Text> */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* <ListBoxs /> */}
          </div>
        </div>
        <div className="mt-5 rounded-xl">
          {data.length === 0 && !isLoading ? (
            <NullData title="DON'T HAVE TRANSACTION USER YET" />
          ) : (
            <DataTable slug="transactiion" columns={columns} rows={data} />
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionManagement;

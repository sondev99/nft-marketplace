'use client';

import summaryApi from '@/apis/summaryApi';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { formatNumber } from '@/lib/formatNumber';
import { formatPrice } from '@/lib/formatPrice';
import React, { useEffect, useState } from 'react';
import BarGraph from './BarGraph';

type SummaryDataType = {
  [key: string]: {
    lable: string;
    digit: number;
  };
};

const SummaryPage = () => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    users: {
      lable: 'Total Users',
      digit: 0,
    },
    transaction: {
      lable: 'Total Transactions',
      digit: 0,
    },
    totalTradingVolume: {
      lable: 'Trading Volume',
      digit: 0,
    },
    totalNft: {
      lable: 'Total Nft sold',
      digit: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await summaryApi.getSummary();
        if (response.code === 200) {
          const sumaryData = {
            users: {
              lable: 'Total Users',
              digit: response.data.totalUser,
            },
            transaction: {
              lable: 'Total Transactions',
              digit: response.data.totalTransaction,
            },
            traidingVolume: {
              lable: 'Trading Volume',
              digit: response.data.totalTradingVolume,
            },
            totalNftSold: {
              lable: 'Total Nft Sold',
              digit: response.data.totalNft,
            },
          };

          setSummaryData(sumaryData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const summaryKeys = Object.keys(summaryData);

  return (
    <>
      <div className="py-5 text-center font-bold text-lg">
        <h1>Summary</h1>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
          {summaryKeys &&
            summaryKeys.map((key) => {
              return (
                <div
                  key={key}
                  className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
                >
                  <div className="text-xl md:text-4xl font-bold">
                    {summaryData[key].lable === 'Trading Volume' ? (
                      <div>{formatPrice(summaryData[key].digit) || '$0'}</div>
                    ) : (
                      <>{formatNumber(summaryData[key].digit || 0)}</>
                    )}
                  </div>
                  <div className="font-medium">{summaryData[key].lable}</div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mt-4 mx-auto ">
        <BarGraph />
      </div>
    </>
  );
};

export default SummaryPage;

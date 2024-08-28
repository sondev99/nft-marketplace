'use client';

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import summaryApi from '@/apis/summaryApi';
import { fakeData1 } from '@/data';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
  data: GrapData[];
}

type GrapData = {
  dayOfWeek: string;
  date: string;
  volume: number;
};

const ChartPrice = () => {
  const labels = fakeData1?.map((item) => item.dayOfWeek);

  const amounts = fakeData1?.map((item) => item.price);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Trading Volume',
        data: amounts,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWith: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.5)', // Custom color for x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(100, 100, 100, 0.5)', // Custom color for y-axis grid lines
        },
      },
    },
  };
  return <Bar data={chartData} options={options}></Bar>;
};

export default ChartPrice;

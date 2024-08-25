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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
  data: GrapData[];
}

type GrapData = {
  dayOfWeek: string;
  date: string;
  volume: number;
};

const BarGraph = () => {
  const [data, setData] = useState<GrapData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await summaryApi.getTradingVolume7Day();
        if (response.code === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  const labels = data?.map((item) => item.dayOfWeek);

  const amounts = data?.map((item) => item.volume);

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
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={chartData} options={options}></Bar>;
};

export default BarGraph;

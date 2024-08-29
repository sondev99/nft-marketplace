"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import summaryApi from "@/apis/summaryApi";
import { fakeData1 } from "@/data";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
  data?: GrapData[];
  id: number;
}

type GrapData = {
  dayOfWeek: string;
  date: string;
  volume: number;
};

const ChartPrice = ({ id }: BarGraphProps) => {
  const [data, setData] = useState<GrapData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await summaryApi.getChart5Day(id);
        if (response.code === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const labels = data?.map((item) => item.dayOfWeek);

  const amounts = data?.map((item) => item.volume);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Trading Price",
        data: amounts,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWith: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.5)", // Custom color for x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(100, 100, 100, 0.5)", // Custom color for y-axis grid lines
        },
      },
    },
  };
  return (
    <>
      <div className="my-3 text-lg font-bold">Price History</div>
      <Bar className="w-full h-full" data={chartData} options={options}></Bar>
    </>
  );
};

export default ChartPrice;

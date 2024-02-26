import React from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  BarController,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

function DataChart({chart_Data}) {

  ChartJS.register(
    BarController,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
  );
  const chartData = chart_Data ? chart_Data :[
    
      {
          "id": 36,
          "Cá_nhân_trong_nước": -9,
          "Tổ_chức_trong_nước": 9,
          "Tự_doanh": 9,
          "Nước_ngoài": -9,
          "created_at": "2024-02-23T12:29:47.000000Z",
          "updated_at": "2024-02-23T12:29:47.000000Z"
      },
      {
          "id": 29,
          "Cá_nhân_trong_nước": 2,
          "Tổ_chức_trong_nước": 2,
          "Tự_doanh": 2,
          "Nước_ngoài": 2,
          "created_at": "2024-02-23T12:29:47.000000Z",
          "updated_at": "2024-02-23T12:29:47.000000Z"
      }
  ]

  const data = {
    labels: chartData.map((data) => data.created_at),
    datasets: [
      {
        label: "Cá_nhân_trong_nước",
        data: chartData.map((data) => data.Cá_nhân_trong_nước),
        backgroundColor:["#1868C6"]
      },
      {
        label: "Nước_ngoài",
        data: chartData.map((data) => data.Nước_ngoài),
        backgroundColor:["#B9D0FA"]
      },
      {
        label: "Tổ_chức_trong_nước",
        data: chartData.map((data) => data.Tổ_chức_trong_nước),
        backgroundColor:["#F6D6AA"]
      },
      {
        label: "Tự_doanh",
        data: chartData.map((data) => data.Tự_doanh),
        backgroundColor:["#F08707"]
      },
    ],
  };

  return (
    <div>
      <Chart type="bar" data={data} />
    </div>
  );
}

export default DataChart;

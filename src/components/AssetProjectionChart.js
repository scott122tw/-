import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AssetProjectionChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: '資產成長預測 (單位：萬元)',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} 萬元`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '金額 (萬元)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          callback: function(value) {
            return value + ' 萬';
          }
        }
      },
      x: {
        title: {
          display: true,
          text: '年度',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      }
    },
  };

  return (
    <div style={{ height: '400px', width: '100%', padding: '20px' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default AssetProjectionChart;

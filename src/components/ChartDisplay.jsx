import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const ChartDisplay = ({ chartData }) => {
  if (!chartData) return (
    <div className="container mt-4">
      <div className="alert alert-info">No chart data available</div>
    </div>
  )

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Data Visualization',
        font: {
          size: 18
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white">
        <h5 className="card-title mb-0 text-black text-muted">Data Chart</h5>
        </div>
        <div className="card-body">
          <div className="chart-container" style={{ position: 'relative', height: '400px' }}>
            <Bar data={chartData} options={options} />
          </div>
        </div>
        <div className="card-footer bg-white text-muted">
          <small>Hover over points for details</small>
        </div>
      </div>
    </div>
  )
}

export default ChartDisplay
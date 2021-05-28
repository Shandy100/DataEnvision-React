import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import content from "./wind.json";

const BarChart = () => {
    const [ data, setData ] = useState({labels: [], datasets: []});
    useEffect(() => {
        const labels = content.map(({t}) => t);
        const datasets = [
            {
                label: 'WindSpeed(Kmh)',
                data: content.map(({w}) => w),
                borderColor: ['rgba(255, 206, 86, 0.2)'],
                backgroundColor: ['blue'],
                pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
                pointBorderColor: 'rgba(255, 206, 86, 0.2)'
            },
            
        ]

        setData({labels, datasets})
    }, [])

  const options = {
    title: {
      display: true,
      text: 'Line Chart'
    },
    scales: {
      xAxes: [
          {
              type: "time"
          }
      ]
    }
  }

  return <Bar data={data} options={options} />
}

export default BarChart;
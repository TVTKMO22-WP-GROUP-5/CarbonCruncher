import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js';

const Visualization1 = () => {
  const [monthly, setMonthly] = useState(false);
  const [globalData, setGlobalData] = useState([]);
  const [nhData, setNhData] = useState([]);
  const [shData, setShData] = useState([]);
  const [years, setYears] = useState([]);

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://carbon-cruncher.azurewebsites.net/api/visu1/${
        monthly ? 'monthly' : 'annual'
      }`;
      const response = await fetch(url);
      const data = await response.json();

      setGlobalData(data.global);
      setNhData(data.nh);
      setShData(data.sh);
      setYears(data.years);
    };

    fetchData();
  }, [monthly]);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Global',
            data: globalData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Northern Hemisphere',
            data: nhData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Southern Hemisphere',
            data: shData,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Year',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Temperature Anomaly (°C)',
              },
            },
          ],
        },
      },
    });
  }, [globalData, nhData, shData, years]);

  return (
    <div>
      <canvas ref={chartRef} />
      <div>
        <button onClick={() => setMonthly(true)}>Monthly</button>
        <button onClick={() => setMonthly(false)}>Annual</button>
      </div>
      <p>
        Data source:{' '}
        <a href="https://carbon-cruncher.azurewebsites.net/api/visu1/annual">
          https://carbon-cruncher.azurewebsites.net/api/visu1/annual
        </a>
      </p>
    </div>
  );
};

export default Visualization1;

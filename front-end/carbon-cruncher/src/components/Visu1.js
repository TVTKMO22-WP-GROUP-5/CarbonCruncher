// Import the necessary libraries and components
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

(async () => {
  const dateAdapter = await import('chartjs-adapter-date-fns');
  Chart.register(dateAdapter.default);
})();

// Create the component
const Visu1 = () => {
  const [data, setData] = useState(null);
  const [timePeriod, setTimePeriod] = useState('monthly');

  // Fetch temperature data from the provided API endpoints for the selected time period (monthly or yearly)
  const fetchData = async (period) => {
    const response = await fetch(`https://carbon-cruncher.azurewebsites.net/api/visu1/${period}`);
    const responseData = await response.json();

    const parsedData = {
      years: responseData.map((item) => new Date(item.timeYear, 0)),
      global: responseData.map((item) => ({ x: new Date(item.timeYear, 0), y: item.anomalyGlobal })),
      northernHemisphere: responseData.map((item) => ({ x: new Date(item.timeYear, 0), y: item.anomalyNorthern })),
      southernHemisphere: responseData.map((item) => ({ x: new Date(item.timeYear, 0), y: item.anomalySouthern })),
      reconstruction: responseData.map((item) => ({ x: new Date(item.timeYear, 0), y: item.tempReconstruction })),
      startYear: responseData[0]?.timeYear,
      endYear: responseData[responseData.length - 1]?.timeYear,
    };

    setData(parsedData);
  };

  // Fetch data when the component mounts or time period changes
  useEffect(() => {
    fetchData(timePeriod);
  }, [timePeriod]);

  const handleChange = (event) => {
    setTimePeriod(event.target.value);
  };

  // Create the chart
  const chartData = {
    datasets: [
      {
        label: 'Global (NH+SH)/2',
        data: data?.global,
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Northern Hemisphere',
        data: data?.northernHemisphere,
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Southern Hemisphere',
        data: data?.southernHemisphere,
        borderColor: 'orange',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Northern Hemisphere 2,000-year temperature reconstruction',
        data: data?.reconstruction,
        borderColor: 'blue',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  // Set the chart options
  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year',
        },
        min: data?.startYear ? `${data.startYear}-01-01` : undefined,
        max: data?.endYear ? `${data.endYear}-12-31` : undefined,
        title: {
          display: true,
          text: 'Years',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature Anomaly (°C)',
        },
      },
    },
  };
  return (
    // Render the chart
    <div>
      <h2>Global Historical Surface Temperature Anomalies</h2>
      <p>from January 1850 onwards</p>
      <p>
        Data source: <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" target="_blank" rel="noopener noreferrer">HadCRUT5</a>
      </p>
      <div>
        <input type="radio" id="monthly" name="timePeriod" value="monthly" checked={timePeriod === 'monthly'} onChange={handleChange} />
        <label htmlFor="monthly">Monthly</label>
        <input type="radio" id="annual" name="timePeriod" value="annual" checked={timePeriod === 'annual'} onChange={handleChange} />
        <label htmlFor="annual">Annual</label>
      </div>
      <p>
        This chart displays global historical surface temperature anomalies from January 1850 onwards, including the
        HadCRUT5 dataset and the 2,000-year Northern Hemisphere temperature reconstruction by Moberg et al. (2005). The
        study describing the data measurement for the Moberg dataset can be found{' '}
        <a href="https://www.nature.com/articles/nature03265" target="_blank" rel="noopener noreferrer">here</a>.
      </p>
      {data ? <Line data={chartData} options={chartOptions} /> : <p>Loading data...</p>}
    </div>
  );
}
export default Visu1
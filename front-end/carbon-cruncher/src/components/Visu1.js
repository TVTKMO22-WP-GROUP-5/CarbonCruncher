// This file contains the code for the first visualization component. The component fetches the data from the API endpoints and renders the chart using the react-chartjs-2 library. The component also contains the logic for the time period selection and the checkbox for the 2,000-year temperature reconstruction. The data parsing function is implemented in the fetch
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
// Import the data parsing function from the utils folder
const Visualization1 = () => {
  const [data, setData] = useState(null);
  const [mobergData, setMobergData] = useState(null);
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [showReconstruction, setShowReconstruction] = useState(false);

  // Fetch temperature data from the provided API endpoints for the selected time period (monthly or yearly)
  const fetchData = async (period) => {
    const response = await fetch(`https://carbon-cruncher.azurewebsites.net/api/visu1/${period}`);
    const data = await response.json();
    // Parse data and update state 
    setData(data);
  };

  // Fetch Moberg dataset for the reconstruction
  const fetchMobergData = async () => {
    const response = await fetch('https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtempmoberg2005.txt');
    const data = await response.text();
    // Parse data and update state 
    // Implement the data parsing and formatting here 
  };

  // Fetch data when the component mounts or time period changes 
  useEffect(() => {
    fetchData(timePeriod);
    fetchMobergData();
  }, [timePeriod]);

  // Handle time period change 
  const handleChange = (event) => {
    setTimePeriod(event.target.value);
  };

  // Configure chart data 
  const chartData = {
    labels: data?.years,
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
      showReconstruction && {
        label: 'Northern Hemisphere 2,000-year temperature reconstruction',
        data: mobergData,
        borderColor: 'blue',
        borderWidth: 1,
        fill: false,
      },
    ].filter(Boolean),
  };

  // Configure chart options 
  const chartOptions = {
    scales: {
      x: {
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
      <div>
        <input
          type="checkbox"
          id="showReconstruction"
          checked={showReconstruction}
          onChange={(event) => setShowReconstruction(event.target.checked)}
        />
        <label htmlFor="showReconstruction">Show 2,000-year temperature reconstruction</label>
      </div>
      <p>
        This chart displays global historical surface temperature anomalies from January 1850 onwards, including the
        HadCRUT5 dataset and the 2,000-year Northern Hemisphere temperature reconstruction by Moberg et al. (2005). The
        temperature reconstruction can be toggled on and off using the checkbox above the chart. The study describing the
        data measurement for the Moberg dataset can be found{' '}
        <a href="https://www.nature.com/articles/nature03265" target="_blank" rel="noopener noreferrer">here</a>.
      </p>
      {data ? <Line data={chartData} options={chartOptions} /> : <p>Loading data...</p>}
    </div>
  );
}
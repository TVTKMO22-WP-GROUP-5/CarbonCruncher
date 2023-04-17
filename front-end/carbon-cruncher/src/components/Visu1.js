//Importing the required libraries and components
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
//Importing the date-fns adapter for chart.js
(async () => {
  const dateAdapter = await import('chartjs-adapter-date-fns');
  Chart.register(dateAdapter.default);
})();
//Defining the Visu1 component
const Visu1 = () => {
  const [monthlyData, setMonthlyData] = useState(null);
  const [annualData, setAnnualData] = useState(null);
  const [timePeriod, setTimePeriod] = useState('annual');
//Fetching the data from the API 
  const fetchData = async (period) => {
    const response = await fetch(`https://carbon-cruncher.azurewebsites.net/api/visu1/${period}`);
    const responseData = await response.json();
  //Parsing the data
    const parsedData = {
      global: responseData.map((item) => ({ x: new Date(period === 'monthly' ? item.timeYearMonth : `${item.timeYear}-01-01`), y: item.anomalyGlobal })),
      northernHemisphere: responseData.map((item) => ({ x: new Date(period === 'monthly' ? item.timeYearMonth : `${item.timeYear}-01-01`), y: item.anomalyNorthern })),
      southernHemisphere: responseData.map((item) => ({ x: new Date(period === 'monthly' ? item.timeYearMonth : `${item.timeYear}-01-01`), y: item.anomalySouthern })),
      reconstruction: responseData
  .filter((item) => item.tempReconstruction !== null)
  .map((item) => ({ x: new Date(period === 'monthly' ? item.timeYearMonth : `${item.timeYear}-01-01`), y: item.tempReconstruction })),

    };

    if (period === 'monthly') {
      setMonthlyData(parsedData);
    } else {
      setAnnualData(parsedData);
    }
  };
  
//Using the useEffect hook to fetch the data from the API and display it in the chart 
  useEffect(() => {
    fetchData(timePeriod);
  }, [timePeriod]);

  const handleChange = (event) => {
    setTimePeriod(event.target.value);
  };
//Defining the chart data and options 
  const chartData = {
    datasets: [
      {
        label: 'Global (NH+SH)/2',
        data: (timePeriod === 'monthly' ? monthlyData : annualData)?.global,
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
        pointHitRadius: 0,
      },
      {
        label: 'Northern Hemisphere',
        data: (timePeriod === 'monthly' ? monthlyData : annualData)?.northernHemisphere,
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
        pointHitRadius: 0,
      },
      {
        label: 'Southern Hemisphere',
        data: (timePeriod === 'monthly' ? monthlyData : annualData)?.southernHemisphere,
        borderColor: 'orange',
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
        pointHitRadius: 0,
      },
      {
        label: 'Northern Hemisphere 2,000-year temperature reconstruction',
        data: (timePeriod === 'monthly' ? monthlyData : annualData)?.reconstruction,
        borderColor: 'blue',
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
        pointHitRadius: 0,
      },
    ],
  };
//Defining the chart options 
  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year',
        },
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

//Returning the chart and the data to be displayed in the chart 
  return (
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
        data can be visualized in monthly or annual intervals, providing insights into the
        temperature changes over time.
      </p>
      <div>
      {(timePeriod === 'monthly' ? monthlyData : annualData) ? <Line data={chartData} options={chartOptions} /> : <p>Loading data...</p>}

      </div>
    </div>
  );
};
//Exporting the Visu1 component
export default Visu1;

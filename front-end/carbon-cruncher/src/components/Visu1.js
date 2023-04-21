// Desc: This file defines the first visualization component.
//import necessary libraries
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { GET_VISU1_ANNUAL_URL, GET_VISU1_MONTHLY_URL, GET_VISU_INFO } from '../utilities/Config';
import { VisuInfo } from "../components/VisuInfo/VisuInfo";
import * as dateAdapter from 'chartjs-adapter-date-fns';
//register date adapter
Chart.register(dateAdapter);

//define the Visu1 component
const Visu1 = () => {
  const [monthlyData, setMonthlyData] = useState(null);
  const [annualData, setAnnualData] = useState(null);
  const [visuInfo, setVisuInfo] = useState(null);
  const [timePeriod, setTimePeriod] = useState('annual');
//fetch data from the backend
  const fetchData = async (period) => {
    const response = await fetch(period === 'monthly' ? GET_VISU1_MONTHLY_URL : GET_VISU1_ANNUAL_URL);
    const responseData = await response.json();
    const parsedData = {
      global: responseData.map((item) => ({ x: new Date(period === 'monthly' ? item.timeYearMonth : `${item.timeYear}-01-01`), y: item.anomalyGlobal })),
      northernHemisphere: responseData.map((item) => ({ x: new Date(period === 'monthly' ? item.timeYearMonth : `${item.timeYear}-01-01`), y: item.anomalyNorthern })),
      southernHemisphere: responseData.map((item) => ({ x: new Date(period === 'monthly' ? item.timeYearMonth : `${item.timeYear}-01-01`), y: item.anomalySouthern })),
      reconstruction: responseData.filter((item) => item.tempReconstruction !== null)
        .map((item) => ({ x: new Date(period === 'monthly' ? item.timeYearMonth : `${item.timeYear}-01-01`), y: item.tempReconstruction })),
    };
//set the data based on the time period
    if (period === 'monthly') {
      setMonthlyData(parsedData);
    } else {
      setAnnualData(parsedData);
    }
  };
//use effect to fetch data
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`${GET_VISU_INFO}?visunumber=1`);
      const responseData = await response.json();
      setVisuInfo(responseData);
    };
    getInfo();
    fetchData(timePeriod);
  }, [timePeriod]);
// handle change function
  const handleChange = (event) => {
    setTimePeriod(event.target.value);
  };
//define the chart data and options
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
        label: 'Northern Hemisphere 2,000 year temperature reconstruction',
data: (timePeriod === 'monthly' ? monthlyData : annualData)?.reconstruction,
borderColor: 'blue',
borderWidth: 1,
fill: false,
pointRadius: 0,
pointHitRadius: 0,
},
],
};

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
//return the component with the data and options defined above 
return (
<div>
<div className="visu-info">
{visuInfo?.map((info) => (
<VisuInfo key={info.id} info={info} />
))}
</div>
<div className="visu-controls">
<input type="radio" id="monthly" name="timePeriod" value="monthly" checked={timePeriod === 'monthly'} onChange={handleChange} />
<label htmlFor="monthly">Monthly</label>
<input type="radio" id="annual" name="timePeriod" value="annual" checked={timePeriod === 'annual'} onChange={handleChange} />
<label htmlFor="annual">Annual</label>
</div>
<div className="visu-chart">
{(timePeriod === 'monthly' ? monthlyData : annualData) ? <Line data={chartData} options={chartOptions} /> : <p>Loading data...</p>}
</div>
</div>
);
};

export default Visu1;

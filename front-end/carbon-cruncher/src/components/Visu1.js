import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const Visu1 = () => {
    // State variables for data, chart data, and view selection
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [isAnnual, setIsAnnual] = useState(true);

    // Fetch data from the API based on the view selection
    useEffect(() => {
        const fetchData = async () => {
            const url = isAnnual
                ? "https://carbon-cruncher.azurewebsites.net/api/visu1/annual"
                : "https://carbon-cruncher.azurewebsites.net/api/visu1/monthly";
            const result = await axios(url);
            setData(result.data);
        };
        fetchData();
    }, [isAnnual]);

    // Update the chart data based on the fetched data and view selection
    useEffect(() => {
        const { global, northern, southern } = data;

        if (global && northern && southern) {
            const chartData = {
                labels: isAnnual
                    ? global.map((d) => d.year)
                    : global[0].monthly.map((d) => d.date),
                datasets: [
                    {
                        label: "Global",
                        data: isAnnual
                            ? global.map((d) => d.mean)
                            : global[0].monthly.map((d) => d.anomaly),
                        borderColor: "red",
                        fill: false,
                    },
                    {
                        label: "Northern Hemisphere",
                        data: isAnnual
                            ? northern.map((d) => d.mean)
                            : northern[0].monthly.map((d) => d.anomaly),
                        borderColor: "blue",
                        fill: false,
                    },
                    {
                        label: "Southern Hemisphere",
                        data: isAnnual
                            ? southern.map((d) => d.mean)
                            : southern[0].monthly.map((d) => d.anomaly),
                        borderColor: "green",
                        fill: false,
                    },
                ],
            };
            setChartData(chartData);
        }
    }, [data, isAnnual]);

    // Update the view selection based on user input
    const handleChange = (event) => {
        setIsAnnual(event.target.value === "annual");
    };

    // Render the chart and view selection controls
    return (
        <div>
            <div>
                <input
                    type="radio"
                    id="annual"
                    name="view"
                    value="annual"
                    checked={isAnnual}
                    onChange={handleChange}
                />
                <label htmlFor="annual">Annual</label>
                <input
                    type="radio"
                    id="monthly"
                    name="view"
                    value="monthly"
                    checked={!isAnnual}
                    onChange={handleChange}
                />
                <label htmlFor="monthly">Monthly</label>
            </div>
            <Line data={chartData} />
        </div>
    );
};

export default Visu1;

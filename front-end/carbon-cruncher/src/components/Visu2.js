import React from "react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
)

const labels = [1958, 1963, 1968, 1973, 1978, 1983, 1988, 1993, 1998, 2003, 2008, 2013, 2018, 2023]

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
    title: {
        display: true,
        text: "Atmospheric CO2 concentrations from Mauna Loa measurements and antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements",
        font: {
            size: 14
            }
        },
        scales: {
            x: {
                type: "linear",
            },
            y: {
                type: "linear",
            },
            
        },
    }
    
}

const Visu2 = () => {
    const [data, setData] = useState({
        labels: [1958, 1963, 1968, 1973, 1978, 1983, 1988, 1993, 1998, 2003, 2008, 2013, 2018, 2023],
        datasets: [
    
            {
                label: "CO2 Annual",
                data: [], 
                borderColor: "rgb(0, 0, 0)",
                backgroundColor: "rgb(0, 0, 0)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "Year",
                    yAxisValue: "Mean",
                }
            },
    
            {
                label: "CO2 Monthly",
                data: [],
                borderColor: "rgb(240, 150, 15)",
                backgroundColor: "rgb(240, 150, 15)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "Time",
                    yAxisValue: "Average",
                },
            },
    
            {
                label: "Ice Core 1",
                data: [],
                borderColor: "rgb(160, 60, 240)",
                backgroundColor: "rgb(160, 60, 240)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "air_age",
                    yAxisValue: "co2_ppm",
                }
            },
    
            {
                label: "Ice Core 2",
                data: [], 
                borderColor: "rgb(250, 100, 220)",
                backgroundColor: "rgb(250, 100, 220)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "air_age",
                    yAxisValue: "co2_ppm",
                }
            },
    
            {
                label: "Ice Core 3",
                data: [],
                borderColor: "rgb(230, 15, 15)",
                backgroundColor: "rgb(230 , 15, 15)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "air_age",
                    yAxisValue: "co2_ppm",
                }
            }
            
        ]
    }
    );
    useEffect(() => {
        const fetchData=async()=> {
            const url = "https://carbon-cruncher.azurewebsites.net/api/visu2/annual";
            const labelSet = [];
            const dataSet1 = [];
            const dataSet2 = [];
        await fetch(url).then((data)=> {
            console.log("Annual data", data)
            const res = data.json();
            return res
        }).then(()=> {
            console.log("result",res)



            
        }).catch(e => {
            console.log("error", e)
        })  
        }
        fetchData();
    },[])

    setdata = {
        labels: labels,   
        datasets: [
    
            {
                label: "CO2 Annual",
                data: [320, 330, 340, 350, 380, 390, 420], //testing...
                //data: getAnnual,
                borderColor: "rgb(0, 0, 0)",
                backgroundColor: "rgb(0, 0, 0)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "Year",
                    yAxisValue: "Mean",
                }
            },
    
            {
                label: "CO2 Monthly",
                data: [1, 6, 280, 425], //testing...
                //data: getMonthly,
                borderColor: "rgb(240, 150, 15)",
                backgroundColor: "rgb(240, 150, 15)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "Time",
                    yAxisValue: "Average",
                },
            },
    
            {
                label: "Ice Core 1",
                data: [20, 70, 80], //testing...
                //data: visu2.IceCore1,
                borderColor: "rgb(160, 60, 240)",
                backgroundColor: "rgb(160, 60, 240)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "air_age",
                    yAxisValue: "co2_ppm",
                }
            },
    
            {
                label: "Ice Core 2",
                data: [25, 30, 50], //testing...
                //data: visu2.IceCore2,
                borderColor: "rgb(250, 100, 220)",
                backgroundColor: "rgb(250, 100, 220)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "air_age",
                    yAxisValue: "co2_ppm",
                }
            },
    
            {
                label: "Ice Core 3",
                data: [45, 60, 110], //testing...
                //data: visu2.IceCore3,
                borderColor: "rgb(230, 15, 15)",
                backgroundColor: "rgb(230 , 15, 15)",
                pointRadius: 0,
                parsing: {
                    xAxisValue: "air_age",
                    yAxisValue: "co2_ppm",
                }
            }
            
        ]
    }

    return (
    <div style={{width: "1000px", height: "500px"}}>
     <Line data={data} options={options}></Line>;
    </div>
    )
}

export default Visu2;


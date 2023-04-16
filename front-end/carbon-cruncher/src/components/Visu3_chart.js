import React from "react";
import { useEffect, useState } from "react";
//lines 4-25 copy pasted from: https://react-chartjs-2.js.org/examples/multiaxis-line-chart/
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
  import { Line } from 'react-chartjs-2';
  //import faker from 'faker';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = ['2000k BC', '1000k BC', '100k BC', '500k BC', '100k BC', '0 AD', '100k AD'];

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
    title: {
        display: true,
        text: "Evolution of global temperature over the past two million years",
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

const Visu3_chart = () => {
    const [data, setData] = useState({
        labels: labels,
        datasets: [
    
            {
                label: "Global data",
                data: [], 
            },
    
            {
                label: "Carbon data",
                data: [],
            },
    
            //{
            //    label: "Events",
            //    data: [],
            //},
    
            
        ]
    });
    useEffect(() => {
        const fetchData=async()=> {
            const url_1 = "https://carbon-cruncher.azurewebsites.net/api/visu3/global";
            const url_2 = "https://carbon-cruncher.azurewebsites.net/api/visu3/events";
            const labelSet = [];
            const dataSet1 = [];
        await fetch(url_1).then((data)=> {
            console.log("data", data)
            const res = data.json();
            return res
        }).then((res)=> {
            console.log("result",res)
            for (const val of res){
                dataSet1.push(val);
                labelSet.push(val.year);

        }
        
        setData ({
            labels: labels,   
            datasets: [           
                {
                    label: "Temp change globally",
                    data:dataSet1,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgb(255, 99, 132, 0.5)",
                    pointRadius: 0,
                    parsing: {
                        xAxisValue: "Year",
                        yAxisValue: "Mean",
                    }
                },      
            ]
        })
        console.log("testData", dataSet1)
        }).catch(e => {
            console.log("error", e)
        })  
        }
        fetchData();
    },[])

    return (
    <div style={{width: "1000px", height: "500px"}}>
        {
            console.log("dataa", data)
        }
     <Line data={data} options={options}></Line>;
    </div>
    )
}

export default Visu3_chart;
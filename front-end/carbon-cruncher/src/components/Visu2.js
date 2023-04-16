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

const labels = Array.from(Array(2023+1).keys()).slice(1958);
const labels2 = Array.from(Array(1966+1).keys()).slice(1006);

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

//const ctx = document.getElementById("visu2");

export const Visu2 = () => {
    const [annualCo2, setAnnualCo2] = useState ({
        labels: labels,
        datasets: [
    
            {
                label: "CO2 Annual",
                data: [], 
            },
        ]
    });

    const [monthlyCo2, setMonthlyCo2] = useState ({
        labels: labels,
        datasets: [
            {
                label: "CO2 Monthly",
                data: [],
            },
        ]
    });
    
    const [icecore1, setIcecore1] = useState ({
        labels: labels2,
        datasets: [
            {
            label: "Ice Core 1",
            data: [],
            },
        ]
    });

    const [icecore2, setIcecore2] = useState ({
        labels: labels2,
        datasets: [
            {
            label: "Ice Core 2",
            data: [],
            },
        ]
    });

    const [icecore3, setIcecore3] = useState ({
        labels: labels2,
        datasets: [
            {
            label: "Ice Core 3",
            data: [],
            },
        ]
    });

    useEffect(() => {
        const fetchData=async()=> {
            const url_1 = "https://carbon-cruncher.azurewebsites.net/api/visu2/annual";
            const dataSet1 = [];
        await fetch(url_1).then((annualCo2)=> {
            console.log("Annual data", annualCo2)
            const res = annualCo2.json();
            return res
        }).then((res)=> {
            console.log("result",res)
            for (const val of res){
                dataSet1.push(val.mean);
        }
       
        setAnnualCo2 ({
            labels: labels,   
            datasets: [
            
                {
                    label: "CO2 Annual",
                    data:dataSet1,
                    borderColor: "rgb(0, 0, 0)",
                    backgroundColor: "rgb(0, 0, 0)",
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

    useEffect(() => {
        const fetchData=async()=> {
            const url_2 = "https://carbon-cruncher.azurewebsites.net/api/visu2/monthly";
            const dataSet2 = [];
        await fetch(url_2).then((monthlyCo2)=> {
            console.log("Monthly data", monthlyCo2)
            const res = monthlyCo2.json();
            return res
        }).then((res)=> {
            console.log("result",res)
            for (const val of res){
                dataSet2.push(val.average);
        }
       
        setMonthlyCo2 ({
            labels: labels,   
            datasets: [
            
                {
                    label: "CO2 Monthly",
                    data:dataSet2,
                    borderColor: "rgb(240, 150, 15)",
                    backgroundColor: "rgb(240, 150, 15)",
                    pointRadius: 0,
                    parsing: {
                        xAxisValue: "Time",
                        yAxisValue: "Average",
                    }
                },
                    
            ]
        })
        console.log("testData2", dataSet2)
        }).catch(e => {
            console.log("error", e)
        })  
        }
        fetchData();
    },[])

    useEffect(() => {
        const fetchData=async()=> {
            const url_3 = "https://carbon-cruncher.azurewebsites.net/api/visu2/icecore";
            const dataSet3 = [];
        await fetch(url_3).then((icecore1)=> {
            console.log("Ice core data", icecore1)
            const res = icecore1.json();
            return res
        }).then((res)=> {
            console.log("result",res)
            for (const val of res){
                dataSet3.push(val.co2Ppm);
        }
       
        setIcecore1 ({
            labels: labels2,   
            datasets: [
            
                {
                    label: "Ice Core 1",
                    data:dataSet3,
                    borderColor: "rgb(160, 60, 240)",
                    backgroundColor: "rgb(160, 60, 240)",
                    pointRadius: 0,
                    parsing: {
                        xAxisValue: "Time",
                        yAxisValue: "Average",
                    }
                },
                    
            ]
        })
        console.log("testData3", dataSet3)
        }).catch(e => {
            console.log("error", e)
        })  
        }
        fetchData();
    },[])

    /*const dataSet1 = _(annualCo2);
    const dataSet2 = _(monthlyCo2);
    const combinedData = _.mergeWith(dataSet1, dataSet2, (objValue, srcValue) => {
        if (_.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      });*/


    return (
    <div style={{width: "1000px", height: "500px"}}>
        <h2>Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958</h2>
     <Line data={annualCo2} options={options}></Line>
    </div>
    )
}

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
  //import faker from 'faker'; // not needed in this project

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const config = {
    type: 'line',
    options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        scales: {
          'left-y-axis': {
            type: 'linear',
            display: true,
            position: 'left',
          },
          'right-y-axis': {
            type: 'linear',
            display: true,
            position: 'right',
    
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      },
    
}
// horizonal axis of chart
const yearLabels = Array.from(Array(2000+1).keys()).slice(1);

export const Visu3_chart = () => {
    const [tempData, setTempData] = useState({
        datasets: [
     
/*              {
                label: "Temperature change",
                data: [], 
                yAxisID: 'left-y-axis'
            },
    
             {
                label: "CO2 change",
                data: [],
                yAxisID: 'right-y-axis'
            }, 
    
             {
                label: "Events",
                data: [],
            },   */
    
             
        ]
    });
    useEffect(() => {
        const fetchData=async()=> {
            const url_1 = "https://carbon-cruncher.azurewebsites.net/api/visu3/global";
            //const url_2 = "https://carbon-cruncher.azurewebsites.net/api/visu3/event";
            const dataSet1 = [];
            const dataSet2 = [];
            const dataSet3 = [];
        await fetch(url_1).then((tempData)=> {
            console.log("data", tempData)
            const res = tempData.json();
            return res
        }).then((res)=> {
            console.log("result",res)
            for (const val of res){
                dataSet1.push(val.globalTempChange);
                dataSet2.push(val.co2Ppm);
               // dataSet3.push(val.yearsAgo);
        }

        
        setTempData ({
            labels: yearLabels,   
            datasets: [           
                {
                    type: 'line',
                    label: "Temperature change",
                    data:dataSet1,
                    borderColor: "rgb(200, 0, 0)",
                    backgroundColor: "rgb(200, 0, 0, 0.5)",
                    pointRadius: 0,
                    yAxisID:'left-y-axis',
                    
                },     
                 {
                    type: 'line',
                    label: "co2 change",
                    data:dataSet2,
                    borderColor: "rgb(0, 100, 200)",
                    backgroundColor: "rgb(0, 100, 200, 0.5)",
                    pointRadius: 0,
                    yAxisID:'right-y-axis',
                },  
                {
                    type: 'line',
                    label: "Events",
                    data:dataSet3,
                    borderColor: "rgb(255, 165, 0)",
                    backgroundColor: "rgb(255, 165, 0, 0.5)",
                    pointRadius: 0,
                    showLine:false,
                    //yAxisID:'right-y-axis',
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
     <Line data={tempData} options={config}></Line>;
    </div>
    )
}

export default Visu3_chart
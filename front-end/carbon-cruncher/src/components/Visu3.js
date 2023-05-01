import React from "react";
import { useEffect, useState } from "react";
import styles from "./Visu3.css"
import { Spinner } from "./Spinner/Spinner"
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
import { GET_VISU3_GLOBAL_URL, GET_VISU3_EVENT_URL, GET_VISU_INFO } from "../utilities/Config"
import { VisuInfo } from "./VisuInfo/VisuInfo"
import axios from "axios"

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
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      type: "linear",
      time: {
        unit: "year",
      },
      display: true,
      title: {
        display: true,
        text: "Years ago",
      },
    },
    y: {
      display: true,
      title: {
        type: "linear",
        display: true,
        position: "right",
        text: 'Temperature'
      },
    },
    y1: {
      display: true,
      title: {
        type: "linear",
        display: true,
        position: "left",
        text: 'Carbon',
      },
    },
  },
} 



const Visu3 = () => {
  const [combinedData, setCombinedData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const dataRes = await axios.get(GET_VISU3_GLOBAL_URL)
      const dataRes2 = await axios.get(GET_VISU3_EVENT_URL)
      const infoRes = await axios.get(GET_VISU_INFO + "?visunumber=3")
      parseData(dataRes.data, dataRes2.data, infoRes.data)
    }
    getData()
  }, [])

  const parseData = (chart, chart2, info) => {

    const globalData = chart.map((d) => ({
      year: d.yearKbp * 1000,
      tempChange: d.globalTempChange,
      carbonChange: d.co2Ppm,
    }))
    const eventData = chart2.map((d) => ({
      yearAgo: d.yearsAgo,
      description: d.description,
    }))
    const combinedData = globalData.map((d, i) => ({
      ...d,
      ...eventData[i],
      yearCombined: (d.year + eventData[i].yearAgo),
    }))
   
  

      let datasets = []

      datasets.push({
        label: "Temperature change",
        data: combinedData,
        borderColor: "rgb(200, 0, 0)",
        backgroundColor: "rgb(200, 0, 0, 0.5)",
        borderWidth: 3,
        pointRadius: 0,
        yAxisID: 'y',
        parsing: {
          xAxisKey: "yearCombined",
          yAxisKey: "tempChange",
        },
      })
  
      datasets.push({
        label: "Carbon change",
        data: combinedData,
        borderColor: "rgb(0, 100, 200)",
        backgroundColor: "rgb(0, 100, 200, 0.5)",
        borderWidth: 3,
        pointRadius: 0,
        yAxisID: 'y1',
        parsing: {
          xAxisKey: "yearCombined",
          yAxisKey: "carbonChange",
        },
      })
  
        datasets.push({
        label: "Events",
        data: combinedData,
        showLine:false,
        borderColor: "rgb(255,140,0)",
        backgroundColor: "rgb(255,140,0, 0.5)",
        borderWidth: 3,
        pointStyle: 'triangle',
        pointRadius: 10,
        parsing: {
          xAxisKey: "yearCombined",
          yAxisKey: "description",
        },
      })  
    
    const resultData = {
      chartData: {
        datasets,
      },
      info: info,
    }
    setCombinedData(resultData)
  }


  if (!combinedData) {
    return (
      <div className={styles.loading}>
        <Spinner />
        <p className="">Loading data...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {combinedData.info.map((i) => (
          <VisuInfo info={i} />
        ))}
      </div>
      <Line options={config} data={combinedData.chartData}></Line>
    </div>
  )
};
//this seemed to work best so far, sigh :(
/* 
  const parseData = (chart, info) => {
    // horizonal axis of chart
    const labels = chart.map((d) => d['yearKbp']);

    const globalData = {
      label: 'global Temperature Change',
      data: chart.map((data) => data['globalTempChange']),
      yAxisID: 'left-y-axis',
      borderColor: "rgb(200, 0, 0)",
      backgroundColor: "rgb(200, 0, 0, 0.5)",
      pointRadius: 0,
    }

    const co2Data = {
      label: 'Carbon data',
      data: chart.map((data) => data['co2Ppm']),
      yAxisID: 'right-y-axis',
      borderColor: "rgb(0, 100, 200)",
      backgroundColor: "rgb(0, 100, 200, 0.5)",
      pointRadius: 0,
    }

    const eventData = {
      label: 'Events',
      data: 280,

    }
    const datasets = [globalData, co2Data, eventData]
    const combData = {
      chart: {
        labels,
        datasets,
      },
      info: info,
    }

    setCombinedData(combData)

  };
*/


//old code just in case something goes horribly wrong
/*
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
    )*/
//}

export default Visu3
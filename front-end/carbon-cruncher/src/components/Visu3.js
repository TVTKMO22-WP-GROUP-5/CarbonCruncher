import React from "react";
import { useEffect, useState } from "react";
import styles from "./Visu3.css"
import { Spinner } from "./Spinner/Spinner"
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
import { GET_VISU3_GLOBAL_URL, GET_VISU3_EVENT_URL, GET_VISU_INFO } from "../utilities/Config"
import { VisuInfo } from "./VisuInfo/VisuInfo"
import axios from "axios"
import {
  GenerateColorFromName,
} from "../utilities/Utilities"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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


export const Visu3 = () => {
  /*   const [globalData, setGlobalData] = useState ([]);
    const [co2Data, setco2Data] = useState([]);
    const [eventData, setEventData] = useState([]); */
  const [combinedData, setCombinedData] = useState(null)


  useEffect(() => {
    const getData = async () => {
      const dataRes = await axios.get(GET_VISU3_GLOBAL_URL)
      const dataRes2 = await axios.get(GET_VISU3_EVENT_URL)
      const infoRes = await axios.get(GET_VISU_INFO + "?visunumber=3")
      parseData(dataRes.data, infoRes.data)
    }
    getData()
  }, [])

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
      <Line options={options} data={combinedData.chart}></Line>
    </div>
  )
};

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
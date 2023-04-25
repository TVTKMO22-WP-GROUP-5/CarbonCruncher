import React from "react"
import { useEffect, useState } from "react"
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
} from "chart.js"
import { Line } from "react-chartjs-2"
//import faker from 'faker'; // not needed in this project
import { GET_VISU3_GLOBAL_URL, GET_VISU3_EVENT_URL, GET_VISU_INFO } from "../utilities/Config"
import { VisuInfo } from "./VisuInfo/VisuInfo"
import axios from "axios"
import { GenerateColorFromName } from "../utilities/Utilities"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  type: "line",
  options: {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      "left-y-axis": {
        type: "linear",
        display: true,
        position: "left",
      },
      "right-y-axis": {
        type: "linear",
        display: true,
        position: "right",

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
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
    const labels = chart.map((d) => d["yearKbp"])

    const globalData = {
      label: "global Temperature Change",
      data: chart.map((data) => data["globalTempChange"]),
      yAxisID: "left-y-axis",
      borderColor: "rgb(200, 0, 0)",
      backgroundColor: "rgb(200, 0, 0, 0.5)",
      pointRadius: 0,
    }

    const co2Data = {
      label: "Carbon data",
      data: chart.map((data) => data["co2Ppm"]),
      yAxisID: "right-y-axis",
      borderColor: "rgb(0, 100, 200)",
      backgroundColor: "rgb(0, 100, 200, 0.5)",
      pointRadius: 0,
    }

    const eventData = {
      label: "Events",
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
      <Line options={options} data={combinedData.chart}></Line>
    </div>
  )
}

export default Visu3

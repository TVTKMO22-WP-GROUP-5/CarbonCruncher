import React from "react"
import { useEffect, useState } from "react"
import styles from "./Visu3.css"
import { Spinner } from "./Spinner/Spinner"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import { Line } from "react-chartjs-2"
import { GET_VISU3_GLOBAL_URL, GET_VISU3_EVENT_URL, GET_VISU_INFO } from "../utilities/Config"
import { VisuInfo } from "./VisuInfo/VisuInfo"
import axios from "axios"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const config = {
  responsive: true,
  interaction: {
    mode: "index",
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
        text: "Temperature",
      },
    },
    y1: {
      display: true,
      title: {
        type: "linear",
        display: true,
        position: "left",
        text: "Carbon",
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
    // const combinedData = globalData.map((d, i) => ({
    //   ...d,
    //   ...eventData[i],
    //   yearCombined: d.year + eventData[i].yearAgo,
    // }))

    // let datasets = []

    // datasets.push({
    //   label: "Temperature change",
    //   data: combinedData,
    //   borderColor: "rgb(200, 0, 0)",
    //   backgroundColor: "rgb(200, 0, 0, 0.5)",
    //   borderWidth: 3,
    //   pointRadius: 0,
    //   yAxisID: "y",
    //   parsing: {
    //     xAxisKey: "yearCombined",
    //     yAxisKey: "tempChange",
    //   },
    // })

    // datasets.push({
    //   label: "Carbon change",
    //   data: combinedData,
    //   borderColor: "rgb(0, 100, 200)",
    //   backgroundColor: "rgb(0, 100, 200, 0.5)",
    //   borderWidth: 3,
    //   pointRadius: 0,
    //   yAxisID: "y1",
    //   parsing: {
    //     xAxisKey: "yearCombined",
    //     yAxisKey: "carbonChange",
    //   },
    // })

    // datasets.push({
    //   label: "Events",
    //   data: combinedData,
    //   showLine: false,
    //   borderColor: "rgb(255,140,0)",
    //   backgroundColor: "rgb(255,140,0, 0.5)",
    //   borderWidth: 3,
    //   pointStyle: "triangle",
    //   pointRadius: 10,
    //   parsing: {
    //     xAxisKey: "yearCombined",
    //     yAxisKey: "description",
    //   },
    // })

    // const resultData = {
    //   chartData: {
    //     datasets,
    //   },
    //   info: info,
    // }
    // setCombinedData(resultData)
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
}

export default Visu3

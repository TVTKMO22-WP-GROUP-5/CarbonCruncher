import React from "react"
import { useEffect, useState } from "react"
import styles from "./Visu3.css"
import { FormatYearsAgoLabel } from "../utilities/Utilities"
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
    mode: "nearest",
    intersect: true,
  },
  plugins: {
    tooltip: {
      callbacks: {
        title: (i) => `${i[0].dataset.label}, Year: ${FormatYearsAgoLabel(i[0].parsed.x)}`,
        label: (i) => {
          if (i.datasetIndex === 0) return `  ${i.raw.tempChange.toFixed(2)} [°C]`
          if (i.datasetIndex === 1) return `  ${i.raw.carbonChange.toFixed(0)} [ppm]`
          if (i.datasetIndex === 2) return `  ${i.raw.description}`
        },
      },
    },
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
        text: "Year",
      },
      min: -2000000,
      max: 100000,
      ticks: {
        callback: function (value, index, ticks) {
          return FormatYearsAgoLabel(value)
        },
        //stepSize: 100000,
      },
    },
    y: {
      display: true,
      position: "right",
      title: {
        type: "linear",
        display: true,
        text: "Temperature [°C]",
      },
      grid: {
        drawOnChartArea: false,
      },
    },
    yCarbon: {
      display: true,
      position: "left",
      title: {
        type: "linear",
        display: true,
        text: "CO2 [ppm] ",
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
      year: 2023 - d.yearKbp * 1000,
      tempChange: d.globalTempChange,
      carbonChange: d.co2Ppm,
    }))
    const eventData = chart2.map((d) => ({
      year: 2023 - d.yearsAgo,
      value: 280,
      description: d.description,
    }))

    let datasets = []

    datasets.push({
      label: "Temperature change",
      data: globalData,
      borderColor: "rgb(200, 0, 0)",
      backgroundColor: "rgb(200, 0, 0, 0.5)",
      borderWidth: 1,
      pointRadius: 0,
      yAxisID: "y",
      parsing: {
        xAxisKey: "year",
        yAxisKey: "tempChange",
      },
    })

    datasets.push({
      label: "Carbon change",
      data: globalData,
      borderColor: "rgb(0, 100, 200)",
      backgroundColor: "rgb(0, 100, 200, 0.5)",
      borderWidth: 1,
      pointRadius: 0,
      yAxisID: "yCarbon",
      parsing: {
        xAxisKey: "year",
        yAxisKey: "carbonChange",
      },
    })

    datasets.push({
      label: "Events",
      data: eventData,
      showLine: false,
      borderColor: "rgb(255,140,0)",
      backgroundColor: "rgb(255,140,0, 0.5)",
      borderWidth: 3,
      pointStyle: "triangle",
      pointRadius: 10,
      yAxisID: "yCarbon",
      parsing: {
        xAxisKey: "year",
        yAxisKey: "value",
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
        {combinedData.info.map((i, index) => (
          <VisuInfo info={i} key={index} />
        ))}
      </div>
      <Line options={config} data={combinedData.chartData}></Line>
    </div>
  )
}

export default Visu3

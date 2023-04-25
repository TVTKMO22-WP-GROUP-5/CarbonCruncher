import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import {
  GET_VISU2_ICECORE_URL,
  GET_VISU2_MONTHLY_URL,
  GET_VISU2_ANNUAL_URL,
  GET_VISU_INFO,
} from "../utilities/Config"
import { Spinner } from "./Spinner/Spinner"
import { VisuInfo } from "./VisuInfo/VisuInfo"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

/*

x: {
        ticks: {
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          callback: function(val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val) : '';
          },
          color: 'red',
        }

*/

const options = {
  spanGaps: true,
  responsive: true,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "year",
      },
      display: true,
      title: {
        display: true,
        text: "Year",
      },
      ticks: {
        // callback: function (value, index, ticks) {
        //   console.log(value)
        //   console.log(index)
        //   console.log(ticks)
        //   if (new Date(value).getFullYear % 100 === 0) return "$" + value
        // },
        color: "red",
        xmin: 1000,
        max: 2020,
        // beginAtZero: true,
        // maxTicksLimit: maxSize / stepSize + 1, // +1 for zero
        // stepSize: stepSize,
        // max: maxSize,
        // xmin: 0,
        // autoSkip: false,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "CO2 [ppm]",
      },
    },
  },
}

const Visu2 = () => {
  const [visu2Data, setVisu2Data] = useState(null)

  // Load data from api
  useEffect(() => {
    const getData = async () => {
      const dataMonthly = await axios.get(GET_VISU2_MONTHLY_URL)
      const dataAnnual = await axios.get(GET_VISU2_ANNUAL_URL)
      const dataIceCore = await axios.get(GET_VISU2_ICECORE_URL)
      const dataInfo = await axios.get(GET_VISU_INFO + "?visunumber=2")
      parseData(dataMonthly.data, dataAnnual.data, dataIceCore.data, dataInfo.data)
    }
    getData()
  }, [])

  /**
   * Parses API data to chart form
   */
  const parseData = (monthlyData, annualData, iceCoreData, info) => {
    // Create similar timelabels to all dataseries YEAR-MONTH-DAY
    const monthly = monthlyData.map((d) => ({
      //time: new Date(d.time),
      time: d.time,
      monthlyAvg: d.average,
    }))
    const annual = annualData.map((d) => ({
      time: new Date(d.year, 0, 1),
      annualAvg: d.mean,
    }))
    const iceCore1 = iceCoreData
      .filter((d) => d.icecoreId === 1)
      .map((d) => ({ time: new Date(d.year, 0, 1), co2Ppm: d.co2Ppm }))
    const iceCore2 = iceCoreData
      .filter((d) => d.icecoreId === 2)
      .map((d) => ({ time: new Date(d.year, 0, 1), co2Ppm: d.co2Ppm }))
    const iceCore3 = iceCoreData
      .filter((d) => d.icecoreId === 3)
      .map((d) => ({ time: new Date(d.year, 0, 1), co2Ppm: d.co2Ppm }))

    let datasets = []

    datasets.push({
      label: "Monthly",
      data: monthly,
      backgroundColor: "#ffc83d",
      borderColor: "#cca030",
      borderWidth: 1,
      fill: false,
      pointRadius: 0,
      parsing: {
        xAxisKey: "time",
        yAxisKey: "monthlyAvg",
      },
    })

    datasets.push({
      label: "Annual",
      data: annual,
      backgroundColor: "#23a559",
      borderColor: "#12582f",
      borderWidth: 1,
      fill: false,
      pointRadius: 0,
      parsing: {
        xAxisKey: "time",
        yAxisKey: "annualAvg",
      },
    })

    datasets.push({
      label: "Ice Core 1",
      data: iceCore1,
      backgroundColor: "#3bc1ff",
      borderColor: "#2987b2",
      borderWidth: 1,
      fill: false,
      pointRadius: 0,
      parsing: {
        xAxisKey: "time",
        yAxisKey: "co2Ppm",
      },
    })

    datasets.push({
      label: "Ice Core 2",
      data: iceCore2,
      backgroundColor: "#071398",
      borderColor: "#03094b",
      borderWidth: 1,
      fill: false,
      pointRadius: 0,
      parsing: {
        xAxisKey: "time",
        yAxisKey: "co2Ppm",
      },
    })

    datasets.push({
      label: "Ice Core 3",
      data: iceCore3,
      backgroundColor: "#7b83eb",
      borderColor: "#52589e",
      borderWidth: 1,
      fill: false,
      pointRadius: 0,
      parsing: {
        xAxisKey: "time",
        yAxisKey: "co2Ppm",
      },
    })

    // Combine labels and datasets and return results
    const resultData = {
      chartData: {
        datasets,
      },
      info: info,
    }
    setVisu2Data(resultData)
  }

  // Show loading indicator while data is being loaded from API
  if (!visu2Data) {
    return (
      <div>
        <Spinner msg={"Loading data..."} />
      </div>
    )
  }

  //render the chart visualization
  return (
    <div>
      {visu2Data.info.map((i) => (
        <VisuInfo info={i} key={i.visuChartNumber} />
      ))}
      <Line data={visu2Data.chartData} options={options}></Line>
    </div>
  )
}

export default Visu2

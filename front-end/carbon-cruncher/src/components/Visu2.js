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

//set chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Atmospheric CO2 concentrations from Mauna Loa measurements and antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements",
      font: {
        size: 14,
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        displayFormats: {
          quarter: "MMM yyyy",
        },
      },
      min: "1000-01-01",
      max: "2023-04-24",
      title: {
        display: true,
        text: "Time",
      },
    },
    y: {
      type: "linear",
      min: 100,
      max: 1000,
      title: {
        display: true,
        text: "CO2 [ppm]",
      },
    },
  },
}

export const Visu2 = () => {
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
      time: new Date(d.time).toDateString(),
      monthlyAvg: d.average,
    }))
    const annual = annualData.map((d) => ({
      time: new Date(d.year, 0, 1).toDateString(),
      annualAvg: d.mean,
    }))
    const iceCore1 = iceCoreData
      .filter((d) => d.icecoreId === 1)
      .map((d) => ({ time: new Date(d.year, 0, 1).toDateString(), co2Ppm: d.co2Ppm }))
    const iceCore2 = iceCoreData
      .filter((d) => d.icecoreId === 2)
      .map((d) => ({ time: new Date(d.year, 0, 1).toDateString(), co2Ppm: d.co2Ppm }))
    const iceCore3 = iceCoreData
      .filter((d) => d.icecoreId === 3)
      .map((d) => ({ time: new Date(d.year, 0, 1).toDateString(), co2Ppm: d.co2Ppm }))

    // Combine timelabels to same array and make
    // them unique by removing ones that occur more than once
    let timeLabels = monthly.map((d) => d.time)
    timeLabels = timeLabels.concat(annual.map((d) => d.time))
    timeLabels = timeLabels.concat(iceCore1.map((d) => d.time))
    timeLabels = timeLabels.concat(iceCore2.map((d) => d.time))
    timeLabels = timeLabels.concat(iceCore3.map((d) => d.time))
    const timeLabelsUnique = [...new Set(timeLabels)]

    // Find correct datapoints for each time label and push them to array
    let mergedDataset = []
    timeLabelsUnique.forEach((t) => {
      const m = monthly.find((m) => compTime(m.time, t))
      const a = annual.find((a) => compTime(a.time, t))
      const i1 = iceCore1.find((i1) => compTime(i1.time, t))
      const i2 = iceCore2.find((i2) => compTime(i2.time, t))
      const i3 = iceCore3.find((i3) => compTime(i3.time, t))

      const newDataCell = {
        time: t,
        monthly: m ? m.monthlyAvg : null,
        annual: a ? a.annualAvg : null,
        iceCore1: i1 ? i1.co2Ppm : null,
        iceCore2: i2 ? i2.co2Ppm : null,
        iceCore3: i3 ? i3.co2Ppm : null,
      }
      mergedDataset.push(newDataCell)
    })

    // Sort dataset by time
    mergedDataset.sort((a, b) => {
      return new Date(a.time) - new Date(b.time)
    })

    // Create dataset array and push each data series to array with configuration
    let datasets = []
    const labels = mergedDataset.map((d) => d.time)

    datasets.push({
      label: "Monthly",
      data: mergedDataset.map((d) => d["monthly"]),
      backgroundColor: "#ffc83d",
      borderColor: "#ffc83d",
      borderWidth: 2,
      fill: false,
      pointRadius: 0,
      pointHitRadius: 0,
    })

    datasets.push({
      label: "Annual",
      data: mergedDataset.map((d) => d["annual"]),
      backgroundColor: "#23a559",
      borderColor: "#23a559",
      borderWidth: 2,
      fill: false,
      pointRadius: 1,
      pointHitRadius: 0,
    })

    datasets.push({
      label: "Ice Core 1",
      data: mergedDataset.map((d) => d["iceCore1"]),
      backgroundColor: "#3bc1ff",
      borderColor: "#3bc1ff",
      borderWidth: 1,
      fill: false,
      pointRadius: 0,
      pointHitRadius: 0,
    })

    datasets.push({
      label: "Ice Core 2",
      data: mergedDataset.map((d) => d["iceCore2"]),
      backgroundColor: "#071398",
      borderColor: "#071398",
      borderWidth: 1,
      fill: false,
      pointRadius: 0,
      pointHitRadius: 0,
    })

    datasets.push({
      label: "Ice Core 3",
      data: mergedDataset.map((d) => d["iceCore3"]),
      backgroundColor: "#7b83eb",
      borderColor: "#7b83eb",
      borderWidth: 1,
      fill: false,
      pointRadius: 0,
      pointHitRadius: 0,
    })

    // Combine labels and datasets and return results
    const resultData = {
      chartData: {
        labels,
        datasets,
      },
      info: info,
    }
    setVisu2Data(resultData)
    console.log(resultData)
  }

  /**
   * Date comparer helper function
   */
  const compTime = (a, b) => {
    const date1 = new Date(a)
    const date2 = new Date(b)

    if (date1 > date2) {
      return false
    } else if (date1 < date2) {
      return false
    } else {
      return true
    }
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

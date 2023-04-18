import React, { useEffect, useState } from "react"
import axios from "axios"
import styles from "./Visu4.module.css"
import { Spinner } from "../Spinner/Spinner"
import {
  GenerateColorFromName,
  CapitalizeFirstLetter,
  AddSpaceBetweenCapitalizedWords,
} from "../../utilities/Utilities"
import { GET_VISU4_URL, GET_VISU_INFO } from "../../utilities/Config"
import Select from "react-select"
import { Line } from "react-chartjs-2"
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
import { VisuInfo } from "../VisuInfo/VisuInfo"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "CO2 Emissions by Country",
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Year",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "CO2 [Mton]",
      },
    },
  },
}

export const Visu4 = () => {
  const [co2data, setco2data] = useState(null)
  const [filteredData, setFilteredData] = useState({})
  const [selectCountries, setSelectCountries] = useState([])

  // Load CO2 data from api
  useEffect(() => {
    const getData = async () => {
      const dataRes = await axios.get(GET_VISU4_URL)
      const infoRes = await axios.get(GET_VISU_INFO + "?visunumber=4")
      parseData(dataRes.data, infoRes.data)
    }
    getData()
  }, [])

  /**
   * Parses API data to chart form
   */
  const parseData = (chartData, info) => {
    // Chart labels from years
    const labels = chartData.map((d) => d.mtCo2Yr)

    // Array for keys that we exclude from country dataset
    const skipDataFromKeys = ["id", "mtCo2Yr"]
    let datasets = []
    let countryOptions = []

    // Create dataset for each key in API data except the excluded ones
    const keys = Object.keys(chartData[0])
    keys.forEach((element) => {
      if (skipDataFromKeys.includes(element)) {
        return
      }

      // Capitalize first letter of country name
      const countryName = CapitalizeFirstLetter(element)

      // Add space between words in country name
      const countryNameWithSpaces = AddSpaceBetweenCapitalizedWords(countryName)

      // Create dataset for country
      datasets.push({
        label: countryNameWithSpaces,
        data: chartData.map((d) => d[element]),
        backgroundColor: GenerateColorFromName(countryNameWithSpaces),
      })

      // Add country to select options
      countryOptions.push({
        value: element,
        label: countryNameWithSpaces,
      })
    })

    // Combine labels and datasets and return results
    const co2Data = {
      chartData: {
        labels,
        datasets,
      },
      info: info,
    }

    // Set usestate variables
    setco2data(co2Data)
    setSelectCountries(countryOptions)
    setFilteredData({
      labels,
      datasets: [{}],
    })
  }

  /**
   * Refreshes chart data when countries are selected
   */
  const handleChange = (selectedOptions) => {
    let newDatasets = []
    selectedOptions.forEach((element) => {
      // Capitalize and add spaces to countryname
      const countryName = CapitalizeFirstLetter(element.value)
      const countryNameWithSpaces = AddSpaceBetweenCapitalizedWords(countryName)
      const color = GenerateColorFromName(countryNameWithSpaces)

      // Push data to filtered data array
      newDatasets.push({
        label: countryNameWithSpaces,
        data: co2data.chartData.datasets.find((d) => d.label === countryNameWithSpaces).data,
        backgroundColor: color,
        borderColor: color,
        pointRadius: 1,
      })
    })

    // Set usestate variable
    setFilteredData({
      labels: co2data.chartData.labels,
      datasets: newDatasets,
    })
  }

  // Show loading indicator while data is being loaded from API
  if (!co2data) {
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
        {co2data.info.map((i) => (
          <VisuInfo info={i} />
        ))}
      </div>
      <Select options={selectCountries} isMulti onChange={handleChange} />
      <Line options={options} data={filteredData}></Line>
    </div>
  )
}

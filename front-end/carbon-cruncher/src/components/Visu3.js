import React from "react"
import { useEffect, useState } from "react"
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const config = {
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
// horizonal axis of chart
const yearLabels = Array.from(Array(2000 + 1).keys()).slice(1)

export const Visu3 = () => {
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
    ],
  })
  useEffect(() => {
    const fetchData = async () => {
      const url_1 = "https://carbon-cruncher.azurewebsites.net/api/visu3/global"
      const url_2 = "https://carbon-cruncher.azurewebsites.net/api/visu3/event"

      const res_1 = await fetch(url_1)
      const res_2 = await fetch(url_2)
      const dataset_1 = await res_1.json()
      const dataset_2 = await res_2.json()

      // Make new dataset with year. Count year from yearsago and yearkbp value
      const years_1 = dataset_1.map((d) => ({
        year: 2023 - d.yearKbp * 1000,
        globalTempChange: d.globalTempChange,
        co2Ppm: d.co2Ppm,
      }))
      const years_2 = dataset_2.map((d) => ({
        year: 2023 - d.yearsAgo,
        description: d.description,
      }))

      // Get all yearlabels to an array and remove duplicates
      const yearLabels = years_1.map((d) => d.year).concat(years_2.map((d) => d.year))
      const yearLabelsUnique = [...new Set(yearLabels)]

      // Add data to each year from two separate datasets
      let mergedDataset = []
      yearLabelsUnique.forEach((y) => {
        const global = years_1.filter((d) => d.year === y)[0]
        //console.log(global)
        const event = years_2.filter((d) => d.year === y)[0]
        //console.log(event)
        const newDataCell = {
          year: y,
          globalTempChange: global ? global.globalTempChange : null,
          co2Ppm: global ? global.co2Ppm : null,
          event: event ? event.description : null,
        }
        mergedDataset.push(newDataCell)
      })
      const sortedMergedDataset = mergedDataset.sort((a, b) => (a.year > b.year ? 1 : -1))
      console.log(sortedMergedDataset)
      // console.log(years_1)
      // console.log(years_2)
      // const yearLabels = years_1.concat(years_2)
      // const yearLabelsUnique = [...new Set(yearLabels)]
      // console.log(yearLabels)
      // console.log(yearLabelsUnique)

      // .then((tempData) => {
      //   console.log("data", tempData)
      //   const res = tempData.json()
      //   return res
      // })
      // .then((res) => {
      //   console.log("result", res)
      //   for (const val of res) {
      //     dataSet1.push(val.globalTempChange)
      //     dataSet2.push(val.co2Ppm)
      //     // dataSet3.push(val.yearsAgo);
      //   }

      //   setTempData({
      //     labels: yearLabels,
      //     datasets: [
      //       {
      //         type: "line",
      //         label: "Temperature change",
      //         data: dataSet1,
      //         borderColor: "rgb(200, 0, 0)",
      //         backgroundColor: "rgb(200, 0, 0, 0.5)",
      //         pointRadius: 0,
      //         yAxisID: "left-y-axis",
      //       },
      //       {
      //         type: "line",
      //         label: "co2 change",
      //         data: dataSet2,
      //         borderColor: "rgb(0, 100, 200)",
      //         backgroundColor: "rgb(0, 100, 200, 0.5)",
      //         pointRadius: 0,
      //         yAxisID: "right-y-axis",
      //       },
      //       {
      //         type: "line",
      //         label: "Events",
      //         data: dataSet3,
      //         borderColor: "rgb(255, 165, 0)",
      //         backgroundColor: "rgb(255, 165, 0, 0.5)",
      //         pointRadius: 0,
      //         showLine: false,
      //         //yAxisID:'right-y-axis',
      //       },
      //     ],
      //   })
      //   console.log("testData", dataSet1)
      // })
      // .catch((e) => {
      //   console.log("error", e)
      // })
    }
    const fetchData2 = async () => {
      const url_1 = "https://carbon-cruncher.azurewebsites.net/api/visu2/monthly"
      const url_2 = "https://carbon-cruncher.azurewebsites.net/api/visu2/annual"
      const url_3 = "https://carbon-cruncher.azurewebsites.net/api/visu2/icecore"

      const res_1 = await fetch(url_1)
      const res_2 = await fetch(url_2)
      const res_3 = await fetch(url_3)
      const dataset_1 = await res_1.json()
      const dataset_2 = await res_2.json()
      const dataset_3 = await res_3.json()
      console.log(dataset_1)
      console.log(dataset_2)
      console.log(dataset_3)

      // // Make new dataset with year. Count year from yearsago and yearkbp value
      // const years_1 = dataset_1.map((d) => ({
      //   year: 2023 - d.yearKbp * 1000,
      //   globalTempChange: d.globalTempChange,
      //   co2Ppm: d.co2Ppm,
      // }))
      // const years_2 = dataset_2.map((d) => ({
      //   year: 2023 - d.yearsAgo,
      //   description: d.description,
      // }))

      // // Get all yearlabels to an array and remove duplicates
      // const yearLabels = years_1.map((d) => d.year).concat(years_2.map((d) => d.year))
      // const yearLabelsUnique = [...new Set(yearLabels)]

      // // Add data to each year from two separate datasets
      // let mergedDataset = []
      // yearLabelsUnique.forEach((y) => {
      //   const global = years_1.filter((d) => d.year === y)[0]
      //   //console.log(global)
      //   const event = years_2.filter((d) => d.year === y)[0]
      //   //console.log(event)
      //   const newDataCell = {
      //     year: y,
      //     globalTempChange: global ? global.globalTempChange : null,
      //     co2Ppm: global ? global.co2Ppm : null,
      //     event: event ? event.description : null,
      //   }
      //   mergedDataset.push(newDataCell)
      // })
      // const sortedMergedDataset = mergedDataset.sort((a, b) => (a.year > b.year ? 1 : -1))
      // console.log(sortedMergedDataset)
    }
    //fetchData()
    fetchData2()
  }, [])

  return (
    <div style={{ width: "1000px", height: "500px" }}>
      <Line data={tempData} options={config}></Line>;
    </div>
  )
}

export default Visu3

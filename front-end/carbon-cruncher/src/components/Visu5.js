import React from "react";
import { useEffect, useState, useRef } from "react";
import styles from "./Visu5.css"
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
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
//import faker from 'faker'; // not needed in this project
import { GET_VISU5_URL, GET_VISU_INFO } from "../utilities/Config"
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
    responsive: true,
    //maintainAspectRatio: false,
}


export const Visu5 = () => {
    const [sectorData, setSectorData] = useState(null)


    const chartRef = useRef();

    useEffect(() => {
        const getData = async () => {
            const dataRes = await axios.get(GET_VISU5_URL)
            const infoRes = await axios.get(GET_VISU_INFO + "?visunumber=5")
            parseData(dataRes.data, infoRes.data)
        }
        getData()
    }, [])

    const parseData = (chart, info) => {
        const labels = chart.map((d) => d.sector);
        //const labelsString = labels.join(',');
        const colour = labels.map((label) => GenerateColorFromName(label));
        let datasets = []

        datasets.push({
            labels: chart.map((d) => d.sector),
            
            data: chart.map((data) => data.emissionsSharePer),

            backgroundColor: colour, 
            borderWidth: 3,

        })

        chart.forEach((d) => {
            const values = d.visu5Co2subs.map((v) => v.emissionsSharePer);
            const name = d.visu5Co2subs.map((v) => v.sSectorName);
            const colour = name.map((label) => GenerateColorFromName(label));
            datasets.push({
                labels: name,
                data: values,
                backgroundColor: colour,
                borderWidth: 3,
                hidden:true,
            });
        });

        const combData = {
            chart: {
                labels,
                datasets,
            },
            info: info,
        }

        setSectorData(combData)


    };
    const handleClick = (event) => {
        const element = getElementAtEvent(chartRef.current, event);
        if (element.length === 0){
            return;
        }
        let dataset= element[0].datasetIndex;
        let index = element[0].index+1;
        const updatedDatasets = [...sectorData.chart.datasets];
        if (dataset !== 0) {
          // switch to the first sector
          updatedDatasets[dataset].hidden = true;
          dataset = 0;
          updatedDatasets[dataset].hidden = false;
          const newLabels =updatedDatasets[dataset].labels;
          setSectorData({
            ...sectorData,
            chart: {
              ...sectorData.chart,
              labels: newLabels,
              datasets: updatedDatasets,
            },
          });
        } else {
          // switch to another sector
          updatedDatasets[dataset].hidden = true; //hide the current dataset
          updatedDatasets[(index) % updatedDatasets.length].hidden = false; // show the new dataset
          const newLabels = updatedDatasets[(index) % updatedDatasets.length].labels;
          setSectorData({
            ...sectorData,
            chart: {
              ...sectorData.chart,
              labels: newLabels,
              datasets: updatedDatasets,
            },
          });
        }
      }
      
      //Older code, where i tried to create new ones instead of just show and hide
/*     const handleClick = (event) => {
        const element = getElementAtEvent(chartRef.current, event);
      
        if (element.length > 0) {
            const chartData = chartRef.current.data;
            const index = element[0].index;
            const sector = chartData.labels[index];
            const sectorData = chartData.datasets[0].data[index];
            const visu5Co2subs = chartData.datasets[index].hidden ? chartData.datasets[0].visu5Co2subs : chartData.datasets[index].visu5Co2subs;
      
          const subNames = visu5Co2subs.map((d) => d.sSectorName);
          const subEmissions = visu5Co2subs.map((d) => d.emissionsSharePer);
      
          const newChartData = {
            labels: subNames,
            datasets: [
              {
                data: subEmissions,
                backgroundColor: chartData.datasets[0].backgroundColor,
                hoverBackgroundColor: chartData.datasets[0].hoverBackgroundColor,
                visu5Co2subs: visu5Co2subs
              },
            ],
          };
      
          chartRef.current.data = newChartData;
          chartRef.current.update();
        }
      }; */


    if (!sectorData) {
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
                {sectorData.info.map((i) => (
                    <VisuInfo info={i} />
                ))}
            </div>
            <div className={styles.chartStyle}>

                <Doughnut
                    ref={chartRef}
                    options={options}
                    data={sectorData.chart}
                    onClick={handleClick}
                ></Doughnut>
            </div>
        </div>
    )
};


export default Visu5

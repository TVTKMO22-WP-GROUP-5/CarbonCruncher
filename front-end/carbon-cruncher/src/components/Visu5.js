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

    //data: data,
    options: {
        responsive: true,
    },

}


export const Visu5 = () => {
    const [sectorData, setSectorData] = useState(null)
    const [subData, setSubData] = useState({})

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
        //const color = GenerateColorFromName(labels)
        let datasets = []
        const keys = Object.keys(chart[0])
        keys.forEach((sectorData) => {

        })

        datasets.push({
            //label: chart.map((data) => data.visu5Co2subs),

            data: chart.map((data) => data.emissionsSharePer),
            backgroundColor: [
                'rgb(255, 200, 80)',
                'rgb(200, 0, 0)',
                'rgb(0, 0, 200)',
                'rgb(0, 200, 0)'
            ],
            //backgroundColor: GenerateColorFromName(labels), // olis kiva jos sais toimimaan
            borderWidth: 3,


        })

        chart.forEach((d) => {
            const values = d.visu5Co2subs.map((v) => v.emissionsSharePer);
            const name = d.visu5Co2subs.map((v) => v.sSectorName);
            const colour =`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            datasets.push({
                label: name,
                data: values,
                backgroundColor: colour,//GenerateColorFromName(colour),
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
        setSubData({
            labels,
            datasets: [{}],
        })

    };
    const handleClick = (event) => {
        const element = getElementAtEvent(chartRef.current, event);
        const index = element[0].index+1;
        const updatedDatasets = [...sectorData.chart.datasets];
        updatedDatasets[index].hidden = true; // hide the clicked dataset
        updatedDatasets[(index + 1) % updatedDatasets.length].hidden = false; // show the next dataset in a circular manner
        setSectorData({...sectorData, chart: {...sectorData.chart, datasets: updatedDatasets}});
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
            <div className={styles.pie}>

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

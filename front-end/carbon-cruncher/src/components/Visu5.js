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

        datasets.push({
            //label: labels,
            data: chart.map((data) => data.emissionsSharePer),
            backgroundColor: [
                'rgb(255, 200, 80)',
                'rgb(200, 0, 0)',
                'rgb(0, 0, 200)',
                'rgb(0, 200, 0)'
            ],
            // backgroundColor: GenerateColorFromName(labels) , // olis kiva jos sais toimimaan
            borderWidth: 3,


        })

        /*         const subData = {
                    label: 'Carbon data',
                    data: chart.map((data) => data['co2Ppm']),
                    yAxisID: 'right-y-axis',
                    borderColor: "rgb(0, 100, 200)",
                    backgroundColor: "rgb(0, 100, 200, 0.5)",
                    pointRadius: 0,
                } */

        //const datasets = [sectordata]
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
        console.log(getElementAtEvent(chartRef.current, event));
      }
    

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

                <Doughnut ref={chartRef} options={options} data={sectorData.chart} onClick={handleClick}></Doughnut>
            </div>
        </div>
    )
};


export default Visu5
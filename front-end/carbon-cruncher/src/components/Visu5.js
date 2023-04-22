import React from "react";
import { useEffect, useState } from "react";
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
import { Doughnut } from 'react-chartjs-2';
//import faker from 'faker'; // not needed in this project
import { GET_VISU5_URL, GET_VISU_INFO } from "../utilities/Config"
import { VisuInfo } from "./VisuInfo/VisuInfo"
import axios from "axios"

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
    type: 'Doughnut',
    //data: data,
    options: {
        responsive: true,
        
        plugins: {
            legend: {
                position: 'top',
            },
        }
    },

}


export const Visu5 = () => {
    /*const [sectorData, setSectorData] = useState([]);
    const [subData, setSubData] = useState([]);*/
    const [sectorData, setSectorData] = useState(null)


    useEffect(() => {
        const getData = async () => {
            const dataRes = await axios.get(GET_VISU5_URL)
            const infoRes = await axios.get(GET_VISU_INFO + "?visunumber=5")
            parseData(dataRes.data, infoRes.data)
        }
        getData()
    }, [])

    const parseData = (chart, info) => {
        // horizonal axis of chart
        const labels = chart.map((d) => d['sector']);
        //const labels = ['Red', 'Orange', 'Yellow', 'Green',]

        const sectordata = {
            label: 'Sectors',
            data: chart.map((data) => data['emissionsSharePer']),
            backgroundColor: [
                'rgb(255, 200, 80)',
                'rgb(200, 0, 0)',
                'rgb(0, 0, 200)',
                'rgb(0, 200, 0)'
              ],
              borderWidth: 3,
        }

/*         const subData = {
            label: 'Carbon data',
            data: chart.map((data) => data['co2Ppm']),
            yAxisID: 'right-y-axis',
            borderColor: "rgb(0, 100, 200)",
            backgroundColor: "rgb(0, 100, 200, 0.5)",
            pointRadius: 0,
        } */

        const datasets = [sectordata /* subData */]
        const combData = {
            chart: {
                labels,
                datasets,
            },
            info: info,
        }

        setSectorData(combData)

    };

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
            <Doughnut className={styles.pie} options={options} data={sectorData.chart}></Doughnut>
        </div>
    )
};


export default Visu5
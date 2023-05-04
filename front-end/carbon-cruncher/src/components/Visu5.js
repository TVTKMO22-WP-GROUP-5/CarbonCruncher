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

export const Visu5 = () => {
    const [sectorData, setSectorData] = useState(null)
    const [subSectorData, setSubSectorData] = useState(null)
    const [showData, setShowData] = useState(null)
    const [info, setInfo] = useState(null)

    const chartRef = useRef();

    useEffect(() => {
        const getData = async () => {
            const dataRes = await axios.get(GET_VISU5_URL)
            const infoRes = await axios.get(GET_VISU_INFO + "?visunumber=5")
            parseData(dataRes.data, infoRes.data)
        }
        getData()
    }, [])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    const parseData = (chart, info) => {
        // main sector parse
        const mainLabels = chart.map((d) => d.sector)
        const mainDataset = [
            {
                label: "Main Sector",
                data: chart.map((d) => d.emissionsSharePer),
                backgroundColor: chart.map((d) => GenerateColorFromName(d.sector)),
            },
        ]

        const newShowData = {
            name: "main",
            labels: mainLabels,
            datasets: mainDataset,
        }

        // sub sector parse
        let subSectors = []
        chart.forEach((ss) => {
            const ssDataset = {
                label: ss.sector,
                data: ss.visu5Co2subs.map((d) => d.emissionsSharePer),
                backgroundColor: ss.visu5Co2subs.map((d) => GenerateColorFromName(d.sSectorName)),
            }

            subSectors.push({
                name: "sub",
                labels: ss.visu5Co2subs.map((d) => d.sSectorName),
                datasets: [ssDataset],
            })
        })

        setSubSectorData(subSectors)
        setSectorData(newShowData)
        setShowData(newShowData)
        setInfo(info)
    }

    const handleClick = (event) => {
        const element = getElementAtEvent(chartRef.current, event)
        if (element.length === 0) {
            return
        }
        if (showData.name === "main") {
            setShowData(subSectorData[element[0].index])
        }
        else {
            setShowData(sectorData)
        }
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
                {info.map((i) => (
                    <VisuInfo info={i} />
                ))}
            </div>
            <div className={styles.chartStyle}
                style={{ height: "60em" }}>
                <Doughnut
                    ref={chartRef}
                    options={options}
                    data={showData}
                    onClick={handleClick}
                ></Doughnut>
            </div>
        </div>
    )
};

export default Visu5
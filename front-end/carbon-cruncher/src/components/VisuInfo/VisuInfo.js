import React from "react"
import styles from "./VisuInfo.module.css"

export const VisuInfo = ({ info }) => {
  return (
    <div className={styles.container}>
      <h1>{info.title}</h1>
      <p>{info.descriptionText}</p>
      <div className={styles.links}>
        <a href={info.dataLink}>Link to Data</a>
        <a href={info.descriptionLink}>Link to Description</a>
      </div>
    </div>
  )
}

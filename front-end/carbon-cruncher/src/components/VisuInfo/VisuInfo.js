import React from "react"
import styles from "./VisuInfo.module.css"

export const VisuInfo = ({ info }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{info.title}</h1>
      {!info.descriptionText ? <></> : <p>{info.descriptionText}</p>}
      <div className={styles.links}>
        {!info.dataLink ? (
          <></>
        ) : (
          <a href={info.dataLink} target="_blank" rel="noreferrer">
            Link to Data
          </a>
        )}
        {!info.descriptionLink ? (
          <></>
        ) : (
          <a href={info.descriptionLink} target="_blank" rel="noreferrer">
            Link to Description
          </a>
        )}
      </div>
    </div>
  )
}

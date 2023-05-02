import React from "react"
import styles from "./Spinner.module.css"

/**
 * Spinner to represent loading state
 */
export const Spinner = ({ msg }) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p>{msg}</p>
    </div>
  )
}

import React from "react"
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to="/tempco2">
        Temperature & CO2 Data
      </Link>
      <Link className={styles.link} to="/emissions">
        Emission Sources
      </Link>
      <Link className={styles.link} to="/usercustom">
        User Custom View
      </Link>
      <Link className={styles.link} to="/usercustom">
        Logout
      </Link>
    </div>
  )
}

export default Navbar

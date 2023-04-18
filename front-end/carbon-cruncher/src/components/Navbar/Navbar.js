import React from "react"
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../AuthProvider"

const Navbar = () => {
  const { onLogout, user } = React.useContext(AuthContext)

  return (
    <div className={styles.container}>
      <p id="loggedUser">{user}</p>
      <div className={styles.linkContainer}>
        <Link className={styles.link} to="/tempco2">
          Temperature & CO2 Data
        </Link>
        <Link className={styles.link} to="/emissions">
          Emission Sources
        </Link>
        <Link className={styles.link} to="/usercustom">
          User Custom View
        </Link>
        <Link className={styles.link} onClick={onLogout}>
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Navbar

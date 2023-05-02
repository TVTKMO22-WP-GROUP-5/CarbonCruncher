import React from "react"
import styles from "./Navbar.module.css"
import { AuthContext } from "../AuthProvider"
import { Link } from "react-router-dom"
import { imageAssets } from "../../assets/Assets"

const Navbar = () => {
  const { onLogout, onDelete, user } = React.useContext(AuthContext)
  return (
    <div className={styles.container}>
      <p id="loggedUser" className={styles.user}>
        {user}
        <img
          src={imageAssets.icon.deleteIcon}
          alt="delete"
          id="deleteUser"
          className={styles.delete}
          onClick={onDelete}
        ></img>
      </p>
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

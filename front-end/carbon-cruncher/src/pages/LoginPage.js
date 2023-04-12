import React from "react"
import { Assets } from "../assets/Assets"
import { Outlet } from "react-router-dom"

/**
 * Layout for login and registering pages
 */
export const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="loginTitleText">
        <h1>Carbon Cruncher</h1>
        <h2>Climate Data Visualizations</h2>
      </div>
      <div className="loginLogoForm">
        <img src={Assets.logo.noText} alt="logo"></img>
        <Outlet />
      </div>
    </div>
  )
}

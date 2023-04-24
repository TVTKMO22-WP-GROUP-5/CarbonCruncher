import React from "react"
import { imageAssets } from "../assets/Assets"
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
        <img src={imageAssets.logo.noText} alt="logo" id="logo"></img>
        <Outlet />
      </div>
    </div>
  )
}

import React from "react"
import { Outlet } from "react-router-dom"
import { imageAssets } from "../assets/Assets"
import { AuthContext } from "../components/AuthProvider"
import Navbar from "../components/Navbar/Navbar"

/**
 * Layout for chart pages
 */
export const MainPage = () => {
  const context = React.useContext(AuthContext)
  return (
    <div className="mainPage">
      <Navbar context={context} />
      <img src={imageAssets.logo.text} alt="logo" id="logo"></img>
      <Outlet context={context} />
    </div>
  )
}

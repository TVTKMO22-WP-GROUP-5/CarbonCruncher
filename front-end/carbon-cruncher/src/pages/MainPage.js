import React from "react"
import { Outlet } from "react-router-dom"
import { imageAssets } from "../assets/Assets"
import Navbar from "../components/Navbar/Navbar"

/**
 * Layout for chart pages
 */
export const MainPage = () => {
  return (
    <div className="mainPage">
      <Navbar />
      <img src={imageAssets.logo.text} alt="logo" id="logo"></img>
      <Outlet />
    </div>
  )
}

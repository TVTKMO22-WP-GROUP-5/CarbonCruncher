import React from "react"
import { Outlet } from "react-router-dom"
import { Assets } from "../assets/Assets"
import Navbar from "../components/Navbar/Navbar"

/**
 * Layout for chart pages
 */
export const MainPage = () => {
  return (
    <div className="mainPage">
      <Navbar />
      <img src={Assets.logo.text} alt="logo"></img>
      <Outlet />
    </div>
  )
}

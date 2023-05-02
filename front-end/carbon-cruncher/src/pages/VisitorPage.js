import React from "react"
import { imageAssets } from "../assets/Assets"
import { Outlet } from "react-router-dom"

/**
 * Layout for chart pages
 */
export const VisitorPage = () => {
  return (
    <div className="visitorPage">
      <img src={imageAssets.logo.text} alt="logo" id="logo"></img>
      <Outlet />
    </div>
  )
}

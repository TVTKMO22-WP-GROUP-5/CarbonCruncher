import React from "react"
import { Link, Outlet } from "react-router-dom"

/**
 * Layout for chart pages
 */
export const MainPage = () => {
  return (
    <div className="mainPage">
      <h1>MainPage (protected)</h1>
      <Link to="/login">
        <button>login</button>
      </Link>
      <Outlet />
    </div>
  )
}

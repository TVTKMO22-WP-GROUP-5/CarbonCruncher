import React from "react"
import { Link, Outlet } from "react-router-dom"
export const LoginPage = () => {
  return (
    <div className="loginPage">
      <h1>Loginpage (public)</h1>
      <Link to="/main">
        <button>main</button>
      </Link>
      <Outlet />
    </div>
  )
}

import React from "react"
import { Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "./AuthProvider"

const ProtectedRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext)

  if (!token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

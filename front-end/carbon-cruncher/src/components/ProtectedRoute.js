import React from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "./AuthProvider"

const ProtectedRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext)

  if (!token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

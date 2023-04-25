import React from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "./AuthProvider"

/**
 * Protected route handles all routes under authentication
 * User is redirected to login screen if token is missing
 */
const ProtectedRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext)

  if (!token) {
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute

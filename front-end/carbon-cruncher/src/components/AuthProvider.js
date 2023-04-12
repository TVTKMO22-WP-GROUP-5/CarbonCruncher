import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext()

/**
 * User login, logout and token context for components
 */
const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = React.useState(null)

  const handleLogin = async ({ usernick, userpassword }) => {
    const token = await axios.post("/api/user/login", {
      usernick,
      userpassword,
    })
    console.log(token)
    setToken(token)
    navigate("/tempco2")
  }

  const handleLogout = () => {
    setToken(null)
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

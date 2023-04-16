import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"
import { LOGIN_URL, REGISTER_URL } from "../utilities/Config"

export const AuthContext = React.createContext()

/**
 * User login, logout and token context for components
 */
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = React.useState(null)

  /**
   * User login method
   * @param {string} usernick
   * @param {string} userpassword
   */
  const handleLogin = async ({ usernick, userpassword }) => {
    // If validation is succesful save token and navigate to first main screen
    try {
      const token = await axios.post(LOGIN_URL, {
        usernick,
        userpassword,
      })
      setToken(token.data)
      navigate("/tempco2")
    } catch (error) {
      // On error throw it to caller to handle
      throw error
    }
  }

  /**
   * User logout method
   */
  const handleLogout = () => {
    setToken(null)
  }

  /**
   * User register method
   */
  const handleRegister = async ({ usernick, userpassword }) => {
    // If validation is succesful save token and navigate to first main screen
    try {
      const response = await axios.post(REGISTER_URL, {
        usernick,
        userpassword,
      })
      console.log(response)
      navigate("/")
    } catch (error) {
      // On error throw it to caller to handle
      throw error
    }
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

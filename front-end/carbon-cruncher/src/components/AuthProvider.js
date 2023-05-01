import axios from "axios"
import React, { useState } from "react"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { DELETE_USER_URL, LOGIN_USER_URL, NAME_CLAIM, REGISTER_USER_URL } from "../utilities/Config"

export const AuthContext = React.createContext()
const jwtFromStorage = window.localStorage.getItem("appToken")

/**
 * User login, logout and token context for components
 */
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = React.useState(jwtFromStorage)
  const [user, setUser] = useState(jwtFromStorage === null ? null : jwtDecode(jwtFromStorage)[NAME_CLAIM])
  /**
   * User login method
   * @param {string} usernick
   * @param {string} userpassword
   */
  const handleLogin = async ({ usernick, userpassword }) => {
    // If validation is succesful save token and navigate to first main screen
    try {
      const token = await axios.post(LOGIN_USER_URL, {
        usernick,
        userpassword,
      })
      setToken(token.data)
      setUser(jwtDecode(token.data)[NAME_CLAIM])
      window.localStorage.setItem("appToken", token.data)
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
    window.localStorage.removeItem("appToken")
    setToken(null)
    setUser(null)
    navigate("/")
  }

  /**
   * User register method
   */
  const handleRegister = async ({ usernick, userpassword }) => {
    // If validation is succesful save token and navigate to first main screen
    try {
      const response = await axios.post(REGISTER_USER_URL, {
        usernick,
        userpassword,
      })
      console.log(response)
      navigate("/")
    } catch (error) {
      throw error
    }
  }

  /**
   * User delete method
   */
  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`User ${user} will be deleted. Press OK to confirm.`)) {
      return
    }
    try {
      await axios.delete(DELETE_USER_URL + "/" + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      window.localStorage.removeItem("appToken")
      setToken(null)
      setUser(null)
      navigate("/")
    } catch (error) {
      // On error throw it to caller to handle
      throw error
    }
  }

  const value = {
    user,
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onDelete: handleDelete,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

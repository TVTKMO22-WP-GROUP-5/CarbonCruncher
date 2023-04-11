import React from "react"

// Fake token createor. Replaced with real one later
const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("2342f2f1d131rf12"), 250)
  })

const AuthContext = React.createContext()

/**
 * User login, logout and token context for components
 */
const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null)

  const handleLogin = async () => {
    const token = await fakeAuth()
    setToken(token)
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

import React from "react"
import { Link } from "react-router-dom"
import AuthProvider from "../components/AuthProvider"

export const LoginView = () => {
  const authContext = React.useContext(AuthProvider)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { usernick, userpassword } = e.target.elements
    //authContext.login({ usernick: usernick.value, userpassword: userpassword.value })
  }

  return (
    <div className="loginView">
      <form onSubmit={handleSubmit} className="loginForm">
        <input type="text" name="usernick" placeholder="Username" />
        <input type="password" name="userpassword" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account yet?</p>
      <Link to="/register">Sign up!</Link>
    </div>
  )
}

import React from "react"
import { Link } from "react-router-dom"
import AuthProvider from "../components/AuthProvider"

export const RegisterView = () => {
  const authContext = React.useContext(AuthProvider)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { usernick, userpassword } = e.target.elements
    //authContext.login({ usernick: usernick.value, userpassword: userpassword.value })
  }
  return (
    <div className="registerView">
      <form onSubmit={handleSubmit} className="registerForm">
        <input type="text" name="usernick" placeholder="Username" />
        <input type="password" name="userpassword" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Back to login</Link>
    </div>
  )
}

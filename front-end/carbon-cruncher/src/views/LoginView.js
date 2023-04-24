import React, { useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../components/AuthProvider"
import { Spinner } from "../components/Spinner/Spinner"

export const LoginView = () => {
  const { onLogin } = React.useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  /**
   * Handle user login
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { usernick, userpassword } = e.target.elements
    try {
      setLoading(true)
      await onLogin({ usernick: usernick.value, userpassword: userpassword.value })
    } catch (error) {
      switch (error.response.status) {
        case 401:
          alert(
            `Error: ${error.response.status} ${error.response.statusText}. Invalid credentials.`
          )
          break
        default:
          alert(`Error: ${error.response.status} ${error.response.statusText}`)
      }
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className="loginView">
      <form onSubmit={handleSubmit} className="loginForm">
        <input type="text" name="usernick" placeholder="Username" id="loginUsername" />
        <input type="password" name="userpassword" placeholder="Password" id="loginPassword" />
        {loading ? (
          <Spinner />
        ) : (
          <button type="submit" id="submitLogin">
            Login
          </button>
        )}
      </form>
      <p>Don't have an account yet?</p>
      <Link to="/register" id="registerUser">
        Sign up!
      </Link>
    </div>
  )
}

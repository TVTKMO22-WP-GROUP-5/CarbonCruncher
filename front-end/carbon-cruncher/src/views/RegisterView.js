import React, { useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../components/AuthProvider"
import { Spinner } from "../components/Spinner/Spinner"

export const RegisterView = () => {
  const { onRegister } = React.useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { usernick, userpassword, userpasswordconfirm } = e.target.elements

    // If password confirmation is not ok, show alert and clear inputs
    if (userpassword.value !== userpasswordconfirm.value) {
      alert("Password and password confirmation did not match")
      userpassword.value = ""
      userpasswordconfirm.value = ""
      return
    }

    // Try register new user
    try {
      setLoading(true)
      await onRegister({ usernick: usernick.value, userpassword: userpassword.value })
      alert(`User ${usernick.value} was created succesfully`)
    } catch (error) {
      switch (error.response.status) {
        case 400:
          alert(`Error: Invalid credentials. Please try again.`)
          break
        default:
          alert(`Error: ${error.response.status} ${error.response.statusText}`)
      }
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <div className="registerView">
      <div className="tooltip">
        Username and password info (hover over this text)
        <span className="tooltipText">
          A username and a password must be 3-20 characters long.
          <br />
          <br /> A password must include an upper- and a lowercase letter, a number and a special
          character.
        </span>
      </div>
      <form onSubmit={handleSubmit} className="registerForm">
        <input type="text" name="usernick" placeholder="Username" id="registerUserName" />
        <input type="password" name="userpassword" placeholder="Password" id="registerPassword" />
        <input
          type="password"
          name="userpasswordconfirm"
          placeholder="Confirm Password"
          id="registerConfirmPassword"
        />
        {loading ? (
          <Spinner />
        ) : (
          <button type="submit" id="submitRegistration">
            Register
          </button>
        )}
      </form>
      <Link to="/login">Back to login</Link>
    </div>
  )
}

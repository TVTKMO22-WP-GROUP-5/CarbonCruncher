import React from "react"

export const UserCustomView = ({ loggedIn }) => {
  return (
    <div className="userCustomView">
      UserCustomView
      <div>Logged In: {loggedIn === true ? "yes" : "no"}</div>
    </div>
  )
}

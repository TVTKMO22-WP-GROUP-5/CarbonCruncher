import React from "react";

export const UserCustomView = ({ loggedIn }) => {
  return (
    <div>
      UserCustomView
      <div>Logged In: {loggedIn === true ? "yes" : "no"}</div>
    </div>
  );
};

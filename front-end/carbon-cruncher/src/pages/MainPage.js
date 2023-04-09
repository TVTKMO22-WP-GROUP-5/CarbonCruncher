import React from "react";
import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <div className="mainPage">
      <h1>MainPage (protected)</h1>
      <Link to="/login">
        <button>login</button>
      </Link>
    </div>
  );
};

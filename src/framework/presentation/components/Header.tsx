import React from "react";
import { logInOutEvent } from "../viewmodel/slices/AuthSlice";

const Header = () => {
  const isLoggedIn = true;

  const handleLogInOut = () => {
  };

  return (
    <>
      
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Med Coding</span>
        
        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={() => {}}
        >
          {isLoggedIn ? "log Out" : "log In"}
        </button>
      </nav>
    </>
  );
};

export default Header;

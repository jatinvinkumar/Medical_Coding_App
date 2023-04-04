import React, { useState } from "react";
import { logInOutEvent } from "../viewmodel/slices/AuthSlice";
import "./Header.css";
import { UserAuth } from "../../../firebase/AuthContext";

const Header = () => {
  const isLoggedIn = true;

  const {logOut}  = UserAuth()

  const handleLogOut = async () => {
    await logOut()
  };

  return (
    <>
      <nav className={`navbar navbar-dark bg-dark header`}>
        <span className="navbar-brand mb-0 h1">Med Coding</span>
        
        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={() => handleLogOut()}
        > 
          {isLoggedIn ? "Log Out" : "log In"}
        </button>
      </nav>
    </>
  );
};

export default Header;

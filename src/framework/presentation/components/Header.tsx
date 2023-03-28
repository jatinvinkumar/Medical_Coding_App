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
        {/* <button
          className={`btn btn-outline-secondary`}
          onClick={toggleSidebar}
        >
          {sidebarOpen ? "Close" : "Menu"}
        </button> */}
      </nav>

      {/* <div
        className={`sidebar`}
        style={{left: sidebarOpen ? '0' : '-200px'}}
      >
        <a
          href="javascript:void(0)"
          className={`closebtn`}
          onClick={closeSidebar}
        >
          &times;
        </a>
        <div className={`helloWorld`}>Hello World</div>
      </div> */}
    </>
  );
};

export default Header;

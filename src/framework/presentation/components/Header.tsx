import React, { useState } from "react";
import { logInOutEvent } from "../viewmodel/slices/AuthSlice";
import "./Header.css";

const Header = () => {
  const isLoggedIn = true;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogInOut = () => {
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className={`navbar navbar-dark bg-dark header`}>
        <span className="navbar-brand mb-0 h1">Med Coding</span>
        
        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={handleLogInOut}
        > 
          {isLoggedIn ? "Log Out" : "Log In"}
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

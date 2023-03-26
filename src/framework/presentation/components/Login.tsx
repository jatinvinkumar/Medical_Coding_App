import React from 'react';
import './Login.css'; // Import the CSS file for the Login component

const Login = () => {
  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div className="login-google">
        </div>
      </div>
    </div>
  );
};

export default Login;

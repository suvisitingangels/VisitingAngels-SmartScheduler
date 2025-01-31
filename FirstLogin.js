import React, { useState } from 'react';
import './FirstLogin.css'; // Import the CSS file for styling

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">Logo</div>
      </nav>
      <div className="first-login-page-container">
        <form className="first-login-page-form">
          <h2 className="first-login-page-title">Login</h2>
          <div className="first-login-page-form-group">
            <label htmlFor="username" className="first-login-page-label">Username</label>
            <input
              type="text"
              id="username"
              className="first-login-page-input"
              placeholder="Enter your username"
            />
          </div>
          <div className="first-login-page-form-group">
            <label htmlFor="password" className="first-login-page-label">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="first-login-page-input"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="first-login-page-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

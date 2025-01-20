/**
     * LoginPage Component
     * 
     * This component renders a login page with a form for entering a username and password.
     * Styles are applied from an external CSS file, `FirstLogin.css`.
*/

import React from 'react';
import './FirstLogin.css';

const LoginPage = () => {
  return (
    <div className="first-login-page-container">
      
      {/* Login Form */}
      <form className="first-login-page-form">
        <h2 className="first-login-page-title">Login</h2>
        
        
        {/* Username Input Field */}
        <div className="first-login-page-form-group">
          <label htmlFor="username" className="first-login-page-label">Username:</label>
          <input
            type="text"
            id="username"
            className="first-login-page-input"
            placeholder="Enter your username"
          />
        </div>
        
        {/* Password Input Field */}
        <div className="first-login-page-form-group">
          <label htmlFor="password" className="first-login-page-label">Password:</label>
          <input
            type="password"
            id="password"
            className="first-login-page-input"
            placeholder="Enter your password"
          />
        </div>
        
        
        {/* Submit Button */}
        <button type="submit" className="first-login-page-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

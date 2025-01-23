/**
     * LoginPage Component
     * 
     * This component renders a login page with a form for entering a username and password.
     * Styles are applied from an external CSS file, `FirstLogin.css`.
*/
import React from "react";
import './FirstLogin.css';
import LoginButton from '../Scheduler/Components/Login/loginbutton';


const LoginPage = () => {
    return (
        <div className="first-login-page-container">
            <h2 className="first-login-page-title">Login</h2>
            <LoginButton />
        </div>
    );
};

export default LoginPage;

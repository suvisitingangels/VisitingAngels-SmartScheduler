// src/components/common/Navbar.js

/**
 * Navbar Component
 *
 * A reusable navigation bar component that provides links to different pages of the application.
 * Uses React Router's `Link` component for client-side navigation.
 */


import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
                <img src="https://i.imgur.com/GSKsNA8.png" alt="logo"></img>
            <div>
                <Link to="/caregiver/availability" className="navbar-link">Availability</Link>
                <Link to="/caregiver/profile" className="navbar-link">Profile</Link>
            </div>
        </nav>
    );
}

export default Navbar;


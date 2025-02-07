// src/components/common/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
        <a href="http://localhost:3000/scheduler">
            <img src="https://i.imgur.com/GSKsNA8.png" alt="logo"></img>
        </a>
        <div className="navbar-links">
            <Link to="/scheduler/find-caregiver" className="navbar-link">Find Caregiver</Link>
            <Link to="/scheduler/loaddata" className="navbar-link">Load Data</Link>
            <Link to="/scheduler/availability" className="navbar-link">Availability</Link>
      </div>
    </nav>
  );
}

export default Navbar;


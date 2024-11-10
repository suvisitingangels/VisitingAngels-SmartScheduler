// src/components/common/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-links">
        <Link to="/scheduler" className="navbar-link">Home</Link>
        <Link to="/scheduler/find-caregiver" className="navbar-link">Find Caregiver</Link>
        <Link to="/scheduler/loaddata" className="navbar-link">Load</Link>
        <Link to="/scheduler/availability" className="navbar-link">Availability</Link>
      </div>
    </nav>
  );
}

export default Navbar;

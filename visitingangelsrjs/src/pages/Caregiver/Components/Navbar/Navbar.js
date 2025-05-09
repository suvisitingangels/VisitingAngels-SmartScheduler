// src/pages/Caregiver/Components/Navbar\Navbar.js

/**
 * Navbar Component
 *
 * A reusable navigation bar component that provides links to different pages of the application.
 * Uses React Router's `Link` component for client-side navigation.
 */

import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../../../components/Navbar.css';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
	const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode(token).username : '';
	const role = token ? jwtDecode(token).role : "";

	function handleNavigate() {
		navigate('/caregiver/home')
	}

    return (
		<nav className="navbar">
			<img src="https://i.imgur.com/GSKsNA8.png" alt="logo" onClick={handleNavigate}/>
			<div>
				{role === "admin" && <Link to="/scheduler/load-data" className={"navbar-link"}>To Scheduler</Link>}
				<Link to="/caregiver/availability" className="navbar-link">Availability</Link>
				<Link to={`/caregiver/profile/${userId}`} className="navbar-link">Profile</Link>
			</div>
		</nav>
	);
}

export default Navbar;


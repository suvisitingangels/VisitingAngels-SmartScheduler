// visitingangelsrjs/src/pages/Scheduler/Components/Navbar/SchedulerNavbar.js

/**
 * Navbar Component
 *
 * A reusable navigation bar component that provides links to different pages of the application.
 * Uses React Router's `Link` component for client-side navigation.
 */

import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../../../components/Navbar.css'
import {jwtDecode} from "jwt-decode";

function SchedulerNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const role = token ? jwtDecode(token).role : "";

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<nav className="navbar">
			<img src="https://i.imgur.com/GSKsNA8.png" alt="logo" onClick={() => navigate("/scheduler/find-caregiver")}/>
			<div className="hamburger" onClick={toggleMenu}>
				&#9776;
			</div>
			<div className={`links ${isOpen ? 'open' : ''}`}>
				{role === "admin" && <Link to="/caregiver/home" className="navbar-link"
				onClick={() => setIsOpen(false)}>To Caregiver</Link>}
				<Link to="/scheduler/find-caregiver" className="navbar-link"
				onClick={() => setIsOpen(false)}>Find Caregiver</Link>
				<Link to="/scheduler/load-data" className="navbar-link"
				onClick={() => setIsOpen(false)}>Load Data</Link>
				<Link to="/scheduler/availability" className="navbar-link"
				onClick={() => setIsOpen(false)}>Availability</Link>
			</div>
		</nav>
	);
}

export default SchedulerNavbar;


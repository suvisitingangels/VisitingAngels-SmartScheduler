// visitingangelsrjs/src/pages/Scheduler/Components/Navbar/SchedulerNavbar.js

/**
 * Navbar Component
 *
 * A reusable navigation bar component that provides links to different pages of the application.
 * Uses React Router's `Link` component for client-side navigation.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import '../../../../components/Navbar.css'
import {jwtDecode} from "jwt-decode";

function SchedulerNavbar() {
	const token = localStorage.getItem('token');
	const role = token ? jwtDecode(token).role : "";

	return (
		<nav className="navbar">
			<img src="https://i.imgur.com/GSKsNA8.png" alt="logo"></img>
			<div className={"links"}>
				{role === "admin" && <Link to="/caregiver/home" className={"navbar-link"}>To Caregiver</Link>}
				<Link to="/scheduler/find-caregiver" className="navbar-link">Find Caregiver</Link>
				<Link to="/scheduler/load-data" className="navbar-link">Load Data</Link>
				<Link to="/scheduler/availability" className="navbar-link">Availability</Link>
			</div>
		</nav>
	);
}

export default SchedulerNavbar;


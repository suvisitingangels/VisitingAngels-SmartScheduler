// src/App.js

/**
 * The App.js file is the main entry point for the app's structure and routing setup.
 * It uses React Router to define navigation paths for each page, including Home, Find Caregiver, and Load Data, and includes a Navbar component for easy navigation across all pages.
 * Wrapped in a <Router>, the <Routes> block specifies each path and its corresponding component, while the NotFound component acts as a catch-all for undefined routes, ensuring users see a 404 page for invalid URLs.
 * This setup provides a structured and user-friendly navigation flow across the application.
 */

import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Navbar from './pages/Scheduler/Components/Navbar/Navbar';
import FindCaregiver from './pages/Scheduler/FindCaregiver/FindCaregiver';
import LoadData from './pages/Scheduler/LoadData/LoadData';
import Availability from './pages/Scheduler/Availability/Availability';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/FirstLogin/FirstLogin';
import PrivateRoute from './components/PrivateRoute';
import CaregiverAvailability from './pages/Caregiver/Availability/Availability.js';
import Profile from "./pages/Caregiver/Profile/Profile";


// Component to conditionally render Navbar
const AppLayout = ({children}) => {
	const location = useLocation();
	const token = localStorage.getItem('token');

	// Show Navbar only if the user is logged in and not on the login page
	const showNavbar = token && location.pathname !== '/';

	return (
		<>
			{showNavbar && <Navbar/>}
			{children}
		</>
	);
};

function App() {
	return (
		<Router>
			<AppLayout>
				<Routes>
					<Route path="/" element={<Login/>}/>
					<Route path="/scheduler/find-caregiver" element={<PrivateRoute allowedRoles={['scheduler','admin']}><FindCaregiver/></PrivateRoute>}/>
					<Route path="/scheduler/load-data" element={<PrivateRoute allowedRoles={['scheduler','admin']}><LoadData/></PrivateRoute>}/>
					<Route path="/scheduler/availability" element={<PrivateRoute allowedRoles={['scheduler','admin']}><Availability/></PrivateRoute>}/>
					<Route path="/caregiver/availability" element={<PrivateRoute allowedRoles={['caregiver','admin']}><CaregiverAvailability/></PrivateRoute>}/>
					<Route path="/caregiver/profile" element={<PrivateRoute allowedRoles={['caregiver','admin']}><Profile/></PrivateRoute>}/>
					<Route path="*" element={<NotFound/>}/>
				</Routes>
			</AppLayout>
		</Router>
	);
}

export default App;

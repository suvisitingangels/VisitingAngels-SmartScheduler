// src/App.js

/*
The App.js file is the main entry point for the app's structure and routing setup. 
It uses React Router to define navigation paths for each page, including Home, Find Caregiver, and Load Data, and includes a Navbar component for easy navigation across all pages. 
Wrapped in a <Router>, the <Routes> block specifies each path and its corresponding component, while the NotFound component acts as a catch-all for undefined routes, ensuring users see a 404 page for invalid URLs. 
This setup provides a structured and user-friendly navigation flow across the application.
*/

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Scheduler/Components/Navbar/Navbar';
import Home from './pages/Scheduler/Home/Home';
import FindCaregiver from './pages/Scheduler/FindCaregiver/FindCaregiver';
import LoadData from './pages/Scheduler/LoadData/LoadData';
import Availability from './pages/Scheduler/Availability/Availability';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/FirstLogin/FirstLogin';
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Router>
      {/* Conditionally render the Navbar only for routes other than "/login" */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/scheduler" element={<Home />} />
                <Route path="/scheduler/find-caregiver" element={<FindCaregiver />} />
                <Route path="/scheduler/loaddata" element={<LoadData />} />
                <Route path="/scheduler/availability" element={<Availability />} />
                <Route path="/scheduler/profile" element={<Profile />} />

                <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

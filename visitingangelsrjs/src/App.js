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
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FindCaregiver from './pages/FindCaregiver';
import LoadData from './pages/LoadData';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-caregiver" element={<FindCaregiver />} />
        <Route path="/loaddata" element={<LoadData />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;

// src/pages/FindCaregiver.js

import React from 'react';
import './FindCaregiver.css';

function FindCaregiver() {
  return (
    <div className="find-caregiver-container">
      {/* Sidebar for filtering options */}
      <aside className="filter-sidebar">
        <h2>Filter Options</h2>
        <div className="filter-options">
          <div className="filter-option">
            <input type="checkbox" id="availability" />
            <label htmlFor="availability">Available Now</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="experience" />
            <label htmlFor="experience">Experienced</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="rating" />
            <label htmlFor="rating">Highly Rated</label>
          </div>
        </div>

        {/* New Location Section */}
        <hr className="divider" />
        <h2>Location</h2>
        <div className="location-options">
          <div className="filter-option">
            <input type="checkbox" id="city1" />
            <label htmlFor="city1">City 1</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="city2" />
            <label htmlFor="city2">City 2</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="city3" />
            <label htmlFor="city3">City 3</label>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <section className="caregiver-list">
        <h1>Find Caregiver</h1>
        <p>Welcome to the Find Caregiver page.</p>
      </section>
    </div>
  );
}

export default FindCaregiver;

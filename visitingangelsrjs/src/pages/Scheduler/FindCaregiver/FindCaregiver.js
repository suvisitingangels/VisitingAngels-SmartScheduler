// src/pages/Scheduler/FindCaregiver.js

import React from 'react';
import './FindCaregiver.css';
import FilterCriteria from './components/FilterClasses';
import SearchBar from './components/SearchBar';
import DateCarousel from './components/DateCarousel';


function FindCaregiver() {
  return (
    <div className="find-caregiver-container">
      {/* Sidebar for filtering options */}
      <aside className="find-caregiver-filter-sidebar">
        <FilterCriteria /> {/* Imported FilterCriteria component */}
      </aside>

      {/* Main content area */}
      <section className="find-caregiver-caregiver-list">
        <SearchBar></SearchBar>
        <hr className="find-caregiver-divider" />
        <DateCarousel></DateCarousel>
      </section>
    </div>
  );
}

export default FindCaregiver;

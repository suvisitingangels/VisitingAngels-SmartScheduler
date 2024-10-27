// src/pages/FindCaregiver.js

import React from 'react';
import './FindCaregiver.css';
import FilterCriteria from './components/FilterClasses';
import SearchBar from './components/SearchBar';
import DateCarousel from './components/DateCarousel';


function FindCaregiver() {
  return (
    <div className="find-caregiver-container">
      {/* Sidebar for filtering options */}
      <aside className="filter-sidebar">
        <FilterCriteria /> {/* Imported FilterCriteria component */}
      </aside>

      {/* Main content area */}
      <section className="caregiver-list">
        <SearchBar></SearchBar>
        <hr className="divider" />
        <DateCarousel></DateCarousel>
      </section>
    </div>
  );
}

export default FindCaregiver;

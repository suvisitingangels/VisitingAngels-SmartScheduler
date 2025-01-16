// src/pages/Scheduler/FindCaregiver.js

import React from 'react';
import './FindCaregiver.css';
import FilterCriteria from './components/FilterClasses';
import SearchBar from './components/SearchBar';
import DateCarousel from './components/DateCarousel';
import CaregiverData from './components/CaregiverData';



function FindCaregiver() {
  return (
    <div className="find-caregiver-container">
      <aside className="find-caregiver-filter-sidebar">
        <FilterCriteria /> 
      </aside>

      <section className="find-caregiver-caregiver-list">
        <SearchBar></SearchBar>
        <hr className="find-caregiver-divider" />
        <DateCarousel></DateCarousel>
        <CaregiverData></CaregiverData>
      </section>
    </div>
  );
}

export default FindCaregiver;

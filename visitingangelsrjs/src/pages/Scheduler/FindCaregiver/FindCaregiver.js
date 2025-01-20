// src/pages/Scheduler/FindCaregiver/FindCaregiver.js

/**
     * FindCaregiver Component
     * 
     * This component serves as the main page for finding caregivers.
     * It combines filtering, searching, and date-based selection to display relevant caregiver data.
     * The component fetches caregiver data, applies filtering, and dynamically updates the displayed list.
     * 
     * @returns {JSX.Element} - A fully functional caregiver search interface.
*/
import React, { useState } from 'react';
import './FindCaregiver.css';
import DateCarousel from './components/DateCarousel';
import CaregiverData from './components/CaregiverDataDate';
import SearchBar from './components/SearchBar';
import FilterCriteria from './components/FilterClasses';
import useFetchCaregiverData from './components/hooks/useFetchCaregiverData.js';
import filterCaregiversDate from './components/utils/filterCaregiverDate';

function FindCaregiver() {
  // State to store the selected date from the carousel
  const [selectedDate, setSelectedDate] = useState(null);
  // Fetch caregiver data and date options using a custom hook
  const { caregivers, dates, loading, error } = useFetchCaregiverData();
  // Filter caregivers based on the selected date
  const filteredCaregiversDate = filterCaregiversDate(caregivers, selectedDate);

  return (
    <div className="find-caregiver-container">
      <aside className="find-caregiver-filter-sidebar">
        
        <FilterCriteria />
      
      </aside>
      <section className="find-caregiver-caregiver-list">
        
        <SearchBar />
        
        <hr className="find-caregiver-divider" />
        
        <DateCarousel dates={dates} onDateSelect={setSelectedDate} />
        
        <CaregiverData caregivers={filteredCaregiversDate} />
        
        {loading && <p>Loading data...</p>}
        {error && <p className="error-message">{error}</p>}
      
      </section>
    </div>
  );
}

export default FindCaregiver;

import React, { useState } from 'react';
import './FindCaregiver.css';
import DateCarousel from './components/DateCarousel';
import CaregiverData from './components/CaregiverData';
import SearchBar from './components/SearchBar';
import FilterCriteria from './components/FilterClasses';
import useFetchCaregiverData from './components/hooks/useFetchCaregiverData.js';
import filterCaregivers from './components/utils/filterCaregiverData';

function FindCaregiver() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { caregivers, dates, loading, error } = useFetchCaregiverData();

  const filteredCaregivers = filterCaregivers(caregivers, selectedDate);

  return (
    <div className="find-caregiver-container">
      <aside className="find-caregiver-filter-sidebar">
        <FilterCriteria />
      </aside>
      <section className="find-caregiver-caregiver-list">
        <SearchBar />
        <hr className="find-caregiver-divider" />
        <DateCarousel dates={dates} onDateSelect={setSelectedDate} />
        <CaregiverData caregivers={filteredCaregivers} />
        {loading && <p>Loading data...</p>}
        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
}

export default FindCaregiver;

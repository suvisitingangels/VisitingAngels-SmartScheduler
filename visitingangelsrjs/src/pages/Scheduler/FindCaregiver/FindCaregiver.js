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
import React, {useEffect, useState} from 'react';
import './FindCaregiver.css';
import DateCarousel from './components/DateCarousel';
import CaregiverDataDate from './components/CaregiverDataDate';
import SearchBar from './components/SearchBar';
import FilterCriteria from './components/FilterClasses';
import useFetchFilterClasses from './components/hooks/useFetchFilterClasses';
import useFetchCaregiverData from './components/hooks/useFetchCaregiverData';
import filterCaregiversDate from './components/utils/filterCaregiverDate';
import filterCaregiverClasses from './components/utils/filterCaregiversClasses';
import useFetchFullFilterClassesData from './components/hooks/useFetchFullFilterClasses';



function FindCaregiver() {
    const [selectedDate, setSelectedDate] = useState(null);
    const { caregivers, dates, loading, error } = useFetchCaregiverData();
    const filteredCaregiversDate = filterCaregiversDate(caregivers, selectedDate, dates);
    const { filterClasses, loading: filtersLoading, error: filtersError } = useFetchFilterClasses();
    const { fullFilterClasses} = useFetchFullFilterClassesData();
    const [activeFilters, setActiveFilters] = useState([]);
    const finalFilteredCaregivers = filterCaregiverClasses(fullFilterClasses, filteredCaregiversDate, activeFilters);
    const [searchQuery, setSearchQuery] = useState('');

        useEffect(() => {
            document.title = "Find Caregivers | SmartScheduler";
        }, []);

    const handleCheckboxChange = (filter, isChecked) => {
        const updatedFilters = isChecked
          ? [...activeFilters, filter]
          : activeFilters.filter((f) => f !== filter);
        setActiveFilters(updatedFilters);
    };

    const displayedCaregivers = finalFilteredCaregivers.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="find-caregiver-container">
            <aside className="find-caregiver-filter-sidebar">
                <FilterCriteria filterClasses={filterClasses} onCheckboxChange={handleCheckboxChange} />
                {filtersLoading && <p>Loading filters...</p>}
                {filtersError && <p className="error-message">{filtersError}</p>}
            </aside>
            <section className="find-caregiver-caregiver-list">
                <SearchBar query={searchQuery} onSearch={setSearchQuery} />
                <hr className="find-caregiver-divider" />
                <DateCarousel dates={dates} onDateSelect={setSelectedDate} />
                <CaregiverDataDate caregivers={displayedCaregivers} />
                {loading && <p>Loading data...</p>}
                {error && <p className="error-message">{error}</p>}
            </section>
        </div>
    );
}

export default FindCaregiver;
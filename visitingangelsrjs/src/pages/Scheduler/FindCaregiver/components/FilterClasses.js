// src/pages/scheduler/components/FilterCriteria.js

/**
     * FilterCriteria Component
     * 
     * Displays filtering options for caregivers, allowing users to filter by general criteria and location.
     * The filtering options are dynamically rendered based on data from `FilterClassesData`.
     * 
     * @returns {JSX.Element} - A set of filter options grouped by general criteria and location.
*/
import React from 'react';
import './FilterClasses.css';
import filterCriteriaData from '../../../../data/FilterClassesData';

function FilterCriteria() {
    return (
        <div>
            <h2>Filter Options</h2>
            <div className="find-caregiver-filter-options">
                {filterCriteriaData.generalFilters.map((filter) => (
                    <div key={filter.id} className="find-caregiver-filter-option">
                        <input type="checkbox" id={filter.id} />
                        <label htmlFor={filter.id}>{filter.label}</label>
                    </div>
                ))}
            </div>

            <hr className="find-caregiver-divider" />
            <h2>Location</h2>
            <div className="find-caregiver-location-filter-options">
                {filterCriteriaData.locationFilters.map((filter) => (
                    <div key={filter.id} className="find-caregiver-location-filter-option">
                        <input type="checkbox" id={filter.id} />
                        <label htmlFor={filter.id}>{filter.label}</label>
                    </div>
                ))}
            </div>
            <hr className="find-caregiver-divider" />
        </div>
    );
}

export default FilterCriteria;

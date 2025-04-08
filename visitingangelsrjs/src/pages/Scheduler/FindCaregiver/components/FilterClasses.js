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

function FilterCriteria({ filterClasses, onCheckboxChange }) {
    
    const handleChange = (e) => {
      const { id, checked } = e.target;
      onCheckboxChange(id, checked);
    };

    return (
        <div>
            <h2>Filter Options</h2>
            <div className="find-caregiver-filter-options">
                {filterClasses.map((filter) => (
                    <div key={filter} className="find-caregiver-filter-option">
                        <input type="checkbox" id={filter} onChange={handleChange} />
                        <label htmlFor={filter}>{filter}</label>
                    </div>
                ))}
            </div>
            <hr className="find-caregiver-divider" />
        </div>
    );
}

export default FilterCriteria;



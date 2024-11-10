// src/pages/scheduler/components/FilterCriteria.js

import React from 'react';
import './FilterClasses.css';
import filterCriteriaData from '../../../../data/FilterClassesData';

function FilterCriteria() {
    return (
        <div>
            {/* General Filter Options */}
            <h2>Filter Options</h2>
            <div className="find-caregiver-filter-options">
                {filterCriteriaData.generalFilters.map((filter) => (
                    <div key={filter.id} className="find-caregiver-filter-option">
                        <input type="checkbox" id={filter.id} />
                        <label htmlFor={filter.id}>{filter.label}</label>
                    </div>
                ))}
            </div>

            {/* Divider and Location Section */}
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

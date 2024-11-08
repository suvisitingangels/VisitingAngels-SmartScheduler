// src/pages/scheduler/components/FilterCriteria.js

import React from 'react';
import './FilterClasses.css';
import filterCriteriaData from '../../../../data/FilterClassesData';

function FilterCriteria() {
    return (
        <div>
            {/* General Filter Options */}
            <h2>Filter Options</h2>
            <div className="filter-options">
                {filterCriteriaData.generalFilters.map((filter) => (
                    <div key={filter.id} className="filter-option">
                        <input type="checkbox" id={filter.id} />
                        <label htmlFor={filter.id}>{filter.label}</label>
                    </div>
                ))}
            </div>

            {/* Divider and Location Section */}
            <hr className="divider" />
            <h2>Location</h2>
            <div className="location-filter-options">
                {filterCriteriaData.locationFilters.map((filter) => (
                    <div key={filter.id} className="location-filter-option">
                        <input type="checkbox" id={filter.id} />
                        <label htmlFor={filter.id}>{filter.label}</label>
                    </div>
                ))}
            </div>
            <hr className="divider" />
        </div>
    );
}

export default FilterCriteria;

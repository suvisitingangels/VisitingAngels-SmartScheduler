// src/pages/scheduler/components/SearchBar.js

/**
     * SearchBar Component
     * 
     * This component provides a search input field and a button for querying caregiver names.
     * The search query is managed in the component's state and can be passed to other components
     * or APIs for filtering or searching functionality.
     * 
     * @returns {JSX.Element} - A styled search bar with input and button elements.
*/

import React from 'react';
import './SearchBar.css';

function SearchBar({ query, onSearch }) {

  return (
    <div className="find-caregiver-search-bar">
      <input
        type="text"
        value={query}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search for a caregiver’s name"
      />
      <button onClick={() => onSearch(query)}>Search</button>
    </div>
    
  );
}

export default SearchBar;

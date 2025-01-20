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

import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', query);
  };

  return (
    <div className="find-caregiver-search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a caregiver's name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
    
  );
}

export default SearchBar;

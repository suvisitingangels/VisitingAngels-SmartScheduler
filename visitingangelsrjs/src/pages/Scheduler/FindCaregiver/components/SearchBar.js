// src/pages/scheduler/components/SearchBar.js

import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', query);
    // Here you can later add functionality to filter caregivers based on the query
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

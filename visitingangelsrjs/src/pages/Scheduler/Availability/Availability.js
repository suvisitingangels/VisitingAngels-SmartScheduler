// src/pages/Scheduler/Availability/Availability.js

import React, { useState } from 'react';
import './Availability.css';

function Availability() {
  const [formData, setFormData] = useState({
    caregiverName: '',
    date: '',
    time: '',
    action: 'Add',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="availability-container">
      <div className="availability-header">
        <h2>Update Caregiver's Availability</h2>
      </div>
      
      <form className="availability-form" onSubmit={handleSubmit}>
        <h3>Enter Availability</h3>
        
        <label>
          Caregiver Name:
          <input
            type="text"
            name="caregiverName"
            value={formData.caregiverName}
            onChange={handleChange}
            placeholder="Enter caregiver's name"
          />
        </label>
        
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </label>

        {/* Add/Remove Dropdown */}
        <label>
          Action:
          <select name="action" value={formData.action} onChange={handleChange}>
            <option value="Add">Add</option>
            <option value="Remove">Remove</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Availability;

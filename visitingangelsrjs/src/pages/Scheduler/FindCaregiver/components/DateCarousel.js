// src/pages/Scheduler/FindCaregiver/components/DateCarousel.js

/**
     * DateCarousel Component
     * 
     * A horizontal carousel for displaying a list of dates, allowing users to scroll through
     * the dates and select one. Includes previous/next buttons for navigation and highlights
     * the selected date.
     * 
     * @param {Array} dates - Array of date objects, each containing `fullDate` (string) and optionally other details.
     * @param {Function} onDateSelect - Callback function triggered when a date is selected. Receives the selected date as a parameter.
*/
import React, { useState } from 'react';
import './DateCarousel.css';

function DateCarousel({ dates, onDateSelect }) {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const showPrevious = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const showNext = () => {
    if (startIndex < dates.length - 7) setStartIndex(startIndex + 1);
  };

  /**
       * Handle date selection.
       * Updates the selected date index and triggers the `onDateSelect` callback.
       * 
       * @param {number} index - Index of the selected date.
  */
    const handleDateClick = (index) => {
        const newSelectedIndex = index === selectedIndex ? null : index; // check if index is new
        setSelectedIndex(newSelectedIndex); // set null if not (unselect) or set select to that index

        // if (new) selected index is present then set date. if date is null all caregivers are returned from filterCaregiversDate(caregivers, selectedDate)
        if (onDateSelect)
            onDateSelect(newSelectedIndex !== null ? dates[newSelectedIndex] : null); 
    };

  const formatFullDay = (dateStr) => {
    const date = new Date(dateStr.fullDate); 
    return date.toLocaleDateString('en-US', { weekday: 'long' }); 
  };

  return (
    <div className="find-caregiver-date-carousel">
      <button onClick={showPrevious} disabled={startIndex === 0}>◀</button>
      <div className="find-caregiver-date-list-wrapper">
        <div
          className="find-caregiver-date-list"
          style={{ transform: `translateX(-${startIndex * 200}px)` }}
        >
          {dates.map((date, index) => (
            <div
              key={index}
              className={`find-caregiver-date-item ${index === selectedIndex ? 'selected' : ''}`} 
              onClick={() => handleDateClick(index)}
            >
              <div className="find-caregiver-day">{formatFullDay(date)}</div>
              <div className="find-caregiver-actual-date">{date.fullDate}</div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={showNext} disabled={startIndex >= dates.length - 7}>▶</button>
    </div>
  );
}

export default DateCarousel;

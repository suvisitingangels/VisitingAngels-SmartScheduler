// src/pages/scheduler/components/DateCarousel.js

import React, { useState } from 'react';
import './DateCarousel.css';

function DateCarousel() {
  const startDate = new Date(2024, 9, 21);
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected date

  const formatDay = (date) => date.toLocaleDateString('en-US', { weekday: 'long' });
  const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

  const showPrevious = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const showNext = () => {
    if (startIndex < dates.length - 7) setStartIndex(startIndex + 1);
  };

  const handleDateClick = (index) => {
    setSelectedIndex(index); // Update selected date index
  };

  return (
    <div className="date-carousel">
      <button onClick={showPrevious} disabled={startIndex === 0}>◀</button>
      <div className="date-list-wrapper">
        <div
          className="date-list"
          style={{ transform: `translateX(-${startIndex * 200}px)` }}
        >
          {dates.map((date, index) => (
            <div
              key={index}
              className={`date-item ${index === selectedIndex ? 'selected' : ''}`} // Conditionally apply class
              onClick={() => handleDateClick(index)}
            >
              <div className="day">{formatDay(date)}</div>
              <div className="actual-date">{formatDate(date)}</div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={showNext} disabled={startIndex >= dates.length - 7}>▶</button>
    </div>
  );
}

export default DateCarousel;

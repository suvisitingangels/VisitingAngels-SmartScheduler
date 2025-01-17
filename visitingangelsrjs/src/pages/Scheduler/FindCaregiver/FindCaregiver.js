import React, { useState, useEffect } from 'react';
import './FindCaregiver.css';
import FilterCriteria from './components/FilterClasses';
import SearchBar from './components/SearchBar';
import DateCarousel from './components/DateCarousel';
import CaregiverData from './components/CaregiverData';
import axios from 'axios';

function FindCaregiver() {
  const [caregivers, setCaregivers] = useState([]);
  const [dates, setDates] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaregiverData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/csv-data');
        const data = response.data.data;

        const processedCaregivers = data.map((details) => {
          const name = details['Caregiver Name'] || 'Unknown Caregiver';
          const workingHours = Object.entries(details)
            .filter(([key, value]) => key.includes('/') && value)
            .map(([date, hours]) => `${date}: ${hours}`)
            .join(', ');

          return {
            name,
            workingHours: workingHours || 'Not Scheduled',
          };
        });

        setCaregivers(processedCaregivers);

        const allDates = Array.from(
          new Set(
            data.flatMap((caregiver) =>
              Object.keys(caregiver).filter((key) => key.includes('/'))
            )
          )
        ).sort((a, b) => new Date(a) - new Date(b)); 

        const formattedDates = allDates.map((dateStr) => ({
          day: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
          fullDate: dateStr,
        }));

        setDates(formattedDates);
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiverData();
  }, []);

  return (
    <div className="find-caregiver-container">
      <aside className="find-caregiver-filter-sidebar">
        <FilterCriteria />
      </aside>

      <section className="find-caregiver-caregiver-list">
        <SearchBar />
        <hr className="find-caregiver-divider" />
        <DateCarousel dates={dates} />
        <CaregiverData caregivers={caregivers} />
        {loading && <p>Loading data...</p>}
        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
}

export default FindCaregiver;

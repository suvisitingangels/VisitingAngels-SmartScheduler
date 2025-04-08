// VisitingAngelsSURJS/visitingangelsrjs/src/pages/Scheduler/FindCaregiver/components/hooks/useFetchCaregiverData.js

/**
     * useFetchCaregiverData Hook
     * 
     * A custom React hook to fetch, process, and manage caregiver data and associated schedule dates.
     * Handles API requests, data processing, and state management for caregiver information.
*/

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchCaregiverData() {
  const [caregivers, setCaregivers] = useState([]);
  const [dates, setDates] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
         * Fetch caregiver data from the API.
         * 
         * Makes a GET request to the server, processes the data to extract caregiver schedules,
         * formats the schedule dates, and updates the respective state variables.
    */
    const fetchCaregiverData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/csv-data');

        const data = response.data.data;
        
        const processedCaregivers = data.map((details) => {
            const rawName = details['Caregiver Name'] || 'Unknown Caregiver';
            const name = rawName.replace(/\s*\[Caregiver\]$/, ''); // filter out tag for space
            const schedule = Object.entries(details)
              .filter(([key, value]) => key.includes('/') && value) 
              .reduce((acc, [date, hours]) => ({ ...acc, [date]: hours }), {});
          
            return { name, schedule };
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
        console.error('Error fetching caregiver data:', err);
        setError(err.response?.data?.error || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiverData();
  }, []);

  return { caregivers, dates, loading, error };
}

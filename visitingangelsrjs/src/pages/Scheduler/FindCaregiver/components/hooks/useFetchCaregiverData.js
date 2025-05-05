// visitingangelsrjs/src/pages/Scheduler/FindCaregiver/components/hooks/useFetchCaregiverData.js

/**
     * useFetchCaregiverData Hook
     * 
     * A custom React hook to fetch, process, and manage caregiver data and associated schedule dates.
     * Handles API requests, data processing, and state management for caregiver information.
*/

import {useEffect, useState} from 'react';

export default function useFetchCaregiverData() {
  const [caregivers, setCaregivers] = useState([]);
  const [dates, setDates] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {

	// Fetches caregiver schedule data and availability data from the API
	// Format the database data to match the csv data
	// Filter the caregiver data by caregiver
    const fetchCaregiverData = async () => {
      try {
		  const csvResponse = await fetch(`${baseUrl}/api/csv-data`);
          let csvData = await csvResponse.json();
		  csvData = csvData.data;

          const dbResponse = await fetch(`${baseUrl}/api/db`);
          let dbData = await dbResponse.json();
          dbData = dbData.rows;

          for (let i = 0; i < dbData.length; i++) {
              let rawName = dbData[i].user_id;
              rawName = rawName.split(".");
              let firstName = rawName[0].charAt(0).toUpperCase() + rawName[0].slice(1);
              let lastName = rawName[1].charAt(0).toUpperCase() + rawName[1].slice(1);
			  dbData[i].name = `${lastName}, ${firstName}`;

              let date = dbData[i].available_date;
              date = date.split("T")[0];
              date = date.split("-"); // year-month-day
              date = `${date[1]}/${date[2]}/${date[0]}`; // month/day/year
              dbData[i].available_date = date;

              let startTime = dbData[i].start_time;
              startTime = startTime.slice(0, startTime.length - 3);
              dbData[i].start_time = startTime;

              let endTime = dbData[i].end_time;
              endTime = endTime.slice(0, endTime.length - 3);
              dbData[i].end_time = endTime;

              dbData[i].hours = `${startTime} to ${endTime}`;
          }
        
        const processedCaregivers = csvData.map((details) => {
            const rawName = details['Caregiver Name'] || 'Unknown Caregiver';
            const name = rawName.replace(/\s*\[Caregiver\]$/, ''); // filter out tag for space
            const availability = dbData
                .filter((entry) => entry.name === name)
                .reduce((acc, entry) => {
                    acc[entry.available_date] = entry.hours;
                    return acc;
                }, {});
                const schedule = Object.entries(details)
              .filter(([key, value]) => key.includes('/') && value) 
              .reduce((acc, [date, hours]) => ({ ...acc, [date]: hours }), {});
            return { name, schedule, availability };
          });
		  
        setCaregivers(processedCaregivers);

        const allDates = Array.from(
          new Set(
            csvData.flatMap((caregiver) =>
              Object.keys(caregiver).filter((key) => key.includes('/'))
            )
          )
        ).sort((a, b) => new Date(a) - new Date(b));

        const formattedDates = allDates.map((dateStr) => ({
          day: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
          date: dateStr.slice(4,dateStr.length),
          fullDate: dateStr,
        }));

        setDates(formattedDates);
        setError('');
      } catch (err) {
        console.error('Error fetching caregiver data:', err);
        setError(err.response?.csvData?.error || 'Failed to fetch csv data');
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiverData();
  }, [baseUrl]);

  return { caregivers, dates, loading, error };
}

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
     function to12Hour(time24) {
          const [hStr, m] = time24.split(':');
          let h = parseInt(hStr, 10);
          const suffix = h >= 12 ? 'pm' : 'am';
          h = h % 12 || 12;           // map 0→12, 13→1, 12→12
          return `${h}:${m}${suffix}`;
      }


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

              // strip seconds then convert to 12-hour
              const rawStart = dbData[i].start_time.slice(0, -3);
              const rawEnd = dbData[i].end_time.slice(0, -3);
              const start12 = to12Hour(rawStart);
              const end12 = to12Hour(rawEnd);

              dbData[i].start_time = start12;
              dbData[i].end_time = end12;
              dbData[i].hours = `${start12} to ${end12}`;
          }
          function stripMI(fullName) {
              const parts = fullName.split(' ');
              if (parts.length > 2 && parts[parts.length - 1].length === 1) {
                  return parts.slice(0, -1).join(' ');
              }
              return fullName;
          }
        
        const processedCaregivers = csvData.map((details) => {
            const rawName = details['Caregiver Name'] || 'Unknown Caregiver';
            const name = rawName.replace(/\s*\[Caregiver\]$/, ''); // filter out tag for space
            const availability = dbData
                .filter((entry) => entry.name === stripMI(name))
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

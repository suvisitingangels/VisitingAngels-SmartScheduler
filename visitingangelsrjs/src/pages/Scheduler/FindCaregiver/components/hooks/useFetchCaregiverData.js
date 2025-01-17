import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchCaregiverData() {
  const [caregivers, setCaregivers] = useState([]);
  const [dates, setDates] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaregiverData = async () => {
      try {
        console.log('Fetching caregiver data...');
        const response = await axios.get('http://localhost:3001/api/csv-data');


        const data = response.data.data;
        
        const processedCaregivers = data.map((details) => {
            const name = details['Caregiver Name'] || 'Unknown Caregiver';
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

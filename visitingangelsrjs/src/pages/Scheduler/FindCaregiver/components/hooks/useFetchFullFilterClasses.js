import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchFullFilterClassesData() {
  const [fullFilterClasses, setFullFilterClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://visitingangelssurjsbackend.onrender.com/api/classes-data');
        setFullFilterClasses(response.data.data);
        console.log(fullFilterClasses);
      } catch (err) {
        console.error('Error fetching full filter classes data:', err);
        setError(err.response?.data?.error || 'Failed to fetch full filter classes data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { fullFilterClasses, loading, error };
}

import { useState, useEffect } from 'react';

export default function useFetchFullFilterClassesData() {
  const [fullFilterClasses, setFullFilterClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
	  // Fetch class csv data from the backend
    const fetchData = async () => {
      try {
		    const response = await fetch(`${baseUrl}/api/classes-data`);
		    const data = await response.json();
		    setFullFilterClasses(data.data);

        console.log('loop');
      } catch (err) {
          console.error('Error fetching full filter classes data:', err);
          setError(err.response?.data?.error || 'Failed to fetch full filter classes data');
      } finally {
          setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]); // fixed loop removed fullFilterClasses watcher (looped itself)

  return { fullFilterClasses, loading, error };
}

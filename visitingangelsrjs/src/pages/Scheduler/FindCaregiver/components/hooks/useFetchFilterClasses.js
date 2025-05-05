/*
 * useFetchFilterClasses Hook
 * 
 * A custom React hook to fetch and manage filter classes data from the CSV.
 * It makes a GET request to the API endpoint that returns the parsed CSV data,
 * extracts the header keys from the first row (which serve as filter names),
 * and updates the state accordingly.
 */

import { useState, useEffect } from 'react';

export default function useFetchFilterClasses() {
    const [filterClasses, setFilterClasses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        // Define the inner async function to fetch filter classes data
        const fetchFilterClasses = async () => {
            try {
				const response = await fetch(`${baseUrl}/api/classes-data`);
				const fetchData = await response.json();
				const data = fetchData.data;

                if (data && data.length > 0) {
                    // Extract the header keys from the first row if available
                    // These keys are the filter classes
                    const excludeKeys = ["[Other]", "Caregivers", "Status", "[None Set]"]; // set excludes here
                    const filters = Object.keys(data[0]).filter(key => !excludeKeys.includes(key));
                    setFilterClasses(filters);
                } else {
                    setFilterClasses([]);
                }
                setError('');
            } catch (err) {
                console.error('Error fetching filter classes data:', err);
                setError(err.response?.data?.error || 'Failed to fetch filter classes data');
            } finally {
                setLoading(false);
            }
        };

        fetchFilterClasses();
    }, [baseUrl]); // Empty dependency array ensures this runs once on mount

    return { filterClasses, loading, error };
}
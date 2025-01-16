import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CaregiverData.css';

function CaregiverData() {
  const [caregivers, setCaregivers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        console.log('Fetching caregiver data...');
        const response = await axios.get('http://localhost:3001/api/csv-data');
        const data = response.data.data;
  
        console.log('Raw data from API:', data);
  
        const caregiverArray = data.map((details) => {
          const name = details["Caregiver Name"] || "Unknown Caregiver";
  
          const workingHours = Object.entries(details)
            .filter(([key, value]) => key.includes('/') && value) 
            .map(([date, hours]) => `${date}: ${hours}`) 
            .join(', ');
  
          return {
            name,
            workingHours: workingHours || 'Not Scheduled',
          };
        });
  
        console.log('Processed caregiver array:', caregiverArray);
        setCaregivers(caregiverArray);
        setError('');
      } catch (err) {
        console.error('Error fetching caregiver data:', err);
        setError(err.response?.data?.error || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCaregivers();
  }, []);
  

  if (loading) return <p className="caregiver-message">Loading caregiver data...</p>;
  if (error) return <p className="caregiver-message" style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="caregiver-container">
      <h2 className="caregiver-heading">Caregiver Schedule</h2>
      <table className="caregiver-table">
        <thead>
          <tr>
            <th>Caregiver Name</th>
            <th>Working Hours</th>
          </tr>
        </thead>
        <tbody>
          {caregivers.map((caregiver, index) => (
            <tr key={index}>
              <td>{caregiver.name}</td>
              <td>{caregiver.workingHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CaregiverData;

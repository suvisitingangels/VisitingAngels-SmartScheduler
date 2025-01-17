import React from 'react';
import './CaregiverData.css';

function CaregiverData({ caregivers }) {
  if (!caregivers || caregivers.length === 0) {
    return <p className="caregiver-message">No caregiver data available.</p>;
  }

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

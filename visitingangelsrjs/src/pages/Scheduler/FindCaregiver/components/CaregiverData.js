import React from 'react';
import './CaregiverData.css';

function CaregiverData({ caregivers }) {
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
          {caregivers.length > 0 ? (
            caregivers.map((caregiver, index) => {
              const workingHours = Object.values(caregiver.schedule).join(', '); 
              return (
                <tr key={index}>
                  <td>{caregiver.name}</td>
                  <td>{workingHours || 'Not Scheduled'}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                No caregivers scheduled for this date.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CaregiverData;


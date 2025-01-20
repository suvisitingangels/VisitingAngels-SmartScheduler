// src/pages/Scheduler/FindCaregiver/components/CaregiverDataDate.js

/**
     * CaregiverDataDate Component
     * 
     * Displays a table of caregiver schedules, showing caregiver names and their working hours.
     * Handles cases where no caregivers are scheduled by displaying an appropriate message.
     * 
     * @param {Array} caregivers - Array of caregiver objects with `name` and `schedule` properties.
     * 
     * @returns {JSX.Element} - A styled table displaying caregiver schedules.
*/

import React from 'react';
import './CaregiverDataDate.css';

function CaregiverDataDate({ caregivers }) {
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

export default CaregiverDataDate;


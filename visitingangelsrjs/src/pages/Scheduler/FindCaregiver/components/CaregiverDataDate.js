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
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {caregivers.length > 0 ? (
                        caregivers.map((caregiver, index) => {
                            // Get the availability hours if provided
                            const workingHours = caregiver.schedule 
                                ? Object.values(caregiver.schedule).join(', ')
                                : 'No schedule available';
                            // Get the availability hours if provided
                            const availabilityHours = caregiver.availability
                                ? Object.values(caregiver.availability).join(', ')
                                : 'No availability info';
                            return [
                                // row one of group -- name and working hours
                                <tr className="group-row" key={`${index}-working`}>
                                    <td className="caregiver-info">
                                        <div className="vertical-split">
                                            <div className="name"><strong>{caregiver.name}</strong></div>
                                            <div className="label">Working</div>
                                        </div>
                                    </td>
                                    <td className="hours">{workingHours}</td>
                                </tr>,
                                // row two of group -- availability hours
                                <tr key={`${index}-availability`}>
                                    <td><div className="label">Availability</div></td>
                                    <td className="hours">{availabilityHours}</td>
                                </tr>,
                                // separator row to have a line
                                <tr key={`${index}-separator`} className="separator">
                                    <td colSpan="2"></td>
                                </tr>
                            ];
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


// src/pages/Scheduler/FindCaregiver/components/utils/filterCaregiverDate.js

/**
     * filterCaregiversDate Function
     * 
     * Filters a list of caregivers based on their availability for a selected date.
     * If no date is provided, returns the original list of caregivers.
     * 
     * @param {Array} caregivers - List of caregivers with their names and schedules.
     * @param {Object|null} selectedDate - The selected date object containing `fullDate` (e.g., { fullDate: '2025-01-20' }).
     * 
     * @returns {Array} - A filtered list of caregivers available on the selected date.
*/
export default function filterCaregiversDate(caregivers, selectedDate) {

    if (!selectedDate) {
        return caregivers;
    }

    const { fullDate, date } = selectedDate;

    const filtered = caregivers
        .filter((caregiver) => caregiver.schedule[fullDate] || caregiver.availability[date])
        .map((caregiver) => ({
            name: caregiver.name,
            schedule: caregiver.schedule[fullDate] ? { [fullDate]: caregiver.schedule[fullDate] } : null,
            availability: caregiver.availability[date] ? { [date]: caregiver.availability[date] } : null,
        }));

    return filtered;
}

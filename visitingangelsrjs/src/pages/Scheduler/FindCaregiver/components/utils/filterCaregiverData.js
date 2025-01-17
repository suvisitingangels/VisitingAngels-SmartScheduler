export default function filterCaregivers(caregivers, selectedDate) {
  
    if (!selectedDate) {
      console.log('selectedDate is null or undefined, returning all caregivers.');
      return caregivers;
    }
  
    const { fullDate } = selectedDate;
  
    const filtered = caregivers
      .filter((caregiver) => caregiver.schedule[fullDate]) 
      .map((caregiver) => ({
        name: caregiver.name,
        schedule: { [fullDate]: caregiver.schedule[fullDate] }, 
      }));
  
    return filtered;
  }
  
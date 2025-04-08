
export default function filterCaregiversFilters(filterClasses, filteredCaregiversDate, activeFilters) {
    
    if (!activeFilters || activeFilters.length === 0) {
        return filteredCaregiversDate;
    }
    
    let namesWithYes = [];
    let matchingNames = [];
    for (let i = 0; i < filterClasses.length; i++){
        const caregiver = filterClasses[i];
        let meetsAll = true; 
        for (let j = 0; j < activeFilters.length; j++) {
            let filterItem = activeFilters[j];
            if (!(caregiver[filterItem] && caregiver[filterItem].trim() === "Yes")) {
                meetsAll = false;
                break; 
            }
        }

        if (meetsAll) {
            namesWithYes.push(caregiver['Caregivers']);// + " [Caregiver]"); removed for now
        }
    }

    for (let i = 0; i < filteredCaregiversDate.length; i++) {
        const caregiver = filteredCaregiversDate[i];
        if (namesWithYes.includes(caregiver.name)) {
          matchingNames.push(caregiver);
        }
      }


    return matchingNames;
}
  
// src/data/filterCriteriaData.js

const filterCriteriaData = {
    generalFilters: [
        { id: 'status', label: 'Status'},
        { id: 'cna', label: 'CNA' },
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
        { id: 'exemption_letter', label: 'Exemption Letter' },
        { id: 'level1', label: 'Level 1'},
        { id: 'level2', label: 'Level 2' },
        { id: 'level3', label: 'Level 3' },
        { id: 'live_in', label: 'Live In'},
        { id: 'pets_ok', label: 'Pets Ok'},
        { id: 'train_to_work', label: 'Train To Work'},
        { id: 'takes_the_bus', label: 'Takes The Bus' },
        { id: 'drives', label: 'Drives' },
        { id: 'no_transport', label: 'No Transport' },
        { id: 'can_cook', label: 'Can Cook'},
        { id: 'dont_send_to_hospice_client', label: 'Don\'t Send To Hospice Client'},
        { id: 'hospice', label: 'Hospice' },
        { id: 'home_care_aide', label: 'Home Care'},
        { id: 'weight_limitations', label: 'Weight Limitations' },
        { id: 'vaccinated', label: 'Vaccinated' },
        { id: 'nurse_delegate', label: 'Nurse Delegate' },
        { id: 'works_days', label: 'Works Days' },
        { id: 'works_evenings', label: 'Works Evenings'},
        { id: '12_hour_overnights', label: '12 Hour Overnights'},
        { id: 'short_shifts', label: 'Short Shifts' },
    ],
    locationFilters: [
        { id: 'seattle', label: 'Seattle' },
        { id: 'west_seattle', label: 'West Seattle' },
        { id: 'north_seattle', label: 'North Seattle' },
        { id: 'south_seattle', label: 'South Seattle' },
        { id: 'north_eastside', label: 'North Eastside' },
        { id: 'south_eastside', label: 'South Eastside' },
    ],
};
  
export default filterCriteriaData;
  
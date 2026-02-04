import type { NCCSData } from '../types/survey';

export const EDUCATION_MAP: Record<string, number> = {
    'Illiterate': 1,
    'Literate but no formal schooling': 2,
    'School - Up to 4th Standard': 3,
    'School - 5th to 9th Standard': 4,
    'SSC / HSC (10th - 12th)': 5,
    'Some College but not Grad': 6,
    'Graduate / Post Graduate (General)': 7,
    'Graduate / Post Graduate (Prof)': 8, // Doctors, Engineers, etc.
};

// Durables List matching MRSI standard
export const DURABLES_LIST = [
    { id: 'electricity', label: 'Electricity Connection' },
    { id: 'ceilingFan', label: 'Ceiling Fan' },
    { id: 'lpgStove', label: 'LPG Stove' },
    { id: 'twoWheeler', label: 'Two Wheeler' },
    { id: 'colorTV', label: 'Color TV' },
    { id: 'refrigerator', label: 'Refrigerator' },
    { id: 'washingMachine', label: 'Washing Machine' },
    { id: 'pcLaptop', label: 'PC / Laptop' },
    { id: 'fourWheeler', label: 'Car / Jeep / Van' },
    { id: 'ac', label: 'Air Conditioner' },
    { id: 'agriculturalLand', label: 'Agricultural Land' },
];

export const calculateNCCS = (data: NCCSData): string => {
    // 1. Calculate Durable Score (Simple Sum of owned items)
    const durableScore = Object.values(data.durables).filter(Boolean).length;

    // 2. Get Education Score of Chief Wage Earner
    const eduScore = EDUCATION_MAP[data.chiefWageEarnerEducation] || 0;

    // 3. Matrix Lookup (Education x Durables) -> NCCS Grade
    // Simplified Logic for Demo (Actual matrix is complex 12x11 grid)
    // We approximate based on the "Premium" target of this study (likely A/B grades)

    if (durableScore >= 10 && eduScore >= 7) return 'A1';
    if (durableScore >= 9 && eduScore >= 6) return 'A2';
    if (durableScore >= 7 && eduScore >= 5) return 'A3';
    if (durableScore >= 6 && eduScore >= 4) return 'B1';
    if (durableScore >= 5 && eduScore >= 3) return 'B2';
    if (durableScore >= 4) return 'C1';

    // Else lower
    return 'C2';
};

export interface NCCSData {
    chiefWageEarnerEducation: string;
    durables: {
        electricity: boolean;
        ceilingFan: boolean;
        lpgStove: boolean;
        twoWheeler: boolean;
        colorTV: boolean;
        refrigerator: boolean;
        washingMachine: boolean;
        pcLaptop: boolean;
        fourWheeler: boolean;
        ac: boolean;
        agriculturalLand: boolean;
    };
}

export interface SurveyResponse {
    id?: string;
    pass_screener?: boolean; // Now just a record, not a gate
    demographics?: {
        age: number;
        gender: string;
        city?: string;
    };
    nccs?: NCCSData;
    psych_scores?: Record<string, number>;
    attitude_scores?: Record<string, number>;
    barrier_scores?: Record<string, number>;
    outcome_scores?: Record<string, number>;
    nep_scores?: Record<string, number>;
    misc?: Record<string, number>;
    submitted_at?: string;
}

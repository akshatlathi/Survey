export interface SurveyResponse {
    id?: string;
    pass_screener?: boolean;
    demographics?: Record<string, string>;
    psych_scores?: Record<string, number>;
    attitude_scores?: Record<string, number>;
    barrier_scores?: Record<string, number>;
    outcome_scores?: Record<string, number>;
    nep_scores?: Record<string, number>;
    misc?: Record<string, number>;
    submitted_at?: string;
}

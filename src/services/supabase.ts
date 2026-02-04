import { createClient } from '@supabase/supabase-js';
import type { SurveyResponse } from '../types/survey';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const submitSurvey = async (response: SurveyResponse) => {
    const { data, error } = await supabase
        .from('responses')
        .insert([response])
        .select();

    if (error) {
        console.error('Error submitting survey:', error);
        throw error;
    }
    return data;
};

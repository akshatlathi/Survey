import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SurveyResponse } from '../types/survey';
import { supabase } from '../lib/supabase';

interface SurveyContextType {
    response: Partial<SurveyResponse>;
    updateResponse: (updates: Partial<SurveyResponse>) => void;
    resetSurvey: () => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
    submitSurvey: () => Promise<boolean>;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [response, setResponse] = useState<Partial<SurveyResponse>>({});

    const [currentStep, setCurrentStep] = useState(0);

    // Persist state to local storage (safety net)
    useEffect(() => {
        const saved = localStorage.getItem('survey_draft');
        if (saved) {
            try {
                setResponse(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load draft", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('survey_draft', JSON.stringify(response));
    }, [response]);

    const updateResponse = (updates: Partial<SurveyResponse>) => {
        setResponse(prev => ({ ...prev, ...updates }));
    };

    const resetSurvey = () => {
        setResponse({});
        localStorage.removeItem('survey_draft');
        setCurrentStep(0);
    };

    const submitSurvey = async () => {
        try {
            console.log("Submitting survey data to Supabase:", supabase, response);

            const { error } = await supabase
                .from('responses')
                .insert([
                    {
                        payload: response,
                        submitted_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;

            console.log("Supabase insertion successful");

            await new Promise(resolve => setTimeout(resolve, 500));

            console.log("Submission process complete!");
            resetSurvey();
            return true;
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Submission Error: " + (error as any).message);
            return false;
        }
    };

    return (
        <SurveyContext.Provider value={{ response, updateResponse, resetSurvey, currentStep, setCurrentStep, submitSurvey }}>
            {children}
        </SurveyContext.Provider>
    );
};

export const useSurvey = () => {
    const context = useContext(SurveyContext);
    if (!context) {
        throw new Error('useSurvey must be used within a SurveyProvider');
    }
    return context;
};

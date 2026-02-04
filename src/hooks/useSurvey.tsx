import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SurveyResponse, NCCSData } from '../types/survey';
import { supabase } from '../lib/supabase';

interface SurveyContextType {
    response: Partial<SurveyResponse>;
    updateResponse: (updates: Partial<SurveyResponse>) => void;
    updateNCCS: (nccs: Partial<NCCSData>) => void;
    resetSurvey: () => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
    submitSurvey: () => Promise<boolean>;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [response, setResponse] = useState<Partial<SurveyResponse>>({
        nccs: {
            chiefWageEarnerEducation: '',
            durables: {
                electricity: false,
                ceilingFan: false,
                lpgStove: false,
                twoWheeler: false,
                colorTV: false,
                refrigerator: false,
                washingMachine: false,
                pcLaptop: false,
                fourWheeler: false,
                ac: false,
                agriculturalLand: false
            }
        }
    });

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

    const updateNCCS = (nccsUpdates: Partial<NCCSData>) => {
        setResponse(prev => ({
            ...prev,
            nccs: { ...prev.nccs!, ...nccsUpdates }
        }));
    };

    const resetSurvey = () => {
        setResponse({});
        localStorage.removeItem('survey_draft');
        setCurrentStep(0);
    };

    const submitSurvey = async () => {
        try {
            console.log("Submitting survey data to Supabase:", supabase, response);

            // 1. Insert into Supabase 'responses' table
            // Ensure you have created a table named 'responses' with a JSONB column 'data' or specific columns matching types.
            // For flexibility, we often use a single 'payload' jsonb column.

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

            // Simulate API call delay (optional now, but good for UX)
            await new Promise(resolve => setTimeout(resolve, 500));

            console.log("Submission process complete!");
            resetSurvey();
            return true;
        } catch (error) {
            console.error("Submission failed:", error);
            // alert("Failed to submit survey. Please try again."); 
            // Optional: Don't alert if it's just a local env issue, but for prod we should.
            // For now, let's alert.
            alert("Submission Error: " + (error as any).message);
            return false;
        }
    };

    return (
        <SurveyContext.Provider value={{ response, updateResponse, updateNCCS, resetSurvey, currentStep, setCurrentStep, submitSurvey }}>
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

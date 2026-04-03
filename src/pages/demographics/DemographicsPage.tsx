import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SurveyLayout } from '../../components/layout/SurveyLayout';
import { QuestionCard } from '../../components/ui/QuestionCard';
import { useSurvey } from '../../hooks/useSurvey';

export const DemographicsPage: React.FC = () => {
    const navigate = useNavigate();
    const { updateResponse } = useSurvey();

    const [form, setForm] = useState<Record<string, string>>({
        age: '',
        gender: '',
        education: '',
        occupation: '',
        income: '',
        city: '',
        frequency: '',
        spending: '',
        awareness: '',
        purchased: ''
    });

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (Object.values(form).some(val => val === '')) {
            alert("Please complete all fields to continue.");
            return;
        }

        updateResponse({ demographics: form });
        navigate('/survey/1');
    };

    const options = {
        age: ['18-22 years', '23-27 years', '28-32 years', '33-35 years'],
        gender: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
        education: ['Undergraduate (B.Tech, B.Sc, etc.)', 'Graduate (M.Tech, MBA, etc.)', 'Other'],
        occupation: ['Student', 'Employed (public/private)', 'Self-employed', 'Unemployed', 'Other'],
        income: ['<₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹20,000', '₹20,000 - ₹35,000', '₹35,000 - ₹50,000'],
        city: ['Metro (Tier 1 city like Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad)', 'Tier 2 city (e.g., Pune, Jaipur, Lucknow, Kochi)', 'Tier 3 city (e.g., small towns, rural areas)', 'Other'],
        frequency: ['Weekly', 'Monthly', 'Quarterly', 'Bi-annually', 'Annually'],
        spending: ['<₹1000', '₹1000 - ₹3000', '₹3000 - ₹5000', '₹5000 - ₹10000', '>₹10000'],
        awareness: ['Yes', 'No'],
        purchased: ['Yes', 'No']
    };

    const SelectField = ({ label, field, opts }: { label: string, field: string, opts: string[] }) => (
        <div className="space-y-2 mb-6">
            <label className="text-sm font-medium text-text-secondary ml-1">{label}</label>
            <select
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="glass-input appearance-none w-full"
            >
                <option value="">Select an option</option>
                {opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );

    return (
        <SurveyLayout title="About You (Demographics)" progress={10}>
            <QuestionCard delay={0.1}>
                <h3 className="text-xl font-medium text-primary mb-6">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
                    <SelectField label="Age" field="age" opts={options.age} />
                    <SelectField label="Gender" field="gender" opts={options.gender} />
                    <SelectField label="Education Level" field="education" opts={options.education} />
                    <SelectField label="Occupation" field="occupation" opts={options.occupation} />
                    <SelectField label="Monthly Personal Income/Allowance" field="income" opts={options.income} />
                    <SelectField label="City of Residence" field="city" opts={options.city} />
                    <SelectField label="Fashion Purchase Frequency" field="frequency" opts={options.frequency} />
                    <SelectField label="Average Monthly Fashion Spending" field="spending" opts={options.spending} />
                    <SelectField label="Aware of the concept of sustainable fashion?" field="awareness" opts={options.awareness} />
                    <SelectField label="Ever purchased a product you consider sustainable?" field="purchased" opts={options.purchased} />
                </div>
            </QuestionCard>

            <div className="flex justify-end pt-4 pb-12">
                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                    Continue to Survey
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </SurveyLayout>
    );
};

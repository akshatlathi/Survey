import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { SurveyLayout } from '../../components/layout/SurveyLayout';
import { QuestionCard } from '../../components/ui/QuestionCard';
import { useSurvey } from '../../hooks/useSurvey';
import { DURABLES_LIST, EDUCATION_MAP } from '../../services/nccsCalculator';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const DemographicsPage: React.FC = () => {
    const navigate = useNavigate();
    const { response, updateResponse, updateNCCS } = useSurvey();

    // Local state for smoother UI before committing context
    const [edu, setEdu] = useState(response.nccs?.chiefWageEarnerEducation || '');
    const [localDurables, setLocalDurables] = useState(response.nccs?.durables || {});
    const [age, setAge] = useState<number | ''>(response.demographics?.age || '');
    const [gender, setGender] = useState(response.demographics?.gender || '');

    const toggleDurable = (key: string) => {
        setLocalDurables((prev: any) => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }));
    };

    const handleNext = () => {
        if (!age || !gender || !edu) {
            alert("Please complete all fields.");
            return;
        }

        updateResponse({
            demographics: {
                age: Number(age),
                gender: gender as string
            }
        });
        updateNCCS({ chiefWageEarnerEducation: edu, durables: localDurables as any });

        navigate('/survey/1'); // Proceed to NEP Scale
    };

    return (
        <SurveyLayout title="About You" progress={10}>

            {/* 1. Basic Demographics */}
            <QuestionCard delay={0.1}>
                <h3 className="text-xl font-medium text-primary mb-6">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary ml-1">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="glass-input"
                            placeholder="e.g. 24"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary ml-1">Gender</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="glass-input appearance-none"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                </div>
            </QuestionCard>

            {/* 2. NCCS - Education */}
            <QuestionCard delay={0.2}>
                <h3 className="text-xl font-medium text-primary mb-4">Chief Wage Earner's Education</h3>
                <p className="text-sm text-text-muted mb-6">The highest education level of the main income earner in your household.</p>

                <div className="space-y-3">
                    {Object.keys(EDUCATION_MAP).map((level) => (
                        <button
                            key={level}
                            onClick={() => setEdu(level)}
                            className={clsx(
                                "w-full text-left p-4 rounded-xl border transition-all text-sm md:text-base touch-manipulation",
                                edu === level
                                    ? "bg-primary text-white border-primary shadow-lg scale-[1.01]"
                                    : "bg-white/40 border-primary/10 hover:bg-white/60 text-text-primary"
                            )}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </QuestionCard>

            {/* 3. NCCS - Durables */}
            <QuestionCard delay={0.3}>
                <h3 className="text-xl font-medium text-primary mb-4">Household Amenities</h3>
                <p className="text-sm text-text-muted mb-6">Which of the following items do you own in your household?</p>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {DURABLES_LIST.map((item) => {
                        const isSelected = !!localDurables[item.id as keyof typeof localDurables];
                        return (
                            <motion.button
                                key={item.id}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => toggleDurable(item.id)}
                                className={clsx(
                                    "relative p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-3 transition-all h-32 touch-manipulation",
                                    isSelected
                                        ? "bg-secondary/10 border-secondary text-primary-dark shadow-inner"
                                        : "bg-white/30 border-transparent hover:bg-white/50 text-text-muted"
                                )}
                            >
                                {isSelected && (
                                    <div className="absolute top-2 right-2 text-secondary">
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                                <span className={clsx("font-medium text-sm", isSelected ? "text-primary-dark" : "text-text-secondary")}>
                                    {item.label}
                                </span>
                            </motion.button>
                        );
                    })}
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

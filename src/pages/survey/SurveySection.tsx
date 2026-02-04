import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SurveyLayout } from '../../components/layout/SurveyLayout';
import { QuestionCard } from '../../components/ui/QuestionCard';
import { LikertScale } from '../../components/ui/LikertScale';
import { SemanticDiffScale } from '../../components/ui/SemanticDiffScale';
import { useSurvey } from '../../hooks/useSurvey';
import { SURVEY_SECTIONS } from '../../data/questions';
import { ChevronRight } from 'lucide-react';

export const SurveySection: React.FC = () => {
    const { part } = useParams<{ part: string }>();
    const navigate = useNavigate();
    const { response, updateResponse, submitSurvey } = useSurvey();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sectionIndex = SURVEY_SECTIONS.findIndex(s => s.id === part);
    const section = SURVEY_SECTIONS[sectionIndex];
    const nextSection = SURVEY_SECTIONS[sectionIndex + 1];

    // Local state for answers in this section
    // In a real app we might read from context to pre-fill if user goes back
    const [answers, setAnswers] = useState<Record<string, number>>({});

    useEffect(() => {
        // Scroll to top on section change
        window.scrollTo(0, 0);
    }, [part]);

    if (!section) {
        return <div className="p-20 text-center">Section not found</div>;
    }

    // Calculate global progress
    // Screener(1) + Demographics(1) + 5 Sections => 7 steps total roughly
    const progress = 20 + ((sectionIndex + 1) / SURVEY_SECTIONS.length) * 80;

    const handleAnswerChange = (qId: string, val: number) => {
        setAnswers(prev => ({ ...prev, [qId]: val }));
    };

    const handleNext = async () => {
        const missing = section.questions.filter(q => !answers[q.id]);
        if (missing.length > 0) {
            alert(`Please answer all questions to proceed. (${missing.length} remaining)`);
            return;
        }

        // Save to context
        // We need to map the flat answers to the nested structure in SurveyResponse
        // This is a bit manual mapping based on ID prefixes
        const updates: any = {};

        // Simple strategy: we store raw scores. 
        // The type `SurveyResponse` has nested objects (nep_scores, etc).
        // We can infer the parent key from the question ID prefix.
        const getParentKey = (qid: string) => {
            // Psychographics
            if (qid.startsWith('FI')) return 'psych_scores'; // Fashion Involvement
            if (qid.startsWith('EK')) return 'psych_scores'; // Env Knowledge
            if (qid.startsWith('GW')) return 'barrier_scores'; // Greenwashing (Psych/Barrier)

            // TPB
            if (qid.startsWith('ATT')) return 'attitude_scores';
            if (qid.startsWith('SN') || qid.startsWith('SM')) return 'psych_scores'; // Social Norms & Media
            if (qid.startsWith('PBC')) return 'psych_scores'; // PBC often grouped or separate. Let's map to psych for now or add new field.
            if (qid.startsWith('PN')) return 'psych_scores';

            // Barriers
            if (qid.startsWith('GT')) return 'barrier_scores';
            if (qid.startsWith('PS')) return 'barrier_scores';
            if (qid.startsWith('AV')) return 'barrier_scores';

            // Outcome
            if (qid.startsWith('PI') || qid.startsWith('AB') || qid.startsWith('WTP')) return 'outcome_scores';

            return 'misc';
        };

        Object.entries(answers).forEach(([key, val]) => {
            const parent = getParentKey(key);
            if (!updates[parent]) updates[parent] = { ...(response as any)[parent] };
            updates[parent][key] = val;
        });

        updateResponse(updates);

        if (nextSection) {
            navigate(`/survey/${nextSection.id}`);
        } else {
            // Final Step - Submit to Supabase
            setIsSubmitting(true);
            const success = await submitSurvey();
            setIsSubmitting(false);

            if (success) {
                navigate('/thank-you');
            }
        }
    };

    return (
        <SurveyLayout title={section.title} progress={progress}>
            <p className="text-lg text-text-secondary mb-8 text-center max-w-2xl mx-auto">
                {section.description}
            </p>

            {section.questions.map((q, idx) => (
                <QuestionCard key={q.id} delay={idx * 0.1}>
                    <div className="mb-4">
                        <h4 className="text-lg md:text-xl font-medium text-primary-dark leading-relaxed">
                            {q.text}
                        </h4>
                    </div>

                    {q.type === 'likert' && (
                        <LikertScale
                            value={answers[q.id] || 0}
                            onChange={(val) => handleAnswerChange(q.id, val)}
                        />
                    )}

                    {q.type === 'semantic' && q.labels && (
                        <SemanticDiffScale
                            leftLabel={q.labels[0]}
                            rightLabel={q.labels[1]}
                            value={answers[q.id] || 0}
                            onChange={(val) => handleAnswerChange(q.id, val)}
                        />
                    )}
                </QuestionCard>
            ))}

            <div className="flex justify-end pt-4 pb-20">
                <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : (nextSection ? 'Next Section' : 'Submit Survey')}
                    {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                </button>
            </div>
        </SurveyLayout>
    );
};

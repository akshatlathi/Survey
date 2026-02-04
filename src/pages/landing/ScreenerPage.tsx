import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, XCircle } from 'lucide-react';
import { SurveyLayout } from '../../components/layout/SurveyLayout';
import { QuestionCard } from '../../components/ui/QuestionCard';
import { useSurvey } from '../../hooks/useSurvey';

export const ScreenerPage: React.FC = () => {
    const navigate = useNavigate();
    const { updateResponse } = useSurvey();

    const handleResponse = (pass: boolean) => {
        updateResponse({ pass_screener: pass });
        // The survey is inclusive for all respondents, regardless of past purchase history.
        navigate('/demographics');
    };

    return (
        <SurveyLayout title="Eligibility Check" progress={5}>
            <QuestionCard>
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-primary-dark">
                    In the past 12 months, have you purchased any fashion products (clothing, footwear, accessories)?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => handleResponse(true)}
                        className="flex items-center justify-center gap-3 p-6 rounded-xl border-2 border-primary/20 bg-white/50 hover:bg-primary/5 hover:border-primary transition-all group"
                    >
                        <ShoppingBag className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-medium text-primary-dark">Yes, I have</span>
                    </button>

                    <button
                        onClick={() => handleResponse(false)}
                        className="flex items-center justify-center gap-3 p-6 rounded-xl border-2 border-gray-200 bg-white/50 hover:bg-gray-100 hover:border-gray-300 transition-all group opacity-70 hover:opacity-100"
                    >
                        <XCircle className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-transform" />
                        <span className="text-xl font-medium text-gray-600">No, I haven't</span>
                    </button>
                </div>
            </QuestionCard>
        </SurveyLayout>
    );
};

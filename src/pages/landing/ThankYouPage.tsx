
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SurveyLayout } from '../../components/layout/SurveyLayout';
import { motion } from 'framer-motion';

export const ThankYouPage: React.FC = () => {

    useEffect(() => {
        // Professional "Eco-Luxury" Confetti
        const end = Date.now() + 3 * 1000;
        const colors = ['#C5A059', '#0F1F1C', '#F9F7F1']; // Antique Bronze, Forest Black, Alabaster

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    return (
        <SurveyLayout title="Submission Complete" progress={100}>
            <div className="flex flex-col items-center justify-center text-center py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
                        ✨
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading italic text-primary mb-6">
                        Thank you for your contribution.
                    </h2>
                    <p className="text-lg text-text-secondary leading-relaxed mb-12">
                        Your response has been securely recorded in "The Collection" database.
                        Your insights are valuable to our research on sustainable fashion behaviors.
                    </p>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="btn-outline"
                    >
                        Return to Cover
                    </button>
                </motion.div>
            </div>
        </SurveyLayout>
    );
};

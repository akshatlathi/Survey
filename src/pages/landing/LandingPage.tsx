import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col md:flex-row">
            <div className="absolute top-0 left-0 w-full h-[6px] bg-accent z-50 md:hidden" />

            {/* Left Column: The "Cover" Image/Typography */}
            <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-between relative min-h-[50vh]">
                <div className="flex items-center gap-4">
                    <div className="font-heading font-black text-3xl md:text-4xl tracking-tighter text-primary">THE COLLECTION</div>
                    <div className="h-[1px] flex-grow bg-primary/20 md:hidden" />
                    <div className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-accent">Eco Edition</div>
                </div>

                <div className="mt-12 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="w-4 h-4 text-accent fill-accent" />
                            <span className="font-body text-xs uppercase tracking-[0.25em] text-text-muted">Issue No. 2026</span>
                        </div>
                        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary leading-[0.85] italic mb-6">
                            The <br />
                            <span className="font-normal not-italic ml-2 md:ml-12 block">Ethics</span>
                            <span className="block text-4xl md:text-6xl text-secondary opacity-80 mt-2 font-normal">of Elegance</span>
                        </h1>
                    </motion.div>
                </div>

                <div className="hidden md:block">
                    <p className="font-body text-xs uppercase tracking-[0.1em] text-primary/40">Academic Research Study • India</p>
                </div>
            </div>

            {/* Right Column: The Editorial Content / Action */}
            <div className="md:w-1/2 bg-white md:border-l border-primary/5 p-8 md:p-16 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="max-w-md mx-auto"
                >
                    <div className="w-12 h-[2px] bg-accent mb-8" />

                    <p className="font-heading text-2xl md:text-3xl text-primary leading-tight mb-8">
                        "True luxury is knowing the story behind what you wear."
                    </p>

                    <p className="font-body text-text-secondary leading-relaxed mb-12 text-sm md:text-base border-l-2 border-primary/10 pl-6">
                        We invite you to participate in an exclusive study on the future of sustainable fashion consumption. Your voice defines the next era of mindful luxury.
                        <br /><br />
                        <span className="block font-medium text-primary">5 Minutes • Anonymous • Insightful</span>
                    </p>

                    <button
                        onClick={() => navigate('/screener')}
                        className="btn-gold w-full md:w-auto flex items-center justify-between gap-8 group"
                    >
                        <span>Enter The Study</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

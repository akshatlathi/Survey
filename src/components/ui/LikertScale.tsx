import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface LikertScaleProps {
    value: number;
    onChange: (val: number) => void;
    labels?: string[];
}

const DEFAULT_LABELS = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

export const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange, labels = DEFAULT_LABELS }) => {
    return (
        <div className="flex flex-col gap-4 mt-6">
            {/* Visual Track */}
            <div className="relative w-full h-2 bg-gray-100 rounded-full mb-8 hidden md:block">
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="w-2 h-2 rounded-full bg-gray-300" />
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                {[1, 2, 3, 4, 5].map((num) => {
                    const isSelected = value === num;
                    return (
                        <motion.button
                            key={num}
                            onClick={() => onChange(num)}
                            whileTap={{ scale: 0.9 }}
                            className={clsx(
                                "relative flex flex-col items-center gap-3 p-2 rounded-xl transition-all touch-manipulation group outline-none",
                                isSelected ? "opacity-100" : "opacity-60 hover:opacity-100"
                            )}
                        >
                            <div className={clsx(
                                "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all duration-300 relative z-10 bg-white",
                                isSelected
                                    ? "border-secondary text-secondary shadow-[0_0_20px_rgba(132,169,140,0.4)] transform scale-110"
                                    : "border-gray-200 text-gray-400 group-hover:border-secondary/50"
                            )}>
                                {num}
                            </div>
                            <span className="text-xs font-medium text-text-secondary w-20 text-center md:hidden lg:block">
                                {labels[num - 1]}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Mobile labels helper */}
            <div className="flex justify-between text-xs text-text-muted px-2 md:hidden">
                <span>Disagree</span>
                <span>Agree</span>
            </div>
        </div>
    );
};

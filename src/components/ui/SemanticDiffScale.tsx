import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface SemanticDiffScaleProps {
    leftLabel: string;
    rightLabel: string;
    value: number;
    onChange: (val: number) => void;
}

export const SemanticDiffScale: React.FC<SemanticDiffScaleProps> = ({ leftLabel, rightLabel, value, onChange }) => {
    return (
        <div className="mt-8 mb-6">
            <div className="flex items-center justify-between mb-6 px-1">
                <span className="text-sm font-bold text-primary-dark uppercase tracking-wider">{leftLabel}</span>
                <span className="text-sm font-bold text-primary-dark uppercase tracking-wider">{rightLabel}</span>
            </div>

            <div className="flex justify-between items-center relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10" />

                {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                    const isSelected = value === num;

                    return (
                        <motion.button
                            key={num}
                            onClick={() => onChange(num)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={clsx(
                                "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all touch-manipulation",
                                isSelected
                                    ? "border-accent bg-accent text-white shadow-lg scale-110"
                                    : "border-gray-300 text-transparent hover:border-accent/50"
                            )}
                        >
                            {isSelected && <span className="text-sm font-bold">{num}</span>}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { clsx } from 'clsx';

interface QuestionCardProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ children, delay = 0, className }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: delay, ease: [0.2, 0.65, 0.3, 0.9] }}
            className={clsx(
                "editorial-panel mb-8 border-b border-primary/5 last:border-0", // Separators for "list" feel
                className
            )}
        >
            {children}
        </motion.div>
    );
};

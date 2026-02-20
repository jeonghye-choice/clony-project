import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    xOffset?: number;
    yOffset?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
    children,
    delay = 0,
    className = "",
    xOffset = 0,
    yOffset = -15
}) => {
    return (
        <motion.div
            className={className}
            initial={{ y: 0 }}
            animate={{
                y: [0, yOffset, 0],
                x: [0, xOffset, 0]
            }}
            transition={{
                duration: 4,
                delay: delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
            whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 }
            }}
        >
            {children}
        </motion.div>
    );
};

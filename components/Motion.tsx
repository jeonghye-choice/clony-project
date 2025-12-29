import React from 'react';
import { motion, useInView } from 'framer-motion';

// --- Types ---
interface MotionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
}

// --- 1. Basic Fade In Up ---
export const FadeInUp: React.FC<MotionProps> = ({ children, className, delay = 0, duration = 0.5 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

// --- 2. Staggered Text Reveal (High Priority for Hero) ---
export const StaggerText: React.FC<{ text: string | React.ReactNode; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
    // If text is complex (contains tags), we treat it as a block.
    // Assuming simple string or <br/> separated for now.
    // For safety, if it's not a string, we just fade it in.
    if (typeof text !== 'string') {
        return <FadeInUp className={className} delay={delay}>{text}</FadeInUp>;
    }

    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0.2em' }} // Keep words together but flexible
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {words.map((word, index) => (
                <motion.span variants={child} key={index} className="inline-block">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

// --- 3. Scroll Triggered Spring Slide In (For Service/Cards) ---
export const ScrollSlideIn: React.FC<MotionProps & { direction?: 'left' | 'right' | 'up' }> = ({ children, className, delay = 0, direction = 'up' }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 50 : 0,
            x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 70, // Bouncy
                damping: 15,
                delay,
                duration: 0.8
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// --- 4. Floating Effect (For 3D Objects) ---
export const Float: React.FC<MotionProps & { amplitude?: number }> = ({ children, className, amplitude = 15 }) => (
    <motion.div
        animate={{ y: [0, -amplitude, 0] }}
        transition={{
            duration: 3 + Math.random(), // Slight random for organic feel
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className={className}
    >
        {children}
    </motion.div>
);

// --- 5. Pulse Effect (For CTA) ---
export const PulseButton: React.FC<MotionProps & { onClick?: () => void }> = ({ children, className, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
            boxShadow: [
                "0 0 0 0 rgba(76, 201, 240, 0.4)",
                "0 0 0 10px rgba(76, 201, 240, 0)",
            ],
        }}
        transition={{
            boxShadow: {
                duration: 2,
                repeat: Infinity,
            },
        }}
        className={className}
        onClick={onClick}
    >
        {children}
    </motion.button>
);

import React, { useState, useEffect } from 'react';

interface PhoneMockupProps {
    rotation: { x: number; y: number };
    children: React.ReactNode;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = React.memo(({ rotation, children }) => {
    const [scale, setScale] = useState(1);
    const [layerCount, setLayerCount] = useState(20); // Reduced layers for cleaner glass look

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            setScale(isMobile ? 0.65 : 1);
            setLayerCount(isMobile ? 5 : 20);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const effectiveRotation = scale < 1 ? { x: 0, y: 0 } : rotation;

    return (
        <div className="relative group perspective-2000" style={{ transform: `scale(${scale})` }}>
            <style>{`
        .phone-3d-wrap { 
            position: relative; 
            width: 330px; 
            height: 670px; 
            transform-style: preserve-3d; 
            transition: transform 0.1s ease-out; 
            will-change: transform;
        }
        .phone-layer {
            position: absolute;
            inset: 0;
            border-radius: 54px;
            pointer-events: none;
        }
        /* Glass/Crystal Side Finish - Optimized (No Blur for performance) */
        .side-glass {
            background: rgba(255, 255, 255, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
            /* backdrop-filter: blur(4px); Removed for performance */
        }
      `}</style>

            {/* Glowing Aura Behind Phone - Matching Brand Gradient */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[700px] bg-gradient-to-tr from-teal-400/30 to-blue-500/30 blur-[100px] rounded-full transition-all duration-300 pointer-events-none"
                style={{
                    opacity: 0.6,
                    transform: `translate(-50%, -50%) translateX(${-effectiveRotation.y * 0.5}px)`
                }}
            />

            {/* Shadow */}
            <div
                className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[280px] h-[40px] bg-blue-900/20 blur-2xl rounded-[100%] transition-all duration-300"
                style={{
                    opacity: 0.4 + Math.abs(effectiveRotation.y / 200),
                    transform: `translateX(${-effectiveRotation.y}px) scale(${1 - Math.abs(effectiveRotation.y / 300)})`
                }}
            />

            <div
                className="phone-3d-wrap transition-transform"
                style={{ transform: `rotateX(${effectiveRotation.x}deg) rotateY(${effectiveRotation.y}deg)` }}
            >
                {/* 1. Back Plate (Frosted Glass) */}
                <div
                    className="phone-layer bg-white/10 backdrop-blur-xl border border-white/20 shadow-inner"
                    style={{ transform: 'translateZ(-20px) rotateY(180deg)' }}
                >
                    {/* Glossy Reflection on Back */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-[54px] opacity-50"></div>
                </div>

                {/* 2. Side Thickness (Stacked Glass Layers) */}
                {[...Array(layerCount)].map((_, i) => (
                    <div
                        key={i}
                        className="phone-layer side-glass"
                        style={{
                            transform: `translateZ(-${(i + 1) * (20 / layerCount)}px)`,
                            backgroundColor: `rgba(255, 255, 255, ${0.1 + (i / layerCount) * 0.1})`, // Fading opacity for depth
                            borderColor: `rgba(255, 255, 255, 0.1)`
                        }}
                    />
                ))}

                {/* 3. Front Bezel & Screen Container */}
                <div
                    className="phone-layer p-[8px] bg-white/20 backdrop-blur-sm border border-white/40 shadow-2xl overflow-hidden"
                    style={{ transform: 'translateZ(0px)', pointerEvents: 'auto' }}
                >
                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#FAFAFA] rounded-[46px] overflow-hidden relative shadow-inner">
                        {/* Dynamic Island / Notch Area (Minimalist) */}
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-[90] pointer-events-none">
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full"></div>
                        </div>

                        {children}

                        {/* Screen Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-[100] opacity-50 rounded-[46px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

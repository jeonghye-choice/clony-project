import React, { useState, useEffect } from 'react';

interface AppWindowProps {
    rotation: { x: number; y: number };
    children: React.ReactNode;
}

export const AppWindow: React.FC<AppWindowProps> = ({ rotation, children }) => {
    // Adjust scale based on screen width
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            setScale(isMobile ? 0.7 : 1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const effectiveRotation = scale < 1 ? { x: 0, y: 0 } : rotation;

    return (
        <div className="relative group perspective-2000" style={{ transform: `scale(${scale})` }}>
            <style>{`
        .window-3d-wrap { 
            position: relative; 
            width: 360px; /* Wider than phone */
            height: 640px; 
            transform-style: preserve-3d; 
            transition: transform 0.1s ease-out; 
            will-change: transform;
        }
        .window-content {
            transform: translateZ(20px);
        }
      `}</style>

            {/* Soft Ambient Shadow */}
            <div
                className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[60px] bg-blue-500/20 blur-3xl rounded-[100%] transition-all duration-300"
                style={{
                    opacity: 0.6 + Math.abs(effectiveRotation.y / 200),
                    transform: `translateX(${-effectiveRotation.y}px) scale(${1 - Math.abs(effectiveRotation.y / 300)})`
                }}
            />

            <div
                className="window-3d-wrap transition-transform"
                style={{ transform: `rotateX(${effectiveRotation.x * 0.5}deg) rotateY(${effectiveRotation.y * 0.5}deg)` }}
            >
                {/* Main Glass Window Frame */}
                <div
                    className="absolute inset-0 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden"
                    style={{ transform: 'translateZ(0px)' }}
                >
                    {/* Window Header (Mac Style) */}
                    <div className="h-10 w-full border-b border-gray-100/50 flex items-center px-6 gap-2 bg-gradient-to-b from-white/50 to-transparent">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-inner"></div>

                        {/* Title (Optional) */}
                        <div className="flex-1 text-center pr-12 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clony App</div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full h-[calc(100%-40px)] bg-white/50 relative">
                        {children}
                    </div>

                    {/* Glossy Overlay for Glass Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/40 to-transparent opacity-50 z-50"></div>
                </div>

                {/* 3D Depth Layer (Back of the window) */}
                <div
                    className="absolute inset-0 bg-white/90 rounded-[2.5rem] shadow-xl"
                    style={{ transform: 'translateZ(-20px)' }}
                ></div>

                {/* Connecting Sides for thickness */}
                <div className="absolute top-0 left-0 right-0 h-[20px] bg-gray-100 transform origin-top -rotate-x-90 translate-z-[-20px]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[20px] bg-gray-200 transform origin-bottom rotate-x-90 translate-z-[-20px]"></div>
            </div>
        </div>
    );
};

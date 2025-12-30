import React, { useState, useEffect } from 'react';

interface PhoneMockupProps {
    rotation: { x: number; y: number };
    children: React.ReactNode;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ rotation, children }) => {
    // Adjust scale based on screen width
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const handleResize = () => {
            // Mobile: scale down significantly, Desktop: full size
            setScale(window.innerWidth < 768 ? 0.65 : 1);
        };
        handleResize(); // Initial call
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
        }
        .phone-layer {
            position: absolute;
            inset: 0;
            border-radius: 54px;
            pointer-events: none;
        }
        /* Titanium/Space Grey finish for the sides */
        .side-metal {
            background: linear-gradient(to right, #2c2c2c, #1a1a1a, #2c2c2c);
            border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>

            {/* Shadow */}
            <div
                className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[280px] h-[40px] bg-black/40 blur-2xl rounded-[100%] transition-all duration-300"
                style={{
                    opacity: 0.4 + Math.abs(effectiveRotation.y / 200),
                    transform: `translateX(${-effectiveRotation.y}px) scale(${1 - Math.abs(effectiveRotation.y / 300)})`
                }}
            />

            <div
                className="phone-3d-wrap transition-transform"
                style={{ transform: `rotateX(${effectiveRotation.x}deg) rotateY(${effectiveRotation.y}deg)` }}
            >
                {/* 1. Back Plate (Matte Space Grey) */}
                <div
                    className="phone-layer bg-[#3a3a3a] border border-[#2a2a2a]"
                    style={{ transform: 'translateZ(-32px)' }}
                >
                    {/* Camera Bump Container */}
                    <div className="absolute top-4 left-4 w-[110px] h-[120px] bg-[#333] rounded-[28px] shadow-lg border border-white/5"
                        style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5), 5px 5px 15px rgba(0,0,0,0.3)' }}>

                        {/* Triangular Lens Arrangement for iPhone 11/12/13/14 Pro */}
                        {/* Top Lens */}
                        <div className="absolute top-2 left-2 w-[44px] h-[44px]">
                            <div className="w-full h-full rounded-full bg-[#111] border-[4px] border-[#252525] shadow-inner relative flex items-center justify-center">
                                <div className="w-[60%] h-[60%] rounded-full bg-[#050505] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"></div>
                                <div className="absolute top-[30%] left-[30%] w-2 h-2 rounded-full bg-blue-900/40 blur-[1px]"></div>
                            </div>
                        </div>

                        {/* Bottom Lens */}
                        <div className="absolute bottom-2 left-2 w-[44px] h-[44px]">
                            <div className="w-full h-full rounded-full bg-[#111] border-[4px] border-[#252525] shadow-inner relative flex items-center justify-center">
                                <div className="w-[60%] h-[60%] rounded-full bg-[#050505] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"></div>
                                <div className="absolute top-[30%] left-[30%] w-2 h-2 rounded-full bg-blue-900/40 blur-[1px]"></div>
                            </div>
                        </div>

                        {/* Right Lens (Centered vertically between top and bottom) */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-2 w-[44px] h-[44px]">
                            <div className="w-full h-full rounded-full bg-[#111] border-[4px] border-[#252525] shadow-inner relative flex items-center justify-center">
                                <div className="w-[60%] h-[60%] rounded-full bg-[#050505] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"></div>
                                <div className="absolute top-[30%] left-[30%] w-2 h-2 rounded-full bg-blue-900/40 blur-[1px]"></div>
                            </div>
                        </div>

                        {/* Flash & Mic */}
                        <div className="absolute top-3 right-5 w-3 h-3 rounded-full bg-yellow-100/80 shadow-[0_0_5px_rgba(255,255,0,0.5)]"></div>
                        <div className="absolute bottom-5 right-6 w-2 h-2 rounded-full bg-black/80 border border-white/10"></div>
                    </div>
                </div>

                {/* 2. Side Thickness (Metallic Layers) */}
                {[...Array(32)].map((_, i) => (
                    <div
                        key={i}
                        className="phone-layer side-metal"
                        style={{
                            transform: `translateZ(-${i + 1}px)`,
                            backgroundColor: i % 2 === 0 ? '#1a1a1a' : '#222' // Darker side texture
                        }}
                    />
                ))}

                {/* 3. Buttons (Volume & Power) */}
                {/* Left Side: Volume */}
                <div className="absolute top-[120px] left-[-4px] w-[4px] h-[50px] bg-[#222] rounded-l-md transform -translate-z-4" style={{ transform: 'translateZ(-15px) rotateY(-90deg)' }}></div>
                <div className="absolute top-[180px] left-[-4px] w-[4px] h-[50px] bg-[#222] rounded-l-md transform -translate-z-4" style={{ transform: 'translateZ(-15px) rotateY(-90deg)' }}></div>

                {/* Right Side: Power */}
                <div className="absolute top-[140px] right-[-4px] w-[4px] h-[80px] bg-[#1a1a1a] rounded-r-md transform" style={{ transform: 'translateZ(-15px) rotateY(90deg)' }}></div>


                {/* 4. Front Bezel & Screen Container */}
                <div
                    className="phone-layer bg-black p-[10px] border-[4px] border-[#222] shadow-2xl overflow-hidden"
                    style={{ transform: 'translateZ(0px)', pointerEvents: 'auto' }}
                >
                    {/* Gloss/Reflection Overlay */}
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-12deg] pointer-events-none z-[100]"></div>
                    <div className="absolute top-0 right-[20%] w-[2px] h-full bg-white/10 skew-x-[-12deg] pointer-events-none z-[100]"></div>

                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#FAFAFA] rounded-[44px] overflow-hidden relative">
                        {/* Dynamic Island Notch */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-[90] flex items-center justify-center gap-3 shadow-sm">
                            {/* Camera Lens */}
                            <div className="w-2 h-2 rounded-full bg-[#1a1a1a] shadow-inner border border-white/5"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0f0f0f]"></div>
                        </div>

                        {/* Status Bar Mock */}
                        <div className="absolute top-4 left-8 text-[12px] font-bold text-black z-[80]">12:30</div>
                        <div className="absolute top-4 right-8 flex gap-1.5 z-[80]">
                            <div className="w-4 h-3 bg-black rounded-[2px]"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

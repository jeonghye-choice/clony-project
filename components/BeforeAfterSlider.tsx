import React, { useState, useRef, useEffect } from 'react';
import { ScrollSlideIn } from './Motion';

export const BeforeAfterSlider: React.FC = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!containerRef.current) return;

        const { left, width } = containerRef.current.getBoundingClientRect();
        let clientX;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = (event as MouseEvent).clientX;
        }

        const position = ((clientX - left) / width) * 100;
        setSliderPosition(Math.min(100, Math.max(0, position)));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handleMove(e);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        handleMove(e);
    };

    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            handleMove(e);
        };

        const handleGlobalUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMove);
            window.addEventListener('mouseup', handleGlobalUp);
            window.addEventListener('touchmove', handleGlobalMove);
            window.addEventListener('touchend', handleGlobalUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalUp);
        };
    }, [isDragging]);

    return (
        <section className="py-24 px-4 md:px-8 bg-gray-50 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6 order-1">
                        <ScrollSlideIn>
                            <span className="text-clony-primary font-bold tracking-widest text-xs uppercase bg-clony-primary/10 px-3 py-1 rounded-full">Real Results</span>
                        </ScrollSlideIn>
                        <ScrollSlideIn delay={0.1}>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                단, 2주 만에<br />
                                경험하는 놀라운 변화
                            </h2>
                        </ScrollSlideIn>
                        <ScrollSlideIn delay={0.2}>
                            <p className="text-gray-500 text-base md:text-lg leading-relaxed keep-all">
                                Clony AI가 제안한 루틴으로 관리한 2,840명의 평균 데이터입니다.<br />
                                수분량은 45% 증가하고, 붉은기는 32% 감소했습니다.<br />
                                직접 슬라이더를 움직여 피부 변화를 확인해보세요.
                            </p>
                        </ScrollSlideIn>

                        <ScrollSlideIn delay={0.3}>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div>
                                    <p className="text-3xl font-black text-gray-900">+45%</p>
                                    <p className="text-sm text-gray-400 font-bold">수분량 증가</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-gray-900">-32%</p>
                                    <p className="text-sm text-gray-400 font-bold">붉은기 개선</p>
                                </div>
                            </div>
                        </ScrollSlideIn>
                    </div>

                    <ScrollSlideIn delay={0.4} className="order-2 h-full flex items-center justify-center">
                        {/* Slider Component */}
                        <div
                            ref={containerRef}
                            className="relative w-full max-w-[500px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none ring-8 ring-white"
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                        >
                            {/* After Image (Background) */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#d4fc79] to-[#96e6a1] flex items-center justify-center">
                                <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-sm shadow-sm">
                                    After 2 Weeks
                                </div>
                            </div>

                            {/* Before Image (Foreground - Clipped) */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] flex items-center justify-center border-r-4 border-white overflow-hidden"
                                style={{ width: `${sliderPosition}%` }}
                            >
                                <div className="absolute inset-0 w-[500px] flex items-center justify-center"></div>
                            </div>

                            {/* Static Before Care Label - Fades out naturally as slider moves away */}
                            <div
                                className="absolute bottom-6 left-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-sm shadow-sm transition-opacity duration-300 pointer-events-none"
                                style={{ opacity: sliderPosition < 20 ? 0 : 1 }}
                            >
                                Before Care
                            </div>

                            {/* Slider Handle */}
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-clony-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </ScrollSlideIn>
                </div>
            </div>
        </section>
    );
};

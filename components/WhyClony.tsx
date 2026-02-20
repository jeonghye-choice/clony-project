import React from 'react';
import { ScrollSlideIn } from './Motion';

export const WhyClony: React.FC = () => {
    return (
        <section id="pain-point" className="py-24 px-4 overflow-hidden bg-white relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <ScrollSlideIn>
                        <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-500 text-xs font-bold tracking-widest mb-2 border border-red-100">
                            PAIN POINT
                        </span>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.1}>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                            매장에서 고민만 하다가<br />
                            <span className="text-gray-400">빈손으로 나온 적 있나요?</span>
                        </h2>
                    </ScrollSlideIn>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">

                    {/* Left: The "Old Way" (Problem) */}
                    <ScrollSlideIn delay={0.2} className="h-full">
                        <div className="h-full bg-gray-50 border border-gray-100 rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-500 mb-2">매장에서의 고민</h3>
                                    <p className="text-gray-400 text-lg break-keep">
                                        낯선 성분명, 외국어 표기,<br />
                                        내 피부에 맞는지 알 수 없는 불안함...
                                    </p>
                                </div>

                                {/* Visual Representation of Clutter */}
                                <div className="flex-1 relative min-h-[250px] bg-white rounded-2xl border border-gray-200 p-4 shadow-sm opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500">
                                    {/* Fake UI: Cluttered Text */}
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-100 rounded w-full"></div>
                                        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                                        <div className="h-3 bg-gray-100 rounded w-full"></div>

                                        <div className="grid grid-cols-4 gap-2 pt-4">
                                            <div className="h-16 bg-gray-100 rounded-lg col-span-1"></div>
                                            <div className="h-16 bg-gray-100 rounded-lg col-span-3 space-y-2 p-2">
                                                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            <div className="h-16 bg-gray-100 rounded-lg col-span-1"></div>
                                            <div className="h-16 bg-gray-100 rounded-lg col-span-3 space-y-2 p-2">
                                                <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                                                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Overlay "Confused" Emoji or Element */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-gray-100">
                                        <span className="text-3xl">🤯</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollSlideIn>

                    {/* Right: The "Clony Way" (Solution) */}
                    <ScrollSlideIn delay={0.3} className="h-full">
                        <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100 rounded-[32px] p-8 md:p-12 relative overflow-hidden ring-1 ring-teal-200/50">
                            {/* Glowing Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-white/50 backdrop-blur border border-teal-200 text-teal-600 px-3 py-1 rounded-full text-xs font-bold">SOLUTION</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Clony 분석</h3>
                                    <p className="text-gray-600 text-lg break-keep">
                                        성분표 찍으면 5초 안에 분석 완료.<br />
                                        <span className="text-teal-600 font-bold bg-teal-100/50 px-1 rounded">내 피부 타입과의 매칭도</span>까지 바로 확인하세요.
                                    </p>
                                </div>

                                {/* Visual Representation of Clean UI */}
                                <div className="flex-1 relative min-h-[250px] bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 p-6 shadow-xl flex flex-col items-center justify-center gap-4 transition-transform duration-500 hover:scale-[1.02]">

                                    <div className="absolute top-4 right-4 text-2xl animate-bounce">✨</div>

                                    {/* Product Card */}
                                    <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-50 flex items-center gap-4">
                                        <div className="w-16 h-16 bg-teal-50 rounded-lg flex items-center justify-center text-3xl">🧴</div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="text-[10px] text-teal-500 font-bold mb-1">98% 일치 (OSNW 맞춤)</div>
                                                    <div className="font-bold text-gray-800">라운드랩 자작나무 토너</div>
                                                </div>
                                                <div className="bg-teal-500 text-white rounded-full p-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm font-bold text-gray-400 mb-1">AI 분석 완료</p>
                                        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                                            "고객님께 가장 완벽한 선택입니다"
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </ScrollSlideIn>
                </div>
            </div>
        </section>
    );
};

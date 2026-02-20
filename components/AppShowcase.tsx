import React, { useState, useEffect } from 'react';
import { PhoneMockup } from './PhoneMockup';
import { ScrollSlideIn } from './Motion';
import { AnimatePresence, motion } from 'framer-motion';

const SCREEN_CONTENT = [
    {
        id: 'skin-diagnosis',
        title: '내 피부 타입 진단',
        desc: '간단한 퀴즈로 바우만 피부 타입을 확인하세요. 16가지 타입 중 당신의 피부를 정확히 분석합니다.',
        highlight: 'Skin Quiz',
        color: 'from-blue-400 to-teal-400',
        floatingCard: {
            icon: '✅',
            title: '진단 완료',
            desc: 'OSNW 타입으로 확인됨'
        },
        ui: (
            <div className="h-full bg-white relative flex flex-col p-4 pt-12 overflow-hidden">
                <div className="mb-6 text-center">
                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold mb-2 uppercase tracking-wide">Baumann Skin Type</div>
                    <div className="text-xl font-bold text-gray-900">피부 타입 진단<br />퀴즈</div>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 mb-6">
                    <div className="text-xs font-bold text-gray-700 mb-3">Q3. 세안 후 피부 상태는?</div>
                    <div className="space-y-2">
                        {['당기고 건조함', '촉촉하고 편안함', '번들거림', '부위별로 다름'].map((option, i) => (
                            <div key={i} className={`p-3 rounded-xl text-xs font-medium transition-all ${i === 1 ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-100'}`}>
                                {option}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((step, i) => (
                        <div key={step} className={`h-2 rounded-full transition-all ${i < 3 ? 'w-8 bg-blue-500' : 'w-2 bg-gray-200'}`}></div>
                    ))}
                </div>

                <div className="mt-auto">
                    <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-xl">
                        다음 질문
                    </button>
                    <div className="text-center text-[10px] text-gray-400 mt-2">
                        *약 1분 소요됩니다
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'ocr-scan',
        title: '성분표 스캔',
        desc: '매장에서 제품 성분표를 촬영하면 AI가 자동으로 인식합니다. 5초 안에 분석 결과를 확인하세요.',
        highlight: 'OCR Scan',
        color: 'from-purple-400 to-pink-400',
        floatingCard: {
            icon: '📸',
            title: '스캔 완료',
            desc: 'AI 분석 중...'
        },
        ui: (
            <div className="h-full bg-gray-900 relative flex flex-col p-4 pt-12 overflow-hidden">
                {/* Camera Viewfinder */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>

                {/* Scan Frame */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[3/4] border-2 border-white/30 rounded-2xl overflow-hidden">
                        {/* Mock Product Label */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center p-6">
                            <div className="bg-white rounded-xl p-4 w-full">
                                <div className="text-xs font-bold text-gray-900 mb-2">Round Lab</div>
                                <div className="text-[10px] text-gray-600 mb-3">자작나무 토너</div>
                                <div className="text-[8px] text-gray-500 leading-relaxed">
                                    자작나무수, 부틸렌글라이콜, 글리세린, 히알루론산나트륨...
                                </div>
                            </div>
                        </div>

                        {/* Scanning Animation */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
                        </div>

                        {/* Corner Markers */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-purple-400"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-purple-400"></div>
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-purple-400"></div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-purple-400"></div>
                    </div>
                </div>

                {/* Bottom UI */}
                <div className="relative z-10 mt-auto text-center">
                    <div className="text-white text-sm font-bold mb-2">성분표를 프레임 안에 맞춰주세요</div>
                    <div className="flex justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full border-4 border-white"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'analysis-result',
        title: '성분 분석 결과',
        desc: 'AI가 성분을 분석하고 내 피부 타입과의 매칭도를 알려줍니다. 핵심 성분, 효능, 주의사항까지 한눈에 확인하세요.',
        highlight: 'AI Analysis',
        color: 'from-teal-400 to-green-400',
        floatingCard: {
            icon: '✨',
            title: '매칭도 분석',
            desc: 'OSNW 타입에 98% 적합'
        },
        ui: (
            <div className="h-full bg-white relative flex flex-col p-4 pt-12 overflow-hidden">
                <div className="text-center mb-6">
                    <div className="inline-block px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[10px] font-bold mb-2">Analysis Complete</div>
                    <div className="text-xl font-bold text-gray-900">라운드랩<br />자작나무 토너</div>
                </div>

                {/* 매칭도 */}
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-4 mb-4 border border-teal-200">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-bold text-gray-700">피부 타입 매칭도</div>
                        <div className="text-2xl font-black text-teal-600">98%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    <div className="text-[10px] text-gray-600">
                        <span className="font-bold text-teal-600">OSNW 타입</span>에 매우 적합합니다
                    </div>
                </div>

                {/* 핵심 성분 */}
                <div className="space-y-2 mb-4">
                    <div className="text-xs font-bold text-gray-700">핵심 성분</div>
                    <div className="flex items-start gap-2 bg-teal-50 p-2 rounded-lg">
                        <span className="text-teal-600 text-xs">✓</span>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold text-gray-900">자작나무수</div>
                            <div className="text-[9px] text-gray-600">수분 공급, 진정</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 bg-blue-50 p-2 rounded-lg">
                        <span className="text-blue-600 text-xs">✓</span>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold text-gray-900">히알루론산</div>
                            <div className="text-[9px] text-gray-600">보습, 장벽 강화</div>
                        </div>
                    </div>
                </div>

                {/* 주의사항 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <div className="text-[10px] font-bold text-yellow-800 mb-1">⚠️ 주의사항</div>
                    <div className="text-[9px] text-yellow-700">알코올 성분 소량 포함</div>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                    <button className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl">
                        🛒 장바구니에 담기
                    </button>
                </div>
            </div>
        )
    }
];

const PHONE_ROTATION = { x: 0, y: -15 };

export const AppShowcase: React.FC = () => {
    const [activeIdx, setActiveIdx] = useState(0);

    // Auto-play carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % SCREEN_CONTENT.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const content = SCREEN_CONTENT[activeIdx];

    return (
        <section className="py-32 px-4 bg-gray-50 relative overflow-hidden">
            {/* Background Decoration (Brand O-shape or subtle blur) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl opacity-60"></div>

            <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <div className="space-y-8 text-center md:text-left order-2 md:order-1">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeIdx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${content.color} text-white text-xs font-bold tracking-widest shadow-lg shadow-gray-200`}>
                                {content.highlight}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight break-keep">
                                {content.title}
                            </h2>
                            <p className="text-xl text-gray-500 leading-relaxed max-w-lg mx-auto md:mx-0 break-keep">
                                {content.desc}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination Indicators */}
                    <div className="flex gap-3 justify-center md:justify-start pt-4">
                        {SCREEN_CONTENT.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIdx(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-8 bg-black' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Phone Mockup Area */}
                <div className="relative h-[600px] flex items-center justify-center order-1 md:order-2">
                    <ScrollSlideIn direction='right' className="scale-90 md:scale-100 origin-center">
                        <PhoneMockup rotation={PHONE_ROTATION}>
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={activeIdx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    {content.ui}
                                </motion.div>
                            </AnimatePresence>
                        </PhoneMockup>
                    </ScrollSlideIn>

                    {/* Floating Interaction Card */}
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeIdx}
                            initial={{ opacity: 0, x: 50, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: 50, y: 20 }}
                            transition={{ delay: 0.2 }}
                            className="absolute bottom-[20%] -right-[10px] md:-right-[40px] bg-white p-4 pr-8 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 z-20 max-w-[240px]"
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl shadow-inner">
                                {content.floatingCard.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-900">{content.floatingCard.title}</p>
                                <p className="text-[10px] text-gray-500 leading-tight">{content.floatingCard.desc}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

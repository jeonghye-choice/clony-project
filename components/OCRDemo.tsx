import React, { useState } from 'react';
import { ScrollSlideIn } from './Motion';
import { motion, AnimatePresence } from 'framer-motion';

export const OCRDemo: React.FC = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleScan = () => {
        setIsAnalyzing(true);
        setShowResult(false);

        // 5초 후 분석 결과 표시
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResult(true);
        }, 2000);
    };

    const handleReset = () => {
        setShowResult(false);
        setIsAnalyzing(false);
    };

    return (
        <section className="py-24 px-4 bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <ScrollSlideIn>
                        <span className="inline-block py-1 px-3 rounded-full bg-teal-100 text-teal-600 text-xs font-bold tracking-widest mb-2 border border-teal-200">
                            INTERACTIVE DEMO
                        </span>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.1}>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                            직접 체험해보세요
                        </h2>
                        <p className="text-lg text-gray-500 mt-4">
                            성분표를 클릭하면 AI 분석 과정을 시뮬레이션합니다
                        </p>
                    </ScrollSlideIn>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
                    {/* Left: 성분표 이미지 */}
                    <ScrollSlideIn delay={0.2}>
                        <div className="relative">
                            <div
                                onClick={!showResult ? handleScan : handleReset}
                                className={`bg-white rounded-3xl p-8 shadow-2xl border-2 transition-all duration-300 cursor-pointer ${isAnalyzing ? 'border-teal-400 scale-105' : 'border-gray-200 hover:border-teal-300 hover:shadow-xl'
                                    }`}
                            >
                                {/* 성분표 Mock UI */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl"></div>
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-900">라운드랩 자작나무 토너</h3>
                                            <p className="text-sm text-gray-500">Round Lab Birch Juice Toner</p>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <p className="text-xs font-bold text-gray-700 mb-2">전성분 (Ingredients)</p>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            자작나무수, 부틸렌글라이콜, 글리세린, 디메치콘, 베타인, 글리세릴글루코사이드, 디프로필렌글라이콜,
                                            1,2-헥산디올, 메틸프로판디올, 프로판디올, 알란토인, 판테놀, 글리세릴카프릴레이트,
                                            에틸헥실글리세린, 디소듐이디티에이, 히알루론산나트륨, 카보머, 트로메타민, 아시아티코사이드,
                                            아시아틱애씨드, 마데카식애씨드, 마데카소사이드
                                        </p>
                                    </div>
                                </div>

                                {/* 스캔 오버레이 */}
                                <AnimatePresence>
                                    {isAnalyzing && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-teal-500/10 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                                        >
                                            <div className="text-center">
                                                <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                                <p className="text-teal-600 font-bold">AI 성분 분석 중...</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* 클릭 안내 */}
                                {!showResult && !isAnalyzing && (
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                                        📸 클릭하여 스캔하기
                                    </div>
                                )}

                                {showResult && (
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gray-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg cursor-pointer hover:bg-gray-600">
                                        🔄 다시 스캔하기
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollSlideIn>

                    {/* Right: 분석 결과 */}
                    <ScrollSlideIn delay={0.3}>
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 min-h-[500px]">
                            <AnimatePresence mode="wait">
                                {!showResult && !isAnalyzing && (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center h-full text-center"
                                    >
                                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-6xl mb-6">
                                            📱
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">분석 결과가 여기에 표시됩니다</h3>
                                        <p className="text-gray-500">왼쪽 성분표를 클릭해보세요!</p>
                                    </motion.div>
                                )}

                                {showResult && (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        {/* 피부 타입 매칭도 */}
                                        <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 border border-teal-200">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-bold text-gray-900">피부 타입 매칭도</h3>
                                                <span className="text-3xl font-black text-teal-600">98%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "98%" }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                    className="bg-gradient-to-r from-teal-400 to-blue-500 h-3 rounded-full"
                                                ></motion.div>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-bold text-teal-600">OSNW 타입</span>에 매우 적합합니다
                                            </p>
                                        </div>

                                        {/* 핵심 성분 */}
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-3">핵심 성분</h3>
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2 bg-teal-50 p-3 rounded-xl">
                                                    <span className="text-teal-600">✓</span>
                                                    <div>
                                                        <p className="font-bold text-sm text-gray-900">자작나무수 (Birch Sap)</p>
                                                        <p className="text-xs text-gray-600">수분 공급, 진정 효과</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-xl">
                                                    <span className="text-blue-600">✓</span>
                                                    <div>
                                                        <p className="font-bold text-sm text-gray-900">히알루론산 (Hyaluronic Acid)</p>
                                                        <p className="text-xs text-gray-600">보습, 피부 장벽 강화</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2 bg-green-50 p-3 rounded-xl">
                                                    <span className="text-green-600">✓</span>
                                                    <div>
                                                        <p className="font-bold text-sm text-gray-900">판테놀 (Panthenol)</p>
                                                        <p className="text-xs text-gray-600">진정, 재생 촉진</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 주의사항 */}
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                                            <h3 className="text-sm font-bold text-yellow-800 mb-2">⚠️ 주의사항</h3>
                                            <p className="text-xs text-yellow-700">
                                                알코올 성분이 소량 포함되어 있어 매우 민감한 피부는 패치 테스트를 권장합니다.
                                            </p>
                                        </div>

                                        {/* 사용자 리뷰 요약 */}
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 mb-2">💬 사용자 리뷰 요약</h3>
                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                "수분감이 좋고 끈적임 없이 흡수가 빠름", "민감한 피부에도 자극 없음", "가성비 좋은 토너"
                                            </p>
                                        </div>

                                        {/* CTA 버튼 */}
                                        <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            🛒 장바구니에 담기
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </ScrollSlideIn>
                </div>

                {/* 하단 안내 */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 text-sm mb-4">
                        실제 앱에서는 카메라로 직접 촬영하여 분석할 수 있습니다
                    </p>
                    <button className="bg-white text-teal-600 font-bold px-8 py-3 rounded-full border-2 border-teal-500 hover:bg-teal-50 transition-colors">
                        📱 앱 다운로드하기
                    </button>
                </div>
            </div>
        </section>
    );
};

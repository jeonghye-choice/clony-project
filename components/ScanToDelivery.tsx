import React from 'react';
import { ScrollSlideIn } from './Motion';

export const ScanToDelivery: React.FC = () => {
    const timeline = [
        {
            icon: "📸",
            title: "매장에서 스캔",
            time: "0분",
            desc: "제품 성분표를 카메라로 촬영",
            color: "from-purple-400 to-pink-500"
        },
        {
            icon: "🤖",
            title: "AI 성분 분석",
            time: "5초",
            desc: "OCR + 피부 타입 매칭도 분석",
            color: "from-teal-400 to-blue-500"
        },
        {
            icon: "🛒",
            title: "장바구니 & 결제",
            time: "1분",
            desc: "앱에서 간편하게 주문",
            color: "from-blue-400 to-indigo-500"
        },
        {
            icon: "🚚",
            title: "당일/새벽 배송",
            time: "당일~새벽",
            desc: "숙소 앞으로 빠른 배송",
            color: "from-green-400 to-teal-500"
        }
    ];

    return (
        <section className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <ScrollSlideIn>
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest mb-2 border border-blue-100">
                            FULL JOURNEY
                        </span>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.1}>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                            스캔부터 배송까지<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600">단 몇 분이면 충분합니다</span>
                        </h2>
                    </ScrollSlideIn>
                </div>

                {/* Desktop: Horizontal Timeline */}
                <div className="hidden md:block">
                    <div className="relative">
                        {/* Connection Line */}
                        <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-teal-200 via-blue-200 to-green-200"></div>

                        <div className="grid grid-cols-4 gap-8 relative">
                            {timeline.map((step, i) => (
                                <ScrollSlideIn key={i} delay={i * 0.15}>
                                    <div className="flex flex-col items-center text-center">
                                        {/* Icon Circle */}
                                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-4xl shadow-xl mb-6 relative z-10 transform hover:scale-110 transition-transform duration-300`}>
                                            {step.icon}
                                        </div>

                                        {/* Time Badge */}
                                        <div className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-xs font-bold mb-3">
                                            {step.time}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-500">{step.desc}</p>
                                    </div>
                                </ScrollSlideIn>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile: Vertical Timeline */}
                <div className="md:hidden space-y-8">
                    {timeline.map((step, i) => (
                        <ScrollSlideIn key={i} delay={i * 0.1}>
                            <div className="flex items-start gap-4">
                                {/* Icon Circle */}
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                                        {step.time}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                                    <p className="text-sm text-gray-500">{step.desc}</p>
                                </div>
                            </div>

                            {/* Connector */}
                            {i < timeline.length - 1 && (
                                <div className="ml-8 h-8 w-1 bg-gradient-to-b from-gray-200 to-gray-100"></div>
                            )}
                        </ScrollSlideIn>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <ScrollSlideIn delay={0.6}>
                        <p className="text-gray-600 mb-6 text-lg">
                            더 이상 매장에서 고민하지 마세요.<br />
                            <span className="font-bold text-teal-600">Clony가 모든 과정을 간편하게 만들어드립니다.</span>
                        </p>
                        <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold px-12 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            지금 시작하기 →
                        </button>
                    </ScrollSlideIn>
                </div>
            </div>
        </section>
    );
};

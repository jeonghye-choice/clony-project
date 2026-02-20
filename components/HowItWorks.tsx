import React from 'react';
import { ScrollSlideIn } from './Motion';

export const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: "📝",
            title: "1. 피부 타입 진단",
            desc: "간단한 퀴즈로\n내 피부 타입을 확인합니다."
        },
        {
            icon: "📸",
            title: "2. 성분표 스캔",
            desc: "매장에서 제품을 찍으면\nAI가 성분을 분석하고\n내 피부와의 매칭도를 알려줍니다."
        },
        {
            icon: "🚚",
            title: "3. 즉시 구매 & 배송",
            desc: "앱에서 바로 주문하면\n당일 또는 새벽에 배송됩니다."
        }
    ];

    return (
        <section className="py-24 bg-clony-surface/30">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <ScrollSlideIn>
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                        성분표 찍고 <span className="text-clony-primary">5초</span> 만에 확인
                    </h2>
                </ScrollSlideIn>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {steps.map((step, i) => (
                        <ScrollSlideIn key={i} delay={i * 0.2} className="relative">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-20 h-20 bg-clony-surface rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed whitespace-pre-line">{step.desc}</p>
                            </div>
                            {/* Connector (Arrow) for Desktop */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-clony-primary/30 transform -translate-y-1/2 z-10">
                                    ▶
                                </div>
                            )}
                        </ScrollSlideIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

import React from 'react';
import { ScrollSlideIn } from './Motion';

export const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: "📸",
            title: "1. 사진 촬영",
            desc: "카메라로 얼굴을 촬영하여\n정밀 데이터를 수집합니다."
        },
        {
            icon: "🧠",
            title: "2. AI 정밀 분석",
            desc: "모공, 주름, 탄력 등\n6가지 항목을 분석합니다."
        },
        {
            icon: "✨",
            title: "3. 맞춤 솔루션",
            desc: "현재 피부 상태에 딱 맞는\n제품과 루틴을 추천합니다."
        }
    ];

    return (
        <section className="py-24 bg-clony-surface/30">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <ScrollSlideIn>
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                        <span className="text-clony-primary">3초</span>만에 끝나는 피부 진단
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

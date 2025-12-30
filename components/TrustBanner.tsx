import React from 'react';
import { ScrollSlideIn } from './Motion';

export const TrustBanner: React.FC = () => {
    const stats = [
        { label: "AI 진단 정확도", value: "98%" },
        { label: "누적 피부 분석", value: "100만+" },
        { label: "제휴 화장품 브랜드", value: "50+" },
    ];

    return (
        <section id="trust-banner" className="py-12 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {stats.map((stat, i) => (
                        <ScrollSlideIn key={i} delay={i * 0.1} className="py-4 md:py-0">
                            <p className="text-4xl md:text-5xl font-bold text-clony-primary font-display mb-2">{stat.value}</p>
                            <p className="text-gray-500 font-medium text-sm md:text-base">{stat.label}</p>
                        </ScrollSlideIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

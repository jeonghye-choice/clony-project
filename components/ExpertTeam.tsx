import React from 'react';
import { ScrollSlideIn } from './Motion';

interface ExpertProps {
    name: string;
    role: string;
    image: string;
    description: string;
    delay: number;
}

const ExpertCard: React.FC<ExpertProps> = ({ name, role, image, description, delay }) => (
    <ScrollSlideIn delay={delay}>
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden relative">
                    <div className="absolute inset-0 bg-clony-primary/10 group-hover:bg-transparent transition-colors"></div>
                    {/* Placeholder for real images, using emoji/icons for now if no assets available, or abstract gradients */}
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                        {image}
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900">{name}</h4>
                    <p className="text-sm text-clony-primary font-semibold">{role}</p>
                </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed keep-all">
                {description}
            </p>
        </div>
    </ScrollSlideIn>
);

export const ExpertTeam: React.FC = () => {
    const experts = [
        {
            name: "Dr. Olivia Kim",
            role: "Chief Dermatologist",
            image: "👩‍⚕️",
            description: "서울대 의과대학 피부과 전문의. 15년 이상의 임상 경험을 바탕으로 Clony의 피부 분석 알고리즘을 감수합니다.",
            delay: 0.1
        },
        {
            name: "James Park",
            role: "AI Tech Lead",
            image: "👨‍💻",
            description: "KAIST AI 박사. 최신 컴퓨터 비전 기술을 적용하여 0.1초 만에 피부 상태를 정밀하게 분석하는 엔진을 설계했습니다.",
            delay: 0.2
        },
        {
            name: "Dr. Sarah Lee",
            role: "Data Scientist",
            image: "🔬",
            description: "빅데이터 분석 전문가. 100만 건 이상의 피부 데이터를 분석하여 개인 맞춤형 화장품 추천 로직을 고도화합니다.",
            delay: 0.3
        }
    ];

    return (
        <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <ScrollSlideIn>
                        <span className="text-clony-primary font-bold tracking-widest text-xs uppercase bg-clony-primary/10 px-3 py-1 rounded-full">Expert Team</span>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.1}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            최고의 전문가들이<br />
                            <span className="text-clony-primary">당신의 피부</span>를 연구합니다
                        </h2>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.2}>
                        <p className="text-gray-500 max-w-2xl mx-auto break-keep">
                            단순한 알고리즘이 아닙니다.<br />
                            피부과 전문의와 AI 전문가가 함께 만든 신뢰할 수 있는 Clony만의 솔루션을 경험해보세요.
                        </p>
                    </ScrollSlideIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {experts.map((expert, index) => (
                        <ExpertCard key={index} {...expert} />
                    ))}
                </div>
            </div>
        </section>
    );
};

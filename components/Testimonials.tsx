import React from 'react';
import { ScrollSlideIn } from './Motion';

export const Testimonials: React.FC = () => {
    const reviews = [
        {
            user: "김민지",
            age: "24세",
            score: "70점 → 92점",
            content: "수분 부족형 지성이라 제품 고르기가 힘들었는데, 추천해주신 토너 쓰고 속건조가 완전히 해결됐어요!",
            hashtag: "#수부지 #인생템"
        },
        {
            user: "이준호",
            age: "29세",
            score: "55점 → 88점",
            content: "피부과 갈 시간은 없고 홈케어는 막막했는데, 매일 아침 피부 상태 체크하면서 관리하니 정말 좋아지네요.",
            hashtag: "#남성스킨케어 #홈케어"
        },
        {
            user: "박서연",
            age: "31세",
            score: "65점 → 95점",
            content: "기미랑 잡티가 고민이었는데 AI가 분석해준 미백 세럼 꾸준히 바르고 얼굴 환해졌다는 소리 많이 들어요.",
            hashtag: "#미백관리 #30대기초"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <ScrollSlideIn>
                    <div className="text-center mb-16">
                        <span className="text-clony-primary font-bold tracking-widest text-sm uppercase bg-clony-primary/10 px-3 py-1 rounded-full">Real Review</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
                            이미 <span className="text-clony-primary">10만 명</span>이<br />
                            효과를 경험했습니다.
                        </h2>
                    </div>
                </ScrollSlideIn>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <ScrollSlideIn key={i} delay={i * 0.15}>
                            <div className="bg-gray-50 p-8 rounded-3xl h-full flex flex-col justify-between border border-transparent hover:border-clony-primary/30 transition-colors">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
                                        </div>
                                        <div className="bg-white px-3 py-1 rounded-full text-xs font-bold text-clony-primary shadow-sm border border-gray-100">
                                            {review.score}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-lg font-medium leading-relaxed mb-6 break-keep">
                                        "{review.content}"
                                    </p>
                                </div>
                                <div>
                                    <div className="text-gray-900 font-bold text-base">{review.user} <span className="text-gray-400 font-normal text-sm ml-1">({review.age})</span></div>
                                    <p className="text-clony-secondary text-sm font-semibold mt-1">{review.hashtag}</p>
                                </div>
                            </div>
                        </ScrollSlideIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

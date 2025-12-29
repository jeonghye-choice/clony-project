import React, { useState } from 'react';
import { ScrollSlideIn } from './Motion';

interface Post {
    id: number;
    user: string;
    avatar: string;
    tag: string;
    tagColor: string;
    question: string;
    answers: number;
    likes: number;
    preview: string;
}

const posts: Post[] = [
    {
        id: 1,
        user: "지성피부고민러",
        avatar: "👩",
        tag: "#수부지템",
        tagColor: "bg-blue-100 text-blue-600",
        question: "속건조 잡는 수분크림 추천해주세요! ㅠㅠ",
        answers: 12,
        likes: 45,
        preview: "겉은 번들거리는데 세수하고 나면 너무 당겨요... 가벼우면서도 수분감 오래가는 제품 없을까요?"
    },
    {
        id: 2,
        user: "모공요정",
        avatar: "🧑",
        tag: "#모공케어",
        tagColor: "bg-green-100 text-green-600",
        question: "코 모공 작아지는 꿀팁 공유합니다 (3주차 후기)",
        answers: 8,
        likes: 120,
        preview: "클로니 AI 진단받고 추천해준 BHA 토너랑 레티놀 앰플 조합으로 관리한 지 3주 됐는데 진짜 효과 있어요!"
    },
    {
        id: 3,
        user: "예민보스",
        avatar: "👧",
        tag: "#민감성",
        tagColor: "bg-pink-100 text-pink-600",
        question: "피부과 시술 후 진정 케어 어떻게 하시나요?",
        answers: 24,
        likes: 89,
        preview: "어제 레이저 받고 왔는데 얼굴이 너무 붉어요. 자극 없이 진정시킬 수 있는 마스크팩이나 크림 있을까요?"
    }
];

export const CommunityPreview: React.FC = () => {
    const [activeTab, setActiveTab] = useState('전체');
    const tabs = ['전체', '스킨케어', '제품추천', '비포애프터', '꿀팁공유'];

    return (
        <section className="py-24 px-4 md:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <ScrollSlideIn>
                        <span className="text-clony-primary font-bold tracking-widest text-xs uppercase bg-clony-primary/10 px-3 py-1 rounded-full">Clony Community</span>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.1}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            나와 같은 피부 고민,<br />
                            <span className="text-clony-primary">함께 해결해요</span>
                        </h2>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.2}>
                        <p className="text-gray-500 max-w-xl mx-auto break-keep">
                            혼자 고민하지 마세요.<br />
                            100만 명의 Clony 사용자들이 생생한 후기와 꿀팁을 공유하고 있습니다.
                        </p>
                    </ScrollSlideIn>
                </div>

                {/* Categories (Mobile App Style Tabs) */}
                <ScrollSlideIn delay={0.3} className="flex justify-center flex-wrap gap-2 mb-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab
                                ? 'bg-clony-primary text-white shadow-lg shadow-clony-primary/30 transform scale-105'
                                : 'bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </ScrollSlideIn>

                {/* Post Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map((post, idx) => (
                        <ScrollSlideIn key={post.id} delay={0.4 + idx * 0.1}>
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">

                                {/* Tag & User */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${post.tagColor}`}>
                                        {post.tag}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">
                                            {post.avatar}
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">{post.user}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-clony-primary transition-colors">
                                    Q. {post.question}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-[40px]">
                                    {post.preview}
                                </p>

                                {/* Footer Stats */}
                                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium border-t border-gray-50 pt-4">
                                    <div className="flex items-center gap-1 text-clony-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.562 2.632 6.19l-2.484 1.55b.5.5 0 0 0 .182.935c.036.009.073.013.11.013a.48.48 0 0 0 .175-.029l3.525-1.124Z" clipRule="evenodd" />
                                        </svg>
                                        <span>답변 {post.answers}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-pink-400">
                                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                        </svg>
                                        <span>{post.likes}</span>
                                    </div>
                                </div>

                            </div>
                        </ScrollSlideIn>
                    ))}
                </div>

                {/* Mobile App Call to Action Frame */}
                <ScrollSlideIn delay={0.6}>
                    <div className="mt-12 bg-white rounded-full p-2 max-w-sm mx-auto shadow-lg border border-gray-100 flex items-center justify-between pl-6 hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => document.getElementById('download-trigger')?.click()}>
                        <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors">더 많은 꿀팁이 궁금하다면?</span>
                        <div className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 group-hover:bg-clony-primary transition-colors">
                            앱에서 보기
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                        </div>
                    </div>
                </ScrollSlideIn>

            </div>
        </section>
    );
};

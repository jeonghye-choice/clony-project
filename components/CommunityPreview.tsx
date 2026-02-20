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
        user: "OSPT마스터",
        avatar: "🧪",
        tag: "OSPT 전용방",
        tagColor: "bg-blue-50 text-blue-600 border border-blue-100",
        question: "OSPT끼리만 아는 꿀템, 여기서 확인하세요.",
        answers: 156,
        likes: 842,
        preview: "지성·민감성(OSPT) 방: 이번 여름에 정착한 수분크림 공유합니다! 끈적임 없이 속건조만 딱 잡아주네요."
    },
    {
        id: 2,
        user: "DSNT요정",
        avatar: "✨",
        tag: "DSNT 전용방",
        tagColor: "bg-orange-50 text-orange-600 border border-orange-100",
        question: "건성·색소(DSNT) 방: 잡티 지우개 조합 찾으시는 분?",
        answers: 89,
        likes: 1205,
        preview: "비타민C랑 페룰릭 애씨드 조합으로 2주 썼는데 속기미가 옅어지는게 눈에 보여요. 완전 추천!"
    },
    {
        id: 3,
        user: "피부MBTI박사",
        avatar: "🎓",
        tag: "정보공유",
        tagColor: "bg-purple-50 text-purple-600 border border-purple-100",
        question: "내 타입이랑 똑같은 사람들의 진짜 후기",
        answers: 243,
        likes: 567,
        preview: "광고 없는 진짜 정보를 찾으시나요? 나랑 똑같은 피부 타입을 가진 사람들의 성분 조합 정보를 앱에서 바로 만나보세요."
    }
];

export const CommunityPreview: React.FC = () => {
    return (
        <section className="py-24 px-4 md:px-8 bg-white border-t border-gray-50">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 space-y-4 px-4">
                    <ScrollSlideIn>
                        <span className="text-clony-primary font-bold tracking-widest text-xs uppercase bg-clony-primary/10 px-3 py-1 rounded-full">Skin MBTI Community</span>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.1}>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight break-keep">
                            "피부 타입이 같으면<br />
                            <span className="text-clony-primary text-4xl md:text-6xl mt-2 block">통하는 게 있으니까"</span>
                        </h2>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.2}>
                        <p className="text-gray-500 font-medium max-w-xl mx-auto break-keep">
                            유저들이 가장 기대하는 '피부 MBTI 커뮤니티'를 미리 만나보세요.<br />
                            나와 똑같은 피부 타입의 생생한 후기가 기다리고 있습니다.
                        </p>
                    </ScrollSlideIn>
                </div>

                {/* Post Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <ScrollSlideIn key={post.id} delay={0.3 + idx * 0.1}>
                            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative overflow-hidden h-full flex flex-col">

                                {/* Background Accent */}
                                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 -mr-10 -mt-10 transition-opacity group-hover:opacity-20 ${post.id === 1 ? 'bg-blue-400' : post.id === 2 ? 'bg-orange-400' : 'bg-purple-400'
                                    }`} />

                                <div className="flex justify-between items-center mb-6">
                                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${post.tagColor}`}>
                                        {post.tag}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                                            {post.avatar}
                                        </div>
                                        <span className="text-xs text-gray-400 font-bold">{post.user}</span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-black text-gray-900 text-xl mb-4 line-clamp-2 leading-tight group-hover:text-clony-primary transition-colors break-keep">
                                        {post.question}
                                    </h3>
                                    <p className="text-gray-500 text-[15px] font-medium leading-relaxed break-keep">
                                        {post.preview}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-300 font-bold mt-8 pt-6 border-t border-gray-50">
                                    <div className="flex items-center gap-1.5 group-hover:text-clony-primary transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.562 2.632 6.19l-2.484 1.55b.5.5 0 0 0 .182.935c.036.009.073.013.11.013a.48.48 0 0 0 .175-.029l3.525-1.124Z" clipRule="evenodd" /></svg>
                                        <span>{post.answers}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 group-hover:text-pink-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" /></svg>
                                        <span>{post.likes > 1000 ? (post.likes / 1000).toFixed(1) + 'k' : post.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollSlideIn>
                    ))}
                </div>

                {/* Action Frame */}
                <ScrollSlideIn delay={0.6}>
                    <div className="mt-16 bg-clony-dark rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden group">
                        {/* Decorative background */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(60,186,149,0.2),transparent)] pointer-events-none" />

                        <div className="relative z-10 space-y-6">
                            <h3 className="text-white text-2xl md:text-3xl font-black">
                                내 피부 타입의 <span className="text-clony-primary underline underline-offset-8">진짜 정보</span>를 찾고 있나요?
                            </h3>
                            <p className="text-gray-400 font-medium max-w-2xl mx-auto">
                                광고와 홍보에 지치셨다면, 나와 똑같은 피부 고민을 가진 사람들의<br className="hidden md:block" />
                                솔직한 리뷰와 관리법을 지금 바로 클로니 앱에서 확인하세요.
                            </p>
                            <div className="flex justify-center pt-4">
                                <button className="bg-clony-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-clony-primary/20 hover:scale-105 active:scale-95 transition-all text-lg flex items-center gap-3">
                                    앱에서 커뮤니티 참여하기
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollSlideIn>

            </div>
        </section>
    );
};

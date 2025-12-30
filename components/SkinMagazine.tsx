import React from 'react';
import { ScrollSlideIn } from './Motion';

interface ArticleProps {
    category: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    imageColor: string;
    delay: number;
}

const ArticleCard: React.FC<ArticleProps> = ({ category, title, excerpt, date, readTime, imageColor, delay }) => (
    <ScrollSlideIn delay={delay}>
        <div className="group cursor-pointer">
            <div className={`aspect-[4/3] rounded-2xl mb-5 overflow-hidden relative ${imageColor} shadow-md`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-800">
                    {category}
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <span>{date}</span>
                    <span>•</span>
                    <span>{readTime} read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-clony-primary transition-colors leading-tight">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {excerpt}
                </p>
                <div className="pt-2 flex items-center text-clony-primary text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Read Article <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </div>
            </div>
        </div>
    </ScrollSlideIn>
);

export const SkinMagazine: React.FC = () => {
    const articles = [
        {
            category: "Skin Care",
            title: "겨울철 속건조, 이것만 알면 해결!",
            excerpt: "아무리 발라도 건조한 피부, 원인은 피부 장벽에 있습니다. 피부과 전문의가 알려주는 겨울철 보습 꿀팁 3가지를 확인해보세요.",
            date: "Dec 28, 2024",
            readTime: "5 min",
            imageColor: "bg-blue-100",
            delay: 0.1
        },
        {
            category: "Ingredients",
            title: "레티놀 vs 비타민C, 나에게 맞는 성분은?",
            excerpt: "안티에이징의 대명사 레티놀과 미백의 왕 비타민C. 내 피부 타입과 고민에 따라 어떤 성분을 선택해야 할까요?",
            date: "Dec 25, 2024",
            readTime: "7 min",
            imageColor: "bg-yellow-100",
            delay: 0.2
        },
        {
            category: "Trends",
            title: "2025년 뷰티 트렌드: AI와 맞춤형 화장품",
            excerpt: "AI 기술이 뷰티 산업을 어떻게 바꾸고 있을까요? 초개인화된 뷰티 솔루션의 미래를 미리 만나봅니다.",
            date: "Dec 20, 2024",
            readTime: "4 min",
            imageColor: "bg-purple-100",
            delay: 0.3
        }
    ];

    return (
        <section className="py-24 px-4 md:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-4">
                        <ScrollSlideIn>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Clony <span className="text-transparent bg-clip-text bg-gradient-to-r from-clony-primary to-clony-secondary">Magazine</span>
                            </h2>
                        </ScrollSlideIn>
                        <ScrollSlideIn delay={0.1}>
                            <p className="text-gray-500 max-w-lg">
                                피부 관리에 대한 궁금증, Clony가 쉽고 정확하게 알려드립니다.<br />
                                매주 업데이트되는 뷰티 인사이트를 놓치지 마세요.
                            </p>
                        </ScrollSlideIn>
                    </div>
                    <ScrollSlideIn delay={0.2}>
                        <button className="px-6 py-3 rounded-full border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-colors flex items-center gap-2">
                            전체 보기
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" /></svg>
                        </button>
                    </ScrollSlideIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <ArticleCard key={index} {...article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

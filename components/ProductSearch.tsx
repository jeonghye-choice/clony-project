import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollSlideIn } from './Motion';

interface Product {
    id: number;
    brand: string;
    name: string;
    tags: string[];
    image: string;
    matchScore: number;
    matchGrade: string;
    analysis: string;
}

const PRODUCTS: Product[] = [
    { id: 1, brand: 'VT', name: '리들샷 100 에센스', tags: ['모공케어', '피부결', '품절대란'], image: '💉', matchScore: 92, matchGrade: 'Perfect', analysis: '고객님의 모공 고민 해결에 탁월해요. 시카 성분이 진정 효과까지 더해줍니다.' },
    { id: 2, brand: '토리든', name: '다이브인 저분자 히알루론산 세럼', tags: ['수분충전', '속건조', '물광'], image: '💧', matchScore: 88, matchGrade: 'Great', analysis: '수분 부족형 지성 피부에 딱 맞는 산뜻한 수분감을 제공합니다.' },
    { id: 3, brand: '아누아', name: '어성초 77 수딩 토너', tags: ['진정케어', '트러블', '순한오일'], image: '🌿', matchScore: 95, matchGrade: 'Perfect', analysis: '민감해진 피부를 빠르게 진정시켜주는 어성초 성분이 77% 함유되어 있어요.' },
    { id: 4, brand: '닥터지', name: '레드 블레미쉬 클리어 수딩 크림', tags: ['진정', '수분', '여드름성'], image: '💊', matchScore: 85, matchGrade: 'Good', analysis: '여드름성 피부 적합 테스트를 완료하여 안심하고 사용할 수 있는 수분 크림입니다.' },
    { id: 5, brand: '라운드랩', name: '1025 독도 토너', tags: ['각질제거', '데일리', '순한토너'], image: '⛰️', matchScore: 90, matchGrade: 'Great', analysis: '자극 없이 각질을 정돈해주어 매일 사용하기 좋은 데일리 토너입니다.' },
    { id: 6, brand: '에스트라', name: '아토베리어365 크림', tags: ['장벽강화', '고보습', '캡슐크림'], image: '🛡️', matchScore: 82, matchGrade: 'Good', analysis: '피부 장벽이 약해졌을 때 튼튼하게 채워주는 고보습 캡슐 크림이에요.' },
    { id: 7, brand: '바이오던스', name: '바이오 콜라겐 리얼 딥 마스크', tags: ['모공', '탄력', '콜라겐'], image: '🎭', matchScore: 89, matchGrade: 'Great', analysis: '늘어진 모공을 쫀쫀하게 잡아주는 콜라겐 팩입니다.' },
    { id: 8, brand: '성분에디터', name: '그린토마토 포어 리프팅 앰플', tags: ['모공축소', '피지조절', '탄력'], image: '🍅', matchScore: 91, matchGrade: 'Excellent', analysis: '가로 세로 늘어진 모공을 동시에 케어해주는 리프팅 앰플입니다.' },
];

export interface ProductSearchProps {
    isQuizCompleted: boolean;
    onScrollToQuiz: () => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ isQuizCompleted, onScrollToQuiz }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === '') {
            setResults([]);
            return;
        }

        const filtered = PRODUCTS.filter(p =>
            p.name.includes(value) ||
            p.brand.includes(value) ||
            p.tags.some(t => t.includes(value))
        );
        setResults(filtered);
    };

    const handleSelectProduct = (product: Product) => {
        if (!isQuizCompleted) {
            alert('1분 검사를 먼저 실시해주세요! 📝');
            onScrollToQuiz();
            return;
        }

        setQuery('');
        setResults([]);
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setSelectedProduct(product);
        }, 1500);
    };

    return (
        <section className="py-32 px-4 md:px-8 bg-clony-surface/50 border-t border-clony-primary/10" id="product-search">
            <div className="max-w-4xl mx-auto text-center space-y-10 relative">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900 leading-tight break-keep">
                    화려한 광고 말고, <br />내 피부에 딱 맞는 인생템 찾기
                </h2>
                <p className="text-xl text-gray-600 font-medium">요즘 핫한 제품, 나한테도 맞을까요?</p>

                <ScrollSlideIn>
                    <div className="relative max-w-2xl mx-auto group z-20">
                        <input
                            id="product-search-input"
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="제품명, 브랜드 또는 고민을 검색해보세요 (예: 리들샷, 수분)"
                            className="w-full px-6 py-6 pr-12 rounded-full bg-white border-2 border-clony-primary/10 focus:border-clony-primary focus:ring-4 focus:ring-clony-primary/10 outline-none text-base md:text-xl shadow-2xl transition-all text-gray-900 placeholder-gray-400"
                        />
                        <button className="absolute right-3 top-3 bg-clony-primary text-white p-3.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-clony-primary/30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>

                        {/* Search Results Dropdown */}
                        <AnimatePresence>
                            {query && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden text-left z-50"
                                >
                                    {results.length > 0 ? (
                                        <div className="divide-y divide-gray-100">
                                            {results.slice(0, 5).map(product => (
                                                <div
                                                    key={product.id}
                                                    onClick={() => handleSelectProduct(product)}
                                                    className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4 cursor-pointer group/item"
                                                >
                                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl group-hover/item:scale-110 transition-transform">
                                                        {product.image}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="text-xs font-bold text-gray-500">{product.brand}</span>
                                                            <div className="flex gap-1">
                                                                {product.tags.map(tag => (
                                                                    <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-clony-secondary/10 text-clony-secondary rounded-md font-medium">#{tag}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <h4 className="font-bold text-gray-900">{product.name}</h4>
                                                    </div>
                                                    <div className="text-sm font-bold text-clony-primary opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap">
                                                        분석하기 →
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-gray-400">
                                            <p className="mb-4">검색 결과가 없습니다 😢 <br /><span className="text-sm">찾으시는 제품이 없다면 등록을 요청해보세요!</span></p>
                                            <button
                                                onClick={() => alert('제품 등록 요청이 접수되었습니다! 빠른 시일 내에 추가하도록 하겠습니다 🙇‍♂️')}
                                                className="px-6 py-2 bg-clony-primary/10 text-clony-primary rounded-xl text-sm font-bold hover:bg-clony-primary hover:text-white transition-colors"
                                            >
                                                + 제품 등록 요청하기
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ScrollSlideIn>

                <div className="flex justify-center gap-3 flex-wrap pt-4">
                    <span className="text-sm text-gray-400 font-semibold self-center">인기 검색어:</span>
                    {['리들샷', '수분세럼', '아누아', '진정크림', '모공'].map(tag => (
                        <button
                            key={tag}
                            onClick={() => { setQuery(tag); handleSearch({ target: { value: tag } } as any); }}
                            className="text-sm text-clony-primary bg-white px-4 py-1.5 rounded-full border border-clony-primary/20 hover:bg-clony-primary hover:text-white transition-colors"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>

                {/* Analysis Loading Overlay */}
                <AnimatePresence>
                    {isAnalyzing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white"
                        >
                            <div className="w-16 h-16 border-4 border-clony-primary border-t-transparent rounded-full animate-spin mb-6"></div>
                            <h3 className="text-2xl font-bold mb-2">AI 성분 분석 중...</h3>
                            <p className="opacity-80">내 피부 데이터와 대조하고 있습니다</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Analysis Result Modal */}
                <AnimatePresence>
                    {selectedProduct && !isAnalyzing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={() => setSelectedProduct(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="bg-clony-primary p-6 text-white text-center relative overflow-hidden">
                                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-white/20 to-transparent rotate-45 pointer-events-none"></div>
                                    <p className="text-sm font-bold opacity-90 mb-1">AI 매칭 분석 결과</p>
                                    <h3 className="text-3xl font-black">{selectedProduct.matchScore}점</h3>
                                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mt-2 border border-white/30 backdrop-blur-md">
                                        {selectedProduct.matchGrade} Match ✨
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 text-left space-y-6">
                                    <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                                        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                                            {selectedProduct.image}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 mb-1">{selectedProduct.brand}</p>
                                            <h4 className="text-lg font-bold text-gray-900 leading-tight">{selectedProduct.name}</h4>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-sm font-bold text-clony-primary mb-2 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                            추천 이유
                                        </h5>
                                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl text-sm font-medium border border-gray-100">
                                            "{selectedProduct.analysis}"
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedProduct(null)}
                                        className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg active:scale-[0.98] transition-transform"
                                    >
                                        확인했어요
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

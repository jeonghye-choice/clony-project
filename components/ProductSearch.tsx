import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollSlideIn } from './Motion';
import { searchProducts } from '../services/productService';
import type { RealProduct } from '../data/kbeautyProducts';

// ProductSearch now uses real K-beauty data!


export interface ProductSearchProps {
    isQuizCompleted: boolean;
    onScrollToQuiz: () => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ isQuizCompleted, onScrollToQuiz }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<RealProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<RealProduct | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === '') {
            setResults([]);
            return;
        }

        // Use real product search service
        const filtered = searchProducts(value);
        setResults(filtered);
    };

    const handleSelectProduct = (product: RealProduct) => {
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
                            placeholder="제품명, 브랜드 또는 고민을 검색해보세요 (ex. 블랙헤드, 선크림, 비타민)"
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

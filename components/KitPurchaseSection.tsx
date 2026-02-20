import React, { useState } from 'react';
import { ScrollSlideIn, PulseButton } from './Motion';
import { getRecommendedProducts, getSkinTypeInfo, parseSkinTraits } from '../utils/productDatabase';

interface PricingOption {
    days: number;
    price: number;
    label: string;
    subLabel: string;
    slogan: string;
    hashtags: string[];
    description: string;
    recommend?: boolean;
}

const PRICING_OPTIONS: PricingOption[] = [
    {
        days: 3,
        price: 1470,
        label: '3 Days',
        subLabel: '궁합 테스트',
        slogan: '“첫인상이 궁금하다면, 가볍게 3일”',
        hashtags: ['#민감성', '#제형확인'],
        description: '새로운 성분이 내 피부에 자극은 없는지, 발림성은 마음에 드는지 가장 빠르게 확인하고 싶을 때 추천합니다.'
    },
    {
        days: 7,
        price: 2450,
        label: '7 Days',
        subLabel: '집중 적응기',
        slogan: '”피부와 친해지는 시간, 딱 일주일”',
        hashtags: ['#표면변화', '#밸런스체크'],
        description: '피부가 성분에 적응하고 유수분 밸런스가 잡히기 시작하는 시기입니다. 겉으로 보이는 가벼운 변화를 관찰하세요.',
        recommend: true
    },
    {
        days: 14,
        price: 3920,
        label: '14 Days',
        subLabel: '변화 확인기',
        slogan: '”눈에 보이는 변화, 2주의 약속”',
        hashtags: ['#피부결개선', '#톤정리'],
        description: '피부 턴오버 주기의 절반이 지나는 시점입니다. 거칠었던 결이 매끄러워지고 안색이 밝아지는 실질적인 효과를 체감하세요.'
    },
    {
        days: 30,
        price: 7900,
        label: '30 Days',
        subLabel: '완전 정착기',
        slogan: '”인생템 확신, 한 달의 기록”',
        hashtags: ['#턴오버완료', '#최종정착'],
        description: '피부 세포가 완전히 재생되는 28일 주기를 모두 경험합니다. 이 제품이 정말 내 \'인생템\'이 될 수 있을지 완벽하게 확신하세요.'
    }
];

const CATEGORIES = ['전체', '클렌징', '토너/패드', '세럼/앰플', '보습', '선케어'];

export interface KitPurchaseSectionProps {
    onPurchase: (plan: { days: number; price: number; label: string; kitName: string }) => void;
    skinType?: string | null;
    onScrollToQuiz?: () => void;
    onResetQuiz?: () => void;
    userName?: string;
    selectedIndices: number[];
    onSelectionChange: (indices: number[]) => void;
    selectedDays: number;
    onDaysChange: (days: number) => void;
}

export const KitPurchaseSection: React.FC<KitPurchaseSectionProps> = ({
    onPurchase,
    skinType,
    onScrollToQuiz,
    onResetQuiz,
    userName,
    selectedIndices,
    onSelectionChange,
    selectedDays,
    onDaysChange
}) => {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [showAllProducts, setShowAllProducts] = useState(false);

    const selectedOption = PRICING_OPTIONS.find(op => op.days === selectedDays) || PRICING_OPTIONS[1];

    const effectiveSkinType = skinType || "OSNW";
    const skinTypeInfo = getSkinTypeInfo(effectiveSkinType);
    const traits = parseSkinTraits(effectiveSkinType);
    const recommendedProducts = getRecommendedProducts(effectiveSkinType, selectedCategory);

    const toggleProductSelection = (idx: number) => {
        if (selectedIndices.includes(idx)) {
            onSelectionChange(selectedIndices.filter(i => i !== idx));
        } else {
            onSelectionChange([...selectedIndices, idx]);
        }
    };

    const handleSelectAll = () => {
        const allIndices = recommendedProducts.map((_, i) => i);
        onSelectionChange(allIndices);
    };

    const handleDeselectAll = () => {
        onSelectionChange([]);
    };

    const totalPrice = selectedOption.price * selectedIndices.length;

    return (
        <section id="kit-purchase" className="py-24 px-4 bg-gray-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <ScrollSlideIn>
                    <div className="text-center mb-12">
                        <span className="text-teal-500 font-bold tracking-widest text-sm uppercase">Personalized Bundle</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-4 leading-tight font-black">
                            나만의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">진단 키트 완성</span>
                        </h2>
                        <p className="text-gray-500 text-lg font-medium">
                            {skinType ? `${skinTypeInfo.title} 타입 분석을 바탕으로 구성되었습니다` : "당신의 피부 분석 결과에 맞춰 구성될 예정입니다"}
                        </p>
                    </div>
                </ScrollSlideIn>

                <div className="bg-white rounded-[60px] shadow-2xl border border-gray-100 overflow-hidden relative">
                    <div className={`transition-all duration-700 ${!skinType ? 'blur-xl grayscale opacity-40 pointer-events-none' : ''}`}>
                        <div className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/30">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                                <div className="text-center md:text-left">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">분석 결과 요약</h3>
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="text-4xl font-black text-teal-600 tracking-tighter leading-none">
                                                {effectiveSkinType}
                                            </div>
                                            {skinType && onResetQuiz && (
                                                <button
                                                    onClick={onResetQuiz}
                                                    className="whitespace-nowrap text-[11px] font-black text-teal-600 bg-teal-50/50 px-3 py-1.5 rounded-xl border border-teal-100 hover:bg-teal-500 hover:text-white transition-all active:scale-95 shadow-sm"
                                                >
                                                    다시 진단하기
                                                </button>
                                            )}
                                        </div>
                                        <div className="w-px h-12 bg-gray-100 hidden md:block" />
                                        <div className="text-center md:text-left">
                                            <span className="text-2xl font-black text-gray-900 block leading-tight mb-1">{skinTypeInfo.title}</span>
                                            <span className="text-sm text-gray-400 font-medium block">{userName ? `${userName}님` : '당신'}에게 딱 맞는 제품을 찾았습니다</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-80 space-y-4">
                                    <div className="bg-white p-4 rounded-2xl border border-teal-50/50">
                                        <div className="flex justify-between mb-2 text-[11px] font-black tracking-tighter">
                                            <span className={traits.isOily ? 'text-gray-300' : 'text-teal-600 uppercase'}>Dry 건성</span>
                                            <span className={traits.isOily ? 'text-teal-600 uppercase' : 'text-gray-300'}>Oily 지성</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full relative overflow-hidden">
                                            <div
                                                className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-1000 ${traits.isOily ? 'right-0' : 'left-0'}`}
                                                style={{ width: '60%' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-teal-50/50">
                                        <div className="flex justify-between mb-2 text-[11px] font-black tracking-tighter">
                                            <span className={traits.isSensitive ? 'text-gray-300' : 'text-teal-600 uppercase'}>Resistant 저항성</span>
                                            <span className={traits.isSensitive ? 'text-teal-600 uppercase' : 'text-gray-300'}>Sensitive 민감</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full relative overflow-hidden">
                                            <div
                                                className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-1000 ${traits.isSensitive ? 'right-0' : 'left-0'}`}
                                                style={{ width: '60%' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="flex flex-col gap-16">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                        <span className="w-8 h-8 bg-teal-500 text-white rounded-xl flex items-center justify-center text-sm font-black shadow-lg shadow-teal-500/30">1</span>
                                        키트 구성품 확인
                                    </h3>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                            {CATEGORIES.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setSelectedCategory(cat)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${selectedCategory === cat
                                                        ? 'bg-clony-dark text-white shadow-xl'
                                                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={handleSelectAll}
                                                className="px-3 py-1.5 rounded-lg text-[10px] font-black text-teal-600 bg-teal-50 border border-teal-100 hover:bg-teal-500 hover:text-white transition-all"
                                            >
                                                전체 선택
                                            </button>
                                            <button
                                                onClick={handleDeselectAll}
                                                className="px-3 py-1.5 rounded-lg text-[10px] font-black text-gray-400 bg-gray-50 border border-gray-100 hover:bg-gray-900 hover:text-white transition-all"
                                            >
                                                전체 해제
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {(showAllProducts ? recommendedProducts : recommendedProducts.slice(0, 4)).map((product, idx) => {
                                            const isSelected = selectedIndices.includes(idx);
                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() => toggleProductSelection(idx)}
                                                    className={`flex items-center gap-6 p-6 rounded-[32px] border transition-all duration-500 cursor-pointer group hover:bg-white hover:shadow-2xl ${isSelected
                                                        ? 'bg-white border-teal-500 shadow-xl ring-4 ring-teal-500/5'
                                                        : 'bg-gray-50/50 border-gray-100 shadow-sm'
                                                        }`}
                                                >
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-all duration-500 ${isSelected ? 'bg-teal-50 scale-110 rotate-3' : 'bg-white group-hover:scale-110'
                                                        }`}>
                                                        🧴
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className={`text-[11px] font-black mb-1 uppercase tracking-widest ${isSelected ? 'text-teal-600' : 'text-gray-400'}`}>
                                                            {product.category}
                                                        </div>
                                                        <div className={`text-xl font-black leading-tight mb-1 ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                                            {product.name}
                                                        </div>
                                                        <div className={`text-sm font-medium ${isSelected ? 'text-teal-600/80' : 'text-gray-400'}`}>
                                                            {product.reason}
                                                        </div>
                                                    </div>
                                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${isSelected ? 'bg-teal-500 text-white scale-110' : 'bg-gray-200 text-transparent'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {recommendedProducts.length > 4 && (
                                            <button
                                                onClick={() => setShowAllProducts(!showAllProducts)}
                                                className="w-full py-4 text-gray-400 font-bold text-sm flex items-center justify-center gap-2 hover:text-teal-500 transition-colors group"
                                            >
                                                <span>{showAllProducts ? '간략히 보기' : `구성품 ${recommendedProducts.length - 4}개 더 보기`}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-4 h-4 transition-transform duration-300 ${showAllProducts ? 'rotate-180' : ''}`}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full text-center md:text-left">
                                    <h3 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-3">
                                        <span className="w-8 h-8 bg-teal-500 text-white rounded-xl flex items-center justify-center text-sm font-black shadow-lg shadow-teal-500/30">2</span>
                                        사용 기간 선택
                                    </h3>
                                    <p className="text-gray-400 text-sm font-bold mb-8 ml-11 break-keep">
                                        기간은 달라도 확신은 같습니다. 당신의 피부가 정답을 말할 때 까지 CLONY가 함께합니다.
                                    </p>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                        {PRICING_OPTIONS.map((option) => (
                                            <button
                                                key={option.days}
                                                onClick={() => onDaysChange(option.days)}
                                                className={`relative p-6 rounded-[32px] border-2 text-center transition-all duration-500 ${selectedDays === option.days
                                                    ? 'border-teal-500 bg-teal-50 shadow-xl shadow-teal-500/10 scale-105 z-10'
                                                    : 'border-gray-50 bg-gray-50 hover:bg-white hover:border-gray-200'
                                                    }`}
                                            >
                                                {option.recommend && (
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-teal-500/30 uppercase tracking-widest">
                                                        Best Choice
                                                    </div>
                                                )}
                                                <div className={`text-xl font-black mb-1 ${selectedDays === option.days ? 'text-teal-900' : 'text-gray-400'}`}>
                                                    {option.label}
                                                </div>
                                                <div className={`text-xs font-bold mb-3 opacity-60 ${selectedDays === option.days ? 'text-teal-700' : 'text-gray-400'}`}>
                                                    {option.subLabel}
                                                </div>
                                                <div className={`text-lg font-black ${selectedDays === option.days ? 'text-teal-600' : 'text-gray-400'}`}>
                                                    {(option.price * selectedIndices.length).toLocaleString()}원
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Detailed Description for Selected Option */}
                                    <div className="bg-teal-50/50 rounded-[40px] p-8 md:p-10 border border-teal-100 shadow-inner group/info">
                                        <div className="flex flex-col md:flex-row items-center gap-10">
                                            <div className="flex-1 space-y-4 text-center md:text-left">
                                                <h4 className="text-teal-700 font-black text-2xl break-keep leading-tight">
                                                    {selectedOption.slogan}
                                                </h4>
                                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                                    {selectedOption.hashtags.map(tag => (
                                                        <span key={tag} className="text-teal-500 text-sm font-black uppercase tracking-tight bg-white px-3 py-1.5 rounded-xl border border-teal-100/50 shadow-sm">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="hidden md:block w-px h-20 bg-teal-200/30" />
                                            <p className="flex-[1.5] text-gray-600 text-lg font-medium leading-relaxed break-keep">
                                                {selectedOption.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 bg-clony-dark rounded-[40px] p-8 md:p-12 text-white flex flex-col items-center justify-between gap-10 relative overflow-hidden group/cta">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(60,186,149,0.2),transparent)] pointer-events-none" />

                                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 relative z-10">
                                    <div className="text-center md:text-left">
                                        <div className="text-gray-400 text-[10px] mb-2 uppercase tracking-[0.2em] font-black ring-1 ring-gray-800 px-2 py-1 rounded inline-block">
                                            {selectedIndices.length}개 키트 선택됨
                                        </div>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <span className="text-5xl font-black text-white">{totalPrice.toLocaleString()}</span>
                                            <span className="text-2xl text-gray-500 font-bold">원</span>
                                        </div>
                                    </div>
                                    <PulseButton
                                        onClick={() => {
                                            if (selectedIndices.length === 0) return;
                                            const selectedProducts = selectedIndices.map(i => recommendedProducts[i]);
                                            const kitNames = selectedProducts.map(p => `[${p.name}] ${selectedOption.label} 키트`);
                                            const kitName = kitNames.length > 1
                                                ? `${kitNames[0]} 외 ${kitNames.length - 1}건`
                                                : kitNames[0];

                                            onPurchase({
                                                days: selectedOption.days,
                                                price: totalPrice,
                                                label: selectedOption.label,
                                                kitName: kitName
                                            });
                                        }}
                                        disabled={selectedIndices.length === 0}
                                        className={`w-full md:w-auto min-w-[280px] text-white text-xl font-black py-6 px-12 rounded-3xl shadow-2xl transition-all flex items-center justify-center gap-4 active:scale-95 group-hover/cta:-translate-y-1 ${selectedIndices.length === 0
                                            ? 'bg-gray-700 cursor-not-allowed opacity-50'
                                            : 'bg-teal-500 hover:bg-teal-400 shadow-teal-500/20'
                                            }`}
                                    >
                                        <span>{selectedIndices.length === 0 ? '상품을 선택해주세요' : '맞춤 키트 주문하기'}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </PulseButton>
                                </div>
                            </div>

                            <p className="text-center text-[11px] text-gray-400 mt-8 leading-relaxed font-medium">
                                * 위 제품들은 사용자님의 피부 분석 결과에 따른 큐레이션이며, 3~7개 제품이 번들로 제공됩니다.<br />
                                * 챌린지 참여 및 맞춤 가이드가 포함된 금액입니다. 내 피부에 맞는 '인생템'을 찾는 여정을 시작하세요.
                            </p>
                        </div>
                    </div>

                    {!skinType && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[10px]">
                            <div className="bg-white/95 p-12 rounded-[60px] shadow-2xl border border-teal-100 flex flex-col items-center text-center animate-in fade-in zoom-in duration-700 max-w-sm mx-4">
                                <div className="w-24 h-24 bg-teal-500 text-white rounded-[32px] flex items-center justify-center mb-8 shadow-2xl shadow-teal-200 rotate-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-4">맞춤 솔루션 잠금됨</h3>
                                <p className="text-gray-500 font-bold mb-10 leading-relaxed break-keep">
                                    정합한 피부 타입 분석 후에<br />
                                    사용자님만을 위한 맞춤 키트가 구성됩니다.
                                </p>
                                <button
                                    onClick={onScrollToQuiz}
                                    className="w-full bg-teal-500 hover:bg-teal-600 text-white text-xl font-black py-5 px-10 rounded-2xl transition-all active:scale-95 shadow-2xl shadow-teal-100 flex items-center justify-center gap-3"
                                >
                                    <span>피부 타입 진단하러 가기</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

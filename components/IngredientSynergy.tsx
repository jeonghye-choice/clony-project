import React from 'react';
import { ScrollSlideIn } from './Motion';
import { motion } from 'framer-motion';

interface SynergyItem {
    id: number;
    title: string;
    ingredients: string[];
    effect: string;
    description: string;
    type?: string;
    isCaution?: boolean;
}

const synergyData: SynergyItem[] = [
    {
        id: 1,
        title: "저자극 고효능 안티에이징",
        ingredients: ["바쿠치올", "레티놀"],
        effect: "탄력 시너지 & 자극 완화",
        description: "바쿠치올이 레티놀을 안정화하고 자극을 줄여주어 '저자극 고효능' 처방이 가능합니다.",
        type: "W타입 추천"
    },
    {
        id: 2,
        title: "이중 필터링 화이트닝",
        ingredients: ["트라넥삼산", "나이아신아마이드"],
        effect: "잡티 통로 차단 & 흔적 케어",
        description: "트라넥삼산이 색소 침착 통로를 차단하고 나이아신아마이드가 잡티를 연하게 만듭니다.",
        type: "P타입 추천"
    },
    {
        id: 3,
        title: "속건조 완벽 차단",
        ingredients: ["세라마이드", "스쿠알란"],
        effect: "유수분 밸런스 회복",
        description: "피부 지질 유사 성분인 두 성분이 만나 수분 증발을 막고 보습막을 형성합니다.",
        type: "D타입 추천"
    },
    {
        id: 4,
        title: "탄력 부스팅 조합",
        ingredients: ["레티놀", "펩타이드"],
        effect: "콜라겐 생성 & 단백질 공급",
        description: "레티놀이 콜라겐을 자극하고 펩타이드가 단백질을 공급하여 탄력 시너지를 냅니다.",
        type: "W타입 추천"
    },
    {
        id: 5,
        title: "강력 항산화 디펜스",
        ingredients: ["비타민 C", "페룰릭 애씨드"],
        effect: "안정화 & 항산화력 배가",
        description: "페룰릭 애씨드가 비타민 C를 안정화하여 자외선으로부터 피부 보호 능력을 강화합니다."
    },
    {
        id: 6,
        title: "철벽 장벽 강화",
        ingredients: ["나이아신아마이드", "판테놀"],
        effect: "피지 조절 & 보습막 형성",
        description: "나이아신아마이드가 피지를 조절하고 판테놀이 강력한 보습막을 형성해 민감도를 낮춥니다."
    },
    {
        id: 7,
        title: "트러블 긴급 진정",
        ingredients: ["살리실산(BHA)", "시카(Cica)"],
        effect: "피지 녹임 & 즉각 진정",
        description: "BHA가 피지를 녹여내면 시카 성분이 즉각적으로 진정시켜 붉은기를 빠르게 잡습니다."
    },
    {
        id: 8,
        title: "민감 여드름 최적화",
        ingredients: ["아젤라익 애씨드", "시카(Cica)"],
        effect: "균 억제 & 수분 충전",
        description: "아젤라익 애씨드의 균 억제 효과와 시카의 수분 충전이 만나 민감성 트러블 피부를 케어합니다."
    },
    {
        id: 9,
        title: "과자극 주의 조합",
        ingredients: ["비타민 C", "레티놀"],
        effect: "강한 자극 유발 주의",
        description: "두 성분 모두 산도가 높거나 자극적일 수 있어 고함량 동시 사용 시 피부가 붉어질 수 있습니다.",
        isCaution: true
    },
    {
        id: 10,
        title: "장벽 손상 주의",
        ingredients: ["AHA / BHA", "레티놀"],
        effect: "과도한 각질 제거 주의",
        description: "각질 제거 성분과 레티놀을 함께 쓰면 피부가 얇아지고 장벽이 무너질 위험이 있습니다.",
        isCaution: true
    },
    {
        id: 11,
        title: "산성 중첩 주의",
        ingredients: ["고함량 비타민 C", "AHA / BHA"],
        effect: "산성 성분 중첩 자극",
        description: "모두 pH가 낮은 산성 성분으로, 과도한 각질 탈락과 따가움을 유발할 수 있습니다.",
        isCaution: true
    },
    {
        id: 12,
        title: "성분 산화 주의",
        ingredients: ["레티놀", "벤조일퍼옥사이드"],
        effect: "성분 효과 반감",
        description: "벤조일퍼옥사이드가 레티놀을 산화시켜 두 성분의 효과를 모두 떨어뜨리고 피부를 건조하게 만듭니다.",
        isCaution: true
    },
    {
        id: 13,
        title: "성분 파괴 주의",
        ingredients: ["펩타이드", "AHA / BHA"],
        effect: "펩타이드 효능 저하",
        description: "강한 산성 성분이 펩타이드의 단백질 결합을 끊어 효과를 무력화시킬 수 있습니다.",
        isCaution: true
    }
];

// SynergyRow를 외부로 분리하여 렌더링 시마다 재생성되는 것을 방지 (스크롤 초기화 버그 해결)
const SynergyRow = ({ items, title, subtitle, icon }: { items: SynergyItem[], title: string, subtitle: string, icon: React.ReactNode }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 360 + 24; // Card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mb-12 last:mb-0">
            <div className="flex items-center gap-3 px-4 mb-6 max-w-7xl mx-auto">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-xl">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 leading-none mb-1">{title}</h3>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{subtitle}</p>
                </div>
            </div>

            <div className="relative group/row">
                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20 opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:block">
                    <button
                        onClick={() => handleScroll('left')}
                        className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl flex items-center justify-center text-gray-900 hover:bg-clony-primary hover:text-white hover:border-clony-primary transition-all active:scale-90"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:block">
                    <button
                        onClick={() => handleScroll('right')}
                        className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl flex items-center justify-center text-gray-900 hover:bg-clony-primary hover:text-white hover:border-clony-primary transition-all active:scale-90"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-8 px-4 md:px-8 scrollbar-hide scroll-smooth"
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 w-[300px] md:w-[360px]"
                        >
                            <div className={`h-[280px] p-8 rounded-[40px] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${item.isCaution
                                ? 'bg-white border-red-100/60 hover:border-red-200'
                                : 'bg-white border-gray-100/60 hover:border-clony-primary/20'
                                }`}>
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${item.isCaution ? 'bg-red-50 text-red-500' : 'bg-clony-primary/5 text-clony-primary'
                                            }`}>
                                            {item.isCaution ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                                </svg>
                                            )}
                                        </div>
                                        {item.type && (
                                            <span className="bg-clony-dark text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                                                {item.type}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className={`text-xl font-bold ${item.isCaution ? 'text-red-900' : 'text-gray-900'}`}>
                                                {item.ingredients[0]}
                                            </h4>
                                            <span className="text-gray-300 font-bold">+</span>
                                            <h4 className={`text-xl font-bold ${item.isCaution ? 'text-red-900' : 'text-gray-900'}`}>
                                                {item.ingredients[1]}
                                            </h4>
                                        </div>
                                        <p className={`text-sm font-black mb-4 ${item.isCaution ? 'text-red-500' : 'text-clony-primary'}`}>
                                            {item.effect}
                                        </p>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed break-keep">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex-shrink-0 w-4 md:w-8" />
                </div>
            </div>
        </div>
    );
};

export const IngredientSynergy: React.FC = () => {
    const honeyData = React.useMemo(() => synergyData.filter(item => !item.isCaution), []);
    const cautionData = React.useMemo(() => synergyData.filter(item => item.isCaution), []);

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-20 space-y-4">
                    <ScrollSlideIn>
                        <span className="text-clony-primary font-bold tracking-widest text-xs uppercase bg-clony-primary/10 px-3 py-1 rounded-full">Compatibility Guide</span>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.1}>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900">
                            실패 없는 <span className="text-clony-primary">성분 조합</span>
                        </h2>
                    </ScrollSlideIn>
                    <ScrollSlideIn delay={0.2}>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto break-keep">
                            효과는 극대화하고 자극은 최소화하는 성분 궁합,<br />
                            꿀조합과 주의조합으로 나누어 더 정교하게 관리하세요.
                        </p>
                    </ScrollSlideIn>
                </div>

                <div className="space-y-20">
                    <SynergyRow
                        items={honeyData}
                        title="효과를 높이는 꿀조합"
                        subtitle="Best Synergies"
                        icon="🍯"
                    />

                    <div className="space-y-8">
                        <SynergyRow
                            items={cautionData}
                            title="피해야 할 주의조합"
                            subtitle="Things to Avoid"
                            icon="⚠️"
                        />

                        {/* Real-time Warning System Preview */}
                        <ScrollSlideIn delay={0.3}>
                            <div className="max-w-4xl mx-auto mt-12 bg-white rounded-[40px] p-8 md:p-12 border border-red-100 shadow-xl shadow-red-500/5 relative overflow-hidden group">
                                {/* Background Decoration */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:opacity-70 transition-opacity" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                    <div className="flex-1 space-y-4 text-center md:text-left">
                                        <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                            </span>
                                            Clony AI System
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                                            실시간 <span className="text-red-500">주의 조합</span> 알림 시스템
                                        </h3>
                                        <p className="text-gray-500 font-medium leading-relaxed break-keep">
                                            사용자가 샘플을 골라 담을 때, 상극 조합 성분이 포함되면 클로니 AI가 즉시 감지하여 경고해 드립니다. 자극 걱정 없는 안전한 맞춤형 케어를 경험하세요.
                                        </p>
                                    </div>

                                    <div className="w-full md:w-[320px] bg-gray-50 rounded-3xl p-6 border border-gray-100 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg shadow-red-500/30">!</div>
                                            <span className="text-xs font-black text-gray-400">System Alert</span>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-gray-900 font-black text-base leading-snug break-keep">
                                                "잠깐! 이 두 성분은 함께 쓰면 자극이 될 수 있어요. 나누어 바르시겠어요?"
                                            </p>
                                            <div className="flex gap-2 pt-2">
                                                <div className="flex-1 bg-white border border-gray-200 py-2 rounded-xl text-[10px] font-bold text-center text-gray-400">나누어 담기</div>
                                                <div className="flex-1 bg-red-500 py-2 rounded-xl text-[10px] font-black text-center text-white shadow-md shadow-red-500/20">조합 변경하기</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollSlideIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

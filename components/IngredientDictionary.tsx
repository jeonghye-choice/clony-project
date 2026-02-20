import React, { useState } from 'react';
import { ScrollSlideIn } from './Motion';
import { motion, AnimatePresence } from 'framer-motion';

interface Ingredient {
    name: string;
    enName: string;
    desc: string;
    tag: string;
    color: string;
}

const ingredients: Ingredient[] = [
    {
        name: "비타민 C",
        enName: "Vitamin C",
        desc: "멜라닌 생성을 억제하여 기미, 잡티를 완화하고 피부 톤을 맑게 해줍니다. 아침 사용 시 자외선 차단제 필수!",
        tag: "미백/항산화",
        color: "bg-yellow-50 text-yellow-600"
    },
    {
        name: "히알루론산",
        enName: "Hyaluronic Acid",
        desc: "자기 무게의 1000배 수분을 끌어당기는 수분 자석. 건조한 피부에 즉각적인 수분을 공급합니다.",
        tag: "보습",
        color: "bg-blue-50 text-blue-600"
    },
    {
        name: "레티놀",
        enName: "Retinol",
        desc: "피부 턴오버를 촉진하여 주름을 개선하고 모공을 케어합니다. 밤에만 사용하는 것이 좋아요.",
        tag: "안티에이징",
        color: "bg-purple-50 text-purple-600"
    },
    {
        name: "시카 (병풀)",
        enName: "Cica",
        desc: "자극받은 피부를 빠르게 진정시키고 장벽을 강화합니다. 민감성 피부에 최고의 성분.",
        tag: "진정",
        color: "bg-green-50 text-green-600"
    },
    {
        name: "나이아신아마이드",
        enName: "Niacinamide",
        desc: "피지 분비를 조절하고 모공을 케어하며 미백 효과까지 있는 만능 성분입니다.",
        tag: "피지/미백",
        color: "bg-indigo-50 text-indigo-600"
    },
    {
        name: "AHA / BHA",
        enName: "Acids",
        desc: "피부 표면의 묵은 각질을 녹여 매끄러운 피부결을 만들어줍니다. BHA는 모공 속 피지까지 녹여요.",
        tag: "각질제거",
        color: "bg-red-50 text-red-600"
    },
    // New Advanced Ingredients
    {
        name: "PDRN (연어 DNA)",
        enName: "Polydeoxyribonucleotide",
        desc: "연어 생식세포에서 추출한 DNA 조각으로, 손상된 피부 조직을 재생시키고 속건조를 개선합니다.",
        tag: "재생/탄력",
        color: "bg-pink-50 text-pink-600"
    },
    {
        name: "바쿠치올",
        enName: "Bakuchiol",
        desc: "보골지 씨앗에서 추출한 '식물성 레티놀'. 레티놀과 효과는 비슷하지만 자극이 없고 낮에도 사용 가능합니다.",
        tag: "저자극 안티에이징",
        color: "bg-amber-50 text-amber-700"
    },
    {
        name: "이데베논",
        enName: "Idebenone",
        desc: "비타민C의 4배, 코엔자임Q10의 10배에 달하는 강력한 항산화 효과로 '바르는 보톡스'라 불립니다.",
        tag: "강력 항산화",
        color: "bg-orange-50 text-orange-600"
    },
    {
        name: "EGF",
        enName: "Epidermal Growth Factor",
        desc: "체내에 존재하는 단백질 성분으로 상피세포의 성장을 촉진해 흉터 회복과 노화 방지에 탁월합니다.",
        tag: "세포 재생",
        color: "bg-cyan-50 text-cyan-600"
    },
    {
        name: "글루타치온",
        enName: "Glutathione",
        desc: "멜라닌 색소 생성을 억제하여 피부를 백옥처럼 하얗고 투명하게 만들어주는 '백옥 주사' 성분입니다.",
        tag: "광채 미백",
        color: "bg-slate-50 text-slate-600"
    },
    {
        name: "세라마이드 NP",
        enName: "Ceramide NP",
        desc: "피부 지질의 50%를 차지하는 성분으로, 벽돌처럼 촘촘하게 피부 장벽을 쌓아 수분 증발을 막습니다.",
        tag: "장벽 강화",
        color: "bg-stone-50 text-stone-600"
    }
];

export const IngredientDictionary: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const visibleIngredients = showAll ? ingredients : ingredients.slice(0, 6);

    return (
        <section className="py-24 px-4 md:px-8 bg-white border-t border-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <div className="space-y-4">
                        <ScrollSlideIn>
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Clony Lab</span>
                        </ScrollSlideIn>
                        <ScrollSlideIn delay={0.1}>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                어려운 화장품 성분,<br />
                                <span className="text-clony-primary">쉽게 알려드려요</span>
                            </h2>
                        </ScrollSlideIn>
                    </div>

                    <ScrollSlideIn delay={0.2} className="hidden md:block">
                        <p className="text-gray-400 text-sm">카드에 마우스를 올려보세요 👆</p>
                    </ScrollSlideIn>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <AnimatePresence>
                        {visibleIngredients.map((item, idx) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <div className="relative group h-[220px] rounded-3xl border border-gray-100 p-6 flex flex-col justify-between overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:border-transparent">

                                    {/* Default State */}
                                    <div className="group-hover:opacity-0 transition-opacity duration-300 absolute inset-0 p-6 flex flex-col justify-between">
                                        <div className={`self-start px-3 py-1 rounded-full text-[10px] font-bold ${item.color}`}>
                                            {item.tag}
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 whitespace-nowrap md:whitespace-normal break-keep">{item.name}</h3>
                                            <p className="text-xs md:text-sm text-gray-400 font-medium">{item.enName}</p>
                                        </div>
                                    </div>

                                    {/* Hover State */}
                                    <div className="absolute inset-0 bg-clony-dark p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                                        <h4 className="font-bold text-lg mb-2">{item.name}</h4>
                                        <p className="text-xs md:text-sm leading-relaxed opacity-80 break-keep">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-white border border-gray-200 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm"
                    >
                        <span>{showAll ? '간단히 보기' : '더 많은 고급 성분 보기'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

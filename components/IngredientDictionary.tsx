import React from 'react';
import { ScrollSlideIn } from './Motion';

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
    }
];

export const IngredientDictionary: React.FC = () => {
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
                    {ingredients.map((item, idx) => (
                        <ScrollSlideIn key={idx} delay={idx * 0.1}>
                            <div className="relative group h-[200px] rounded-3xl border border-gray-100 p-6 flex flex-col justify-between overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:border-transparent">

                                {/* Default State */}
                                <div className="group-hover:opacity-0 transition-opacity duration-300 absolute inset-0 p-6 flex flex-col justify-between">
                                    <div className={`self-start px-3 py-1 rounded-full text-[10px] font-bold ${item.color}`}>
                                        {item.tag}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-400 font-medium">{item.enName}</p>
                                    </div>
                                </div>

                                {/* Hover State */}
                                <div className="absolute inset-0 bg-clony-dark p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                                    <h4 className="font-bold text-lg mb-2">{item.name}</h4>
                                    <p className="text-sm leading-relaxed opacity-80 break-keep">
                                        {item.desc}
                                    </p>
                                </div>

                            </div>
                        </ScrollSlideIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

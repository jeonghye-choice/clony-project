import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollSlideIn } from './Motion';

interface Option {
    label: string;
    value: string;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
}

const questions: (Question & { category: string })[] = [
    {
        id: 1,
        category: "유분 / 수분",
        text: "세안 직후 피부의 느낌은 어떤가요?",
        options: [
            { label: "🌵 매우 당기고 푸석하다", value: "dry" },
            { label: "💧 적당히 촉촉하다", value: "normal" },
            { label: "✨ 당김 없이 유분감이 느껴진다", value: "oily" }
        ]
    },
    {
        id: 2,
        category: "유분 / 수분",
        text: "오후 시간, T존(이마, 코)의 유분은?",
        options: [
            { label: "😎 유분이 거의 없다", value: "dry" },
            { label: "⛅️ 약간 번들거린다", value: "combination" },
            { label: "💦 기름종이가 필요할 정도로 많다", value: "oily" }
        ]
    },
    {
        id: 3,
        category: "유분 / 수분",
        text: "메이크업 후 시간이 지나면 피부가 어떤가요?",
        options: [
            { label: "🍂 화장이 하얗게 뜬다", value: "dry" },
            { label: "🆗 무난하게 잘 유지된다", value: "normal" },
            { label: "🌫️ 유분 때문에 쉽게 지워진다", value: "oily" }
        ]
    },
    {
        id: 4,
        category: "민감도",
        text: "외부 자극(햇빛, 화장품 등)에 피부가 붉어지나요?",
        options: [
            { label: "🚨 매우 자주 붉어지고 따갑다", value: "sensitive" },
            { label: "⚠️ 가끔 민감해질 때가 있다", value: "normal" },
            { label: "🛡️ 거의 변화 없이 튼튼하다", value: "resilient" }
        ]
    },
    {
        id: 5,
        category: "민감도",
        text: "스트레스를 받거나 피곤하면 트러블이 나나요?",
        options: [
            { label: "🌋 바로 트러블이 올라온다", value: "sensitive" },
            { label: "🌧️ 가끔 한두 개씩 올라온다", value: "normal" },
            { label: "💎 트러블이 거의 없는 편이다", value: "resistant" }
        ]
    },
    {
        id: 6,
        category: "민감도",
        text: "온도 변화(히터, 찬바람)가 심하거나 세안 후 얼굴이 금방 붉어지나요?",
        options: [
            { label: "🌡️ 온도 변화에 매우 민감하게 붉어진다", value: "sensitive" },
            { label: "🌤️ 가끔 환경에 따라 붉어질 때가 있다", value: "normal" },
            { label: "❄️ 급격한 온도 변화에도 변화가 거의 없다", value: "resistant" }
        ]
    },
    {
        id: 7,
        category: "색소성",
        text: "야외 활동 후 잡티(기미, 주근깨)가 늘어나나요?",
        options: [
            { label: "🌑 눈에 띄게 진해지고 늘어난다", value: "pigmented" },
            { label: "🌗 약간 생기는 것 같다", value: "normal" },
            { label: "☀️ 거의 생기지 않는다", value: "non-pigmented" }
        ]
    },
    {
        id: 8,
        category: "색소성",
        text: "여드름이나 상처가 난 후 자국이 오래 가나요?",
        options: [
            { label: "🩹 갈색으로 색소 침착이 심하다", value: "pigmented" },
            { label: "⏲️ 사라지는데 시간이 좀 걸린다", value: "normal" },
            { label: "🪄 금방 깨끗해진다", value: "non-pigmented" }
        ]
    },
    {
        id: 9,
        category: "색소성",
        text: "피부 톤이 전체적으로 균일한가요?",
        options: [
            { label: "📉 얼룩덜룩하고 칙칙하다", value: "pigmented" },
            { label: "📊 보통 수준이다", value: "normal" },
            { label: "📈 매우 맑고 균일하다", value: "non-pigmented" }
        ]
    },
    {
        id: 10,
        category: "주름 / 탄력",
        text: "거울을 볼 때 모공이 어느 정도 보이나요?",
        options: [
            { label: "🕳️ 모공이 커지고 늘어져 보인다", value: "wrinkle" },
            { label: "👀 조금 보이지만 탄력은 있다", value: "normal" },
            { label: "🥚 거의 안 보이고 매끈하다", value: "tight" }
        ]
    },
    {
        id: 11,
        category: "주름 / 탄력",
        text: "웃을 때 눈가나 입가에 주름이 신경 쓰이나요?",
        options: [
            { label: "🕸️ 주름이 깊게 패인다", value: "wrinkle" },
            { label: "😶 잔주름이 살짝 보인다", value: "tight" },
            { label: "🎾 탱탱해서 주름이 안 생긴다", value: "tight" }
        ]
    },
    {
        id: 12,
        category: "주름 / 탄력",
        text: "아침에 생긴 베개 자국이 얼마나 가나요?",
        options: [
            { label: "🐢 오전 내내 사라지지 않는다", value: "wrinkle" },
            { label: "🐇 30분 이내로 사라진다", value: "tight" },
            { label: "⚡ 바로 없어진다", value: "tight" }
        ]
    }
];

const skinProfiles: Record<string, { title: string; desc: string; tags: string[]; recommendation: string }> = {
    "OSPW": { title: "복합성 트러블 지성 (OSPW)", desc: "유분기가 많고 트러블도 잦으며, 색소 침착과 잔주름 고민이 있는 복합적인 피부입니다.", tags: ["지성", "민감성", "색소성", "주름"], recommendation: "피지 조절과 진정 케어가 시급하며, 미백/항노화는 순한 제품으로 시작하세요." },
    "OSPT": { title: "칙칙한 민감 지성 (OSPT)", desc: "번들거림과 붉은기, 잡티가 고민이지만 탄력은 아직 좋은 편입니다.", tags: ["지성", "민감성", "색소성", "탄력"], recommendation: "미백 기능성 제품과 가벼운 수분 진정 크림을 추천합니다." },
    "OSNW": { title: "주름진 민감 지성 (OSNW)", desc: "피지는 많지만 속건조를 느끼기 쉽고, 트러블과 잔주름이 공존합니다.", tags: ["지성", "민감성", "비색소", "주름"], recommendation: "항산화 성분이 든 가벼운 세럼으로 노화를 예방하고 진정에 집중하세요." },
    "OSNT": { title: "수부지 민감형 (OSNT)", desc: "겉은 번들거리고 속은 당기는 수분 부족형 지성이며 홍조나 트러블이 잦습니다.", tags: ["지성", "민감성", "비색소", "탄력"], recommendation: "유수분 밸런스를 맞추는 약산성 클렌저와 산뜻한 수분 크림이 필수입니다." },
    "ORPW": { title: "칙칙한 노화 지성 (ORPW)", desc: "피부는 튼튼하지만 유분이 많고 색소 침착과 주름이 서서히 나타납니다.", tags: ["지성", "저항성", "색소성", "주름"], recommendation: "레티놀 등 강력한 안티에이징 성분을 시도해보세요." },
    "ORPT": { title: "건강한 색소 지성 (ORPT)", desc: "피부 장벽은 건강하나 유분과 잡티가 신경 쓰이는 타입입니다.", tags: ["지성", "저항성", "색소성", "탄력"], recommendation: "비타민 C 세럼으로 맑은 피부 톤을 가꾸고 꼼꼼한 세안이 중요합니다." },
    "ORNW": { title: "주름진 튼튼 지성 (ORNW)", desc: "특별한 트러블은 없으나 유분과 노화 징후가 보이는 타입입니다.", tags: ["지성", "저항성", "비색소", "주름"], recommendation: "유분감 없는 안티에이징 제품과 자외선 차단제를 꼼꼼히 바르세요." },
    "ORNT": { title: "타고난 건강 지성 (ORNT)", desc: "피지 분비만 관리하면 매우 건강하고 탄력 있는 축복받은 피부입니다.", tags: ["지성", "저항성", "비색소", "탄력"], recommendation: "가벼운 젤 타입 보습제로 수분만 채워주면 완벽합니다." },
    "DSPW": { title: "칙칙한 건성 민감 (DSPW)", desc: "건조하고 민감하며, 잡티와 주름까지 고민되는 가장 관리가 필요한 유형입니다.", tags: ["건성", "민감성", "색소성", "주름"], recommendation: "고보습 장벽 크림과 저자극 미백/주름 개선 제품을 병행하세요." },
    "DSPT": { title: "잡티 건성 민감 (DSPT)", desc: "건조하고 붉어지기 쉬우며 기미나 주근깨가 눈에 띕니다.", tags: ["건성", "민감성", "색소성", "탄력"], recommendation: "보습력이 좋은 미백 크림과 물리적 자외선 차단제를 사용하세요." },
    "DSNW": { title: "건조한 노화 민감 (DSNW)", desc: "극심한 속당김과 함께 잔주름이 생기기 쉬운 얇은 피부입니다.", tags: ["건성", "민감성", "비색소", "주름"], recommendation: "세라마이드, 펩타이드 등 고영양 탄력 크림을 듬뿍 발라주세요." },
    "DSNT": { title: "건조한 민감 피부 (DSNT)", desc: "각질이 잘 일어나고 외부 자극에 약해 늘 푸석해 보이기 쉽습니다.", tags: ["건성", "민감성", "비색소", "탄력"], recommendation: "순한 성분의 고보습 제품으로 피부 장벽 강화에 집중하세요." },
    "DRPW": { title: "칙칙한 건성 노화 (DRPW)", desc: "건조함으로 인해 주름이 생기고 잡티가 도드라져 보입니다.", tags: ["건성", "저항성", "색소성", "주름"], recommendation: "AHA 성분으로 각질을 정돈하고 고보습 안티에이징 제품을 쓰세요." },
    "DRPT": { title: "잡티 건성 피부 (DRPT)", desc: "피부는 튼튼하지만 건조하고 잡티가 고민인 유형입니다.", tags: ["건성", "저항성", "색소성", "탄력"], recommendation: "오일 보습막으로 수분을 지키고 미백 관리를 꾸준히 해주세요." },
    "DRNW": { title: "주름진 건성 피부 (DRNW)", desc: "색소 침착은 없으나 건조함이 심해 노화가 빠르게 진행될 수 있습니다.", tags: ["건성", "저항성", "비색소", "주름"], recommendation: "리치한 영양 크림과 아이크림을 매일 챙겨 바르세요." },
    "DRNT": { title: "건조한 최강 피부 (DRNT)", desc: "건조함만 해결하면 결점 없이 깨끗하고 튼튼한 피부입니다.", tags: ["건성", "저항성", "비색소", "탄력"], recommendation: "수분 팩과 페이스 오일로 보습만 잘해주면 최상의 상태를 유지합니다." }
};

interface SkinQuizProps {
    onQuizComplete?: (skinCode: string) => void;
    isLoggedIn?: boolean;
    onRequestLogin?: () => void;
    userName?: string;
}

export const SkinQuiz: React.FC<SkinQuizProps> = ({ onQuizComplete, isLoggedIn, onRequestLogin, userName }) => {
    const [step, setStep] = useState(0); // 0: Start, 1-N: Questions, N+1: Result
    const [answers, setAnswers] = useState<string[]>([]);
    const [skinCode, setSkinCode] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    const totalSteps = questions.length;
    const resultStep = totalSteps + 1;

    const handleStart = () => {
        if (!isLoggedIn) {
            onRequestLogin?.();
            return;
        }
        setStep(1);
    };

    const calculateType = (finalAnswers: string[]) => {
        let scores = { O: 0, S: 0, P: 0, W: 0 };

        // 유분 / 수분 (Q1, Q2, Q3)
        if (finalAnswers[0] === 'oily') scores.O += 1;
        else if (finalAnswers[0] === 'dry') scores.O -= 1;
        if (finalAnswers[1] === 'oily') scores.O += 1;
        else if (finalAnswers[1] === 'dry') scores.O -= 1;
        if (finalAnswers[2] === 'oily') scores.O += 1;
        else if (finalAnswers[2] === 'dry') scores.O -= 1;

        // 민감도 (Q4, Q5, Q6)
        if (finalAnswers[3] === 'sensitive') scores.S += 1;
        else if (finalAnswers[3] === 'resilient') scores.S -= 1;
        if (finalAnswers[4] === 'sensitive') scores.S += 1;
        else if (finalAnswers[4] === 'resistant') scores.S -= 1;
        if (finalAnswers[5] === 'sensitive') scores.S += 1;
        else if (finalAnswers[5] === 'resistant') scores.S -= 1;

        // 색소성 (Q7, Q8, Q9)
        if (finalAnswers[6] === 'pigmented') scores.P += 1;
        else if (finalAnswers[6] === 'non-pigmented') scores.P -= 1;
        if (finalAnswers[7] === 'pigmented') scores.P += 1;
        else if (finalAnswers[7] === 'non-pigmented') scores.P -= 1;
        if (finalAnswers[8] === 'pigmented') scores.P += 1;
        else if (finalAnswers[8] === 'non-pigmented') scores.P -= 1;

        // 주름 / 탄력 (Q10, Q11, Q12)
        if (finalAnswers[9] === 'wrinkle') scores.W += 1;
        else if (finalAnswers[9] === 'tight') scores.W -= 1;
        if (finalAnswers[10] === 'wrinkle') scores.W += 1;
        else if (finalAnswers[10] === 'tight') scores.W -= 1;
        if (finalAnswers[11] === 'wrinkle') scores.W += 1;
        else if (finalAnswers[11] === 'tight') scores.W -= 1;

        return [
            scores.O >= 0 ? 'O' : 'D',
            scores.S > 0 ? 'S' : 'R',
            scores.P > 0 ? 'P' : 'N',
            scores.W > 0 ? 'W' : 'T'
        ].join('');
    };

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            setIsProcessing(true);
            const finalCode = calculateType(newAnswers);
            setSkinCode(finalCode);

            // 2.5초 동안 조제 중 메시지 표시 후 결과로 이동
            setTimeout(() => {
                setIsProcessing(false);
                setStep(resultStep); // Finish
                onQuizComplete?.(finalCode);
            }, 2500);
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers([]);
        setSkinCode('');
    };

    return (
        <section className="py-24 px-4 md:px-8 bg-clony-secondary/5">
            <div className="max-w-4xl mx-auto text-center">
                <ScrollSlideIn>
                    <span className="text-clony-primary font-bold tracking-widest text-xs uppercase bg-white px-3 py-1 rounded-full shadow-sm">1-Minute Test</span>
                </ScrollSlideIn>
                <ScrollSlideIn delay={0.1}>
                    <h2 className="text-xl md:text-4xl font-bold text-gray-900 mt-4 mb-2 whitespace-nowrap">
                        내 피부 타입, 확실히 알고 계신가요?
                    </h2>
                    <p className="text-gray-500 mb-12">1분 만에 자가 진단하고 맞춤 솔루션을 확인하세요.</p>
                </ScrollSlideIn>

                <div className="bg-white rounded-[40px] shadow-xl p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Background Decorations */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                        <motion.div
                            className="h-full bg-clony-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(step / resultStep) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        ></motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-6xl mb-6">🧐</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">피부 MBTI 간단 테스트</h3>
                                <p className="text-gray-500 mb-8 break-keep">
                                    복잡한 기기 없이 간단한 질문으로<br />
                                    당신의 피부 성향을 파악해 드려요.
                                </p>
                                <button
                                    onClick={handleStart}
                                    className="bg-clony-primary text-white font-bold text-lg px-8 py-4 rounded-2xl hover:bg-clony-dark transition-colors shadow-lg shadow-clony-primary/30"
                                >
                                    테스트 시작하기
                                </button>
                            </motion.div>
                        )}

                        {step >= 1 && step <= totalSteps && !isProcessing && (
                            <motion.div
                                key={`q-${step}`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="w-full max-w-lg"
                            >
                                <div className="mb-6">
                                    <span className="bg-teal-50 text-teal-600 text-xs font-black px-3 py-1 rounded-full border border-teal-100 uppercase tracking-tighter">
                                        {questions[step - 1].category}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                                    Q{step}. {questions[step - 1].text}
                                </h3>
                                <div className="space-y-3">
                                    {questions[step - 1].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(option.value)}
                                            className="w-full bg-gray-50 hover:bg-clony-primary/5 border border-gray-100 hover:border-clony-primary/50 text-gray-800 hover:text-clony-primary font-bold py-4 rounded-xl transition-all duration-200 text-left px-6 flex justify-between items-center group"
                                        >
                                            {option.label}
                                            <span className="opacity-0 group-hover:opacity-100 text-xl">👉</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {isProcessing && (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="flex flex-col items-center py-10"
                            >
                                <div className="relative w-24 h-24 mb-8">
                                    <div className="absolute inset-0 border-4 border-teal-100 rounded-full"></div>
                                    <motion.div
                                        className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    ></motion.div>
                                    <div className="absolute inset-0 flex items-center justify-center text-3xl">
                                        🧪
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-3">
                                    {userName || '고객'}님을 위한
                                </h3>
                                <div className="flex flex-col items-center">
                                    <p className="text-xl font-bold text-teal-600 animate-pulse">
                                        맞춤 키트 조제 중...
                                    </p>
                                    <div className="flex gap-1 mt-4">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="w-2 h-2 bg-teal-400 rounded-full"
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                                            ></motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === resultStep && (() => {
                            const result = skinProfiles[skinCode] || skinProfiles['ORNT'];

                            return (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="text-6xl mb-4">🎉</div>
                                    <h3 className="text-xl font-bold text-gray-400 mb-2">당신의 피부 타입은...</h3>
                                    <h2 className="text-3xl md:text-5xl font-extrabold text-clony-primary mb-6">
                                        "{result.title}"
                                    </h2>
                                    <div className="flex gap-2 mb-6">
                                        {result.tags.map(tag => (
                                            <span key={tag} className="bg-clony-secondary/10 text-clony-dark px-3 py-1 rounded-full text-sm font-bold">#{tag}</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4 max-w-md bg-white border border-gray-100 p-6 rounded-2xl break-keep shadow-sm text-lg leading-relaxed">
                                        {result.desc}
                                    </p>
                                    <div className="bg-blue-50 p-4 rounded-xl max-w-md w-full mb-8 text-left">
                                        <p className="text-sm font-bold text-blue-600 mb-1">💡 닥터 클로니의 솔루션</p>
                                        <p className="text-gray-700 text-sm">{result.recommendation}</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => document.getElementById('download-trigger')?.click()}
                                            className="bg-clony-dark text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:bg-black transition-colors"
                                        >
                                            AI 정밀 진단 받기
                                        </button>
                                        <button
                                            onClick={resetQuiz}
                                            className="text-gray-400 font-bold px-6 py-3 hover:text-gray-600"
                                        >
                                            다시 하기
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </AnimatePresence>
                </div>
            </div>

            {/* Hidden button to trigger main download modal if needed, 
          or better yet, just pass a prop. For now, we simulate a click 
          on the main CTA or rely on the user clicking the download button in navbar.
          Actually, let's make it more robust by just using a link or scroll to top.
          For this MVP, the above button just exists.
      */}
            <div id="download-trigger" className="hidden" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}></div>
        </section>
    );
};

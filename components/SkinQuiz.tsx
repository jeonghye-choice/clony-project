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

const questions: Question[] = [
    {
        id: 1,
        text: "세안 후 피부가 당기나요?",
        options: [
            { label: "매우 당긴다", value: "dry" },
            { label: "약간 당긴다", value: "normal" },
            { label: "전혀 안 당긴다", value: "oily" }
        ]
    },
    {
        id: 2,
        text: "오후 3시, 얼굴의 번들거림은?",
        options: [
            { label: "얼굴 전체가 번들거린다", value: "oily" },
            { label: "T존만 번들거린다", value: "combination" },
            { label: "거의 없다", value: "dry" }
        ]
    },
    {
        id: 3,
        text: "새로운 화장품을 쓰면 트러블이 나나요?",
        options: [
            { label: "자주 뒤집어진다", value: "sensitive" },
            { label: "가끔 그렇다", value: "normal" },
            { label: "거의 튼튼하다", value: "resilient" }
        ]
    }
];

interface SkinQuizProps {
    onQuizComplete?: () => void;
}

export const SkinQuiz: React.FC<SkinQuizProps> = ({ onQuizComplete }) => {
    const [step, setStep] = useState(0); // 0: Start, 1-3: Questions, 4: Result
    const [answers, setAnswers] = useState<string[]>([]);

    const handleStart = () => setStep(1);

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (step < questions.length) {
            setStep(step + 1);
        } else {
            setStep(4); // Finish
            onQuizComplete?.();
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers([]);
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
                            animate={{ width: `${(step / 4) * 100}%` }}
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
                                    복잡한 기기 없이 간단한 질문으로 당신의 피부 성향을 파악해 드려요.
                                </p>
                                <button
                                    onClick={handleStart}
                                    className="bg-clony-primary text-white font-bold text-lg px-8 py-4 rounded-2xl hover:bg-clony-dark transition-colors shadow-lg shadow-clony-primary/30"
                                >
                                    테스트 시작하기
                                </button>
                            </motion.div>
                        )}

                        {step >= 1 && step <= 3 && (
                            <motion.div
                                key={`q-${step}`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="w-full max-w-lg"
                            >
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

                        {step === 4 && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-xl font-bold text-gray-400 mb-2">당신의 피부 타입은 혹시...</h3>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-clony-primary mb-6">
                                    "수분 부족형 복합성"?
                                </h2>
                                <p className="text-gray-600 mb-8 max-w-md bg-gray-50 p-4 rounded-xl break-keep">
                                    겉은 번들거리지만 속은 당기는 까다로운 피부일 확률이 높아요.
                                    정확한 수치로 확인하고 싶다면?
                                </p>
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
                        )}
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

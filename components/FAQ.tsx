import React, { useState } from 'react';
import { ScrollSlideIn } from './Motion';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left hover:text-clony-primary transition-colors focus:outline-none"
            >
                <span className="text-lg md:text-xl font-bold text-gray-900">{question}</span>
                <span className={`transform transition-transform duration-300 text-2xl text-gray-400 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    +
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-gray-500 leading-relaxed text-base md:text-lg">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const FAQ: React.FC = () => {
    const faqs = [
        {
            q: "피부 진단은 무료인가요?",
            a: "기본적인 AI 피부 진단은 무료로 제공됩니다. 다만, 더 정밀한 심층 분석이나 일일 진단 횟수를 초과할 경우 소정의 비용이 발생할 수 있습니다."
        },
        {
            q: "사진이 서버에 저장되나요?",
            a: "아니요, 촬영된 사진은 분석을 위해 일시적으로만 사용되며 분석 직후 즉시 파기됩니다. 개인정보 보호를 최우선으로 하고 있으니 안심하세요."
        },
        {
            q: "화장 한 상태에서도 가능한가요?",
            a: "정확한 결과를 위해 세안 후 맨 얼굴 상태에서 측정하는 것을 권장합니다. 메이크업 상태에서는 피부 톤이나 잡티 분석결과가 실제와 다를 수 있습니다."
        },
        {
            q: "추천 제품은 광고인가요?",
            a: "Clony는 제휴 여부와 상관없이 오직 사용자의 피부 데이터와 성분 매칭 알고리즘을 통해 가장 적합한 제품만을 공정하게 추천합니다."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <ScrollSlideIn>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">자주 묻는 질문</h2>
                </ScrollSlideIn>

                <div className="bg-white rounded-2xl">
                    {faqs.map((faq, i) => (
                        <ScrollSlideIn key={i} delay={i * 0.1}>
                            <FAQItem question={faq.q} answer={faq.a} />
                        </ScrollSlideIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

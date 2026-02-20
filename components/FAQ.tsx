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
            q: "성분표 스캔은 어떻게 하나요?",
            a: "Clony 앱을 다운로드하고 피부 타입 진단을 완료한 후, 매장에서 제품의 성분표를 카메라로 촬영하면 AI가 자동으로 분석합니다. 5초 안에 성분 정보와 내 피부와의 매칭도를 확인할 수 있습니다."
        },
        {
            q: "피부 타입 매칭도는 어떻게 계산되나요?",
            a: "바우만 피부 타입 진단 결과를 기반으로, 제품의 성분이 당신의 피부 타입에 얼마나 적합한지 AI가 분석하여 매칭도를 제공합니다. 전 세계 피부과 전문의들이 사용하는 공신력 있는 분류법을 사용합니다."
        },
        {
            q: "당일 배송은 어떻게 이용하나요?",
            a: "앱에서 제품을 장바구니에 담고 결제 시 주소를 입력하면, 당일 또는 새벽에 숙소 앞으로 배송됩니다. 더 이상 무거운 화장품을 들고 다닐 필요가 없습니다."
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

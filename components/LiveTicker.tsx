import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
    "🔥 방금 서울의 김**님이 피부 진단을 완료했어요",
    "💆‍♀️ 현재 1,203명이 Clony와 함께 피부 관리 중!",
    "🧴 이**님이 '건성용 수분 크림'을 추천받았습니다",
    "📈 박**님의 피부 점수가 지난달보다 12점 올랐어요",
    "✨ 새로운 AI 진단 리포트가 생성되었습니다",
    "💧 '속건조 해결' 팁이 인기를 끌고 있어요"
];

export const LiveTicker: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 4000); // Change message every 4 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg shadow-clony-primary/10 rounded-full py-3 px-5 flex items-center gap-3 max-w-[320px] pointer-events-auto"
                >
                    <div className="relative flex shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 truncate">
                        {messages[index]}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

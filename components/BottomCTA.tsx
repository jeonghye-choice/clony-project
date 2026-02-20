import React from 'react';
import { ScrollSlideIn } from './Motion';

interface BottomCTAProps {
    onDownload: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onDownload }) => {
    return (
        <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-white to-clony-secondary/5 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-clony-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-clony-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <ScrollSlideIn>
                    <span className="inline-block py-1 px-3 rounded-full bg-clony-primary/10 text-clony-primary font-bold text-xs uppercase tracking-widest mb-6">
                        Start Your Journey
                    </span>
                </ScrollSlideIn>

                <ScrollSlideIn delay={0.1}>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight break-keep">
                        지금 바로 나만의<br />
                        <span className="text-clony-primary">피부 솔루션</span>을 만나보세요
                    </h2>
                </ScrollSlideIn>

                <ScrollSlideIn delay={0.2}>
                    <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed break-keep">
                        AI 진단부터 맞춤형 루틴 추천까지,<br className="md:hidden" />
                        클로니와 함께라면 피부가 달라집니다.
                    </p>
                </ScrollSlideIn>

                <ScrollSlideIn delay={0.3}>
                    <button
                        onClick={onDownload}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-clony-primary font-lg rounded-2xl hover:bg-clony-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-clony-primary shadow-xl shadow-clony-primary/30 hover:shadow-2xl hover:shadow-clony-primary/40 hover:-translate-y-1"
                    >
                        <span className="mr-2 text-xl">Clony 앱 다운로드 받기</span>
                        <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </button>
                    <p className="mt-4 text-sm text-gray-400 font-medium">
                        * iOS / Android 모두 지원합니다
                    </p>
                </ScrollSlideIn>
            </div>
        </section>
    );
};

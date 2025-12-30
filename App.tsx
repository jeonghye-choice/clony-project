import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FadeInUp, StaggerText, ScrollSlideIn, Float, PulseButton } from './components/Motion';
import { TrustBanner } from './components/TrustBanner';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ViewState, SkinAnalysisResult } from './types';
import { Button } from './components/Button';
import { AnalysisView } from './components/AnalysisView';
import { ResultView } from './components/ResultView';
import { Logo } from './components/Logo';
import { PhoneMockup } from './components/PhoneMockup';
import { ProductSearch } from './components/ProductSearch';
import { DownloadModal } from './components/DownloadModal';
import { ExpertTeam } from './components/ExpertTeam';
import { SkinMagazine } from './components/SkinMagazine';
import { LiveTicker } from './components/LiveTicker';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { SkinQuiz } from './components/SkinQuiz';
import { IngredientDictionary } from './components/IngredientDictionary';
import { CommunityPreview } from './components/CommunityPreview';

// --- Background Decoration Component (Preserved) ---
const BackgroundDecoration = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
    {/* Top-Left Organic Wave */}
    <div className="absolute top-0 left-0 w-full h-[80vh] opacity-100">
      <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0 0H1440V400C1440 400 1100 650 720 500C340 350 0 600 0 600V0Z" fill="#ECFDF5" />
      </svg>
    </div>

    {/* Bottom-Right Organic Wave */}
    <div className="absolute bottom-0 right-0 w-full h-[60vh] opacity-100">
      <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
        <path d="M1440 600V200C1440 200 1100 450 720 300C340 150 0 400 0 400V600H1440Z" fill="#ECFDF5" />
      </svg>
    </div>

    {/* Soft Blobs for depth */}
    <div className="absolute top-[15%] right-[20%] w-64 h-64 bg-clony-secondary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-clony-primary/5 rounded-full blur-3xl" />
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // 3D Rotation State for Hero Section
  const [rotation, setRotation] = useState({ x: 0, y: -25 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Rotating Word State for Hero iPhone UI
  const productTypes = ['로션', '스킨', '토너'];
  const [productIdx, setProductIdx] = useState(0);

  // --- Skin Quiz State & Ref ---
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const skinQuizRef = useRef<HTMLDivElement>(null);

  const handleScrollToQuiz = () => {
    if (skinQuizRef.current) {
      skinQuizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProductIdx((prev) => (prev + 1) % productTypes.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Hero Section 3D Rotation logic
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      setRotation(prev => ({
        x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.3)),
        y: Math.max(-135, Math.min(135, prev.y + deltaX * 0.5))
      }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    const handleGlobalMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleAnalysisComplete = (result: SkinAnalysisResult) => {
    setAnalysisResult(result);
    setView(ViewState.RESULTS);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (view !== ViewState.HOME) return;
    setIsDragging(true);
    setHasInteracted(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div className="min-h-screen relative font-sans text-gray-800">
      <BackgroundDecoration />

      {/* Top Banner */}
      <div
        onClick={() => setIsDownloadModalOpen(true)}
        className="fixed top-0 left-0 right-0 h-10 bg-clony-primary z-[60] flex items-center justify-center text-white text-sm font-medium tracking-wide cursor-pointer hover:bg-clony-dark transition-colors"
      >
        <span>Clony 앱 다운로드 하기</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>

      <Navbar setView={setView} />

      <main className="max-w-7xl mx-auto relative z-10 overflow-x-hidden">
        {view === ViewState.HOME && (
          <div className="flex flex-col">
            {/* Hero Section */}
            <div
              className={`flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[auto] lg:min-h-screen px-6 md:px-12 py-12 lg:py-0 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
              onMouseDown={handleMouseDown}
            >
              <div className="space-y-6 lg:space-y-8 order-1 select-none pointer-events-none pt-4 lg:pt-0 text-center lg:text-left">
                <FadeInUp delay={0.2} className="inline-block bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-clony-primary font-bold text-xs md:text-sm tracking-wide shadow-sm pointer-events-auto">
                  AI SKIN DIAGNOSIS
                </FadeInUp>
                <div className="text-3xl md:text-6xl font-display font-bold leading-tight text-gray-900 break-keep">
                  <StaggerText text="정밀 데이터로 설계하는" delay={0.4} />
                  <br className="hidden lg:block" />
                  <span className="text-gray-900 block mt-2 lg:inline lg:mt-0">
                    <StaggerText text="당신만의 뷰티 루틴" delay={0.8} />
                  </span>
                </div>
                <div className="space-y-3 lg:space-y-4 px-2 lg:px-0">
                  <FadeInUp delay={1.2}>
                    <p className="text-base md:text-2xl text-gray-800/80 font-medium max-w-xl break-keep leading-relaxed mx-auto lg:mx-0">
                      0.1mm의 피부 결까지 파악하는 AI 정밀 분석 시스템.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={1.4}>
                    <p className="text-base md:text-2xl text-clony-dark font-bold max-w-xl break-keep leading-relaxed bg-clony-primary/10 inline-block px-2 rounded mx-auto lg:mx-0">
                      오직 당신에게만 완벽한 제품, CLONY AI로 검증하세요.
                    </p>
                  </FadeInUp>
                </div>

                <div className="flex flex-col gap-4 items-center lg:items-start pt-4 pointer-events-auto w-full">
                  <FadeInUp delay={1.6} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
                    <PulseButton onClick={() => setIsDownloadModalOpen(true)} className="w-full sm:w-auto bg-clony-primary text-white font-bold rounded-xl hover:bg-clony-dark transition-colors text-lg md:text-xl px-8 py-4 shadow-2xl shadow-clony-primary/30 flex justify-center">
                      내 피부 확인하기
                    </PulseButton>
                    <Button variant="secondary" onClick={() => {
                      const el = document.getElementById('service-intro');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }} className="w-full sm:w-auto text-lg md:text-xl px-8 py-4 shadow-xl flex justify-center">
                      서비스 소개
                    </Button>
                  </FadeInUp>
                </div>
              </div>

              {/* 3D Phone Mockup */}
              <Float className="h-[450px] lg:h-[700px] w-full relative order-2 flex justify-center items-center mt-[-20px] lg:mt-0" style={{ perspective: '2000px' }}>
                <PhoneMockup rotation={rotation}>
                  <div
                    className="w-full h-full bg-[#FAFAFA] flex flex-col font-sans relative"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {/* App Header */}
                    <div className="h-[44px] w-full shrink-0 z-40"></div>
                    <div className="px-6 pb-2 flex justify-between items-center bg-[#FAFAFA] z-40 relative">
                      <span className="font-display font-bold text-xl text-clony-primary">Clony</span>
                      <div className="flex gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                      </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto px-5 pt-2 pb-20 bg-[#FAFAFA] space-y-4 cursor-auto overscroll-contain">
                      {/* Skin Score Card with Graph */}
                      <div className="p-6 bg-gradient-to-br from-[#10D682] to-[#34D399] rounded-[32px] text-white shadow-xl relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">Today's Skin Score</p>
                            <div className="flex items-end gap-2">
                              <span className="text-5xl font-black leading-none">77</span>
                              <span className="text-xl font-bold opacity-90 mb-1">Good</span>
                            </div>
                          </div>
                          {/* Mini Graph Visualization */}
                          <div className="bg-white/10 rounded-xl p-2 backdrop-blur-sm">
                            <div className="flex items-end gap-1 h-[40px]">
                              <div className="w-1.5 bg-white/40 h-[60%] rounded-sm"></div>
                              <div className="w-1.5 bg-white/40 h-[40%] rounded-sm"></div>
                              <div className="w-1.5 bg-white/40 h-[70%] rounded-sm"></div>
                              <div className="w-1.5 bg-white/40 h-[50%] rounded-sm"></div>
                              <div className="w-1.5 bg-white h-[90%] rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold">수분 72%</div>
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold">탄력 84%</div>
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold">피지 12%</div>
                        </div>
                      </div>

                      {/* Skin History Graph (New) */}
                      <div className="p-5 bg-white rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Weekly Analysis</p>
                            <h4 className="text-[14px] font-bold text-gray-900 mt-1">수분이 지난주보다 <span className="text-[#10D682]">15%</span> 늘었어요! 📈</h4>
                          </div>
                        </div>

                        <div className="relative h-[80px] w-full mt-4">
                          {/* Grid Lines */}
                          <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                            <div className="w-full h-px bg-gray-900"></div>
                            <div className="w-full h-px bg-gray-900"></div>
                            <div className="w-full h-px bg-gray-900"></div>
                          </div>

                          {/* Graph Line */}
                          <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#10D682" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#10D682" stopOpacity="1" />
                              </linearGradient>
                              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                  <feMergeNode in="coloredBlur" />
                                  <feMergeNode in="SourceGraphic" />
                                </feMerge>
                              </filter>
                            </defs>
                            {/* Trend Line */}
                            <path
                              d="M0,60 C40,60 50,40 90,45 C130,50 140,20 180,25 C220,30 240,5 290,10"
                              fill="none"
                              stroke="#10D682"
                              strokeWidth="3"
                              strokeLinecap="round"
                              filter="url(#glow)"
                            />
                            {/* Beating Dot at the end */}
                            <circle cx="290" cy="10" r="4" fill="white" stroke="#10D682" strokeWidth="2">
                              <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                            </circle>
                          </svg>

                          {/* X-Axis Labels */}
                          <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-[8px] text-gray-400 font-medium px-1">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                          </div>
                        </div>
                      </div>

                      {/* Weather Insight Card */}
                      <div className="p-5 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-clony-surface rounded-2xl flex items-center justify-center text-2xl">🌦️</div>
                        <div className="flex-1">
                          <div className="inline-block bg-[#10D682]/10 px-2 py-0.5 rounded-md mb-1">
                            <p className="text-[8px] font-extrabold text-[#10D682] uppercase tracking-tighter">Weather Insight</p>
                          </div>
                          <p className="text-[13px] font-bold text-gray-900 leading-snug break-keep">"오늘 <span className="text-[#10D682]">건조주의보</span>! 💧 수분 크림을 듬뿍 발라주세요"</p>
                        </div>
                      </div>

                      {/* My Routine Checklist */}
                      <div className="space-y-2">
                        <div className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2 flex justify-between items-center">
                          <span>Morning Routine</span>
                          <span className="text-[10px] text-gray-400 font-normal">2/3 완료</span>
                        </div>
                        {[
                          { name: '약산성 세안하기', done: true },
                          { name: '비타민 앰플 바르기', done: true },
                          { name: '선크림 필수!', done: false }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-50">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${item.done ? 'bg-[#10D682] border-[#10D682]' : 'border-gray-300'}`}>
                              {item.done && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>}
                            </div>
                            <span className={`text-[13px] font-medium ${item.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{item.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Dynamic Recommendation Header */}
                      <div className="pt-2">
                        <div className="text-[20px] font-bold text-gray-900 leading-tight">당신과 가장 잘 맞을<br /><span key={productIdx} className="word-transition text-clony-primary border-b-[3px] border-clony-secondary/50">{productTypes[productIdx]}</span> 추천드려요</div>
                      </div>

                      {/* Product Recommendations Grouped */}
                      <div className="space-y-6 pb-6">

                        {/* Group 1: Skin / Toner */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Skin & Toner</span>
                            <span className="text-[10px] text-clony-primary font-bold bg-clony-primary/10 px-2 py-0.5 rounded-full">Best Match</span>
                          </div>

                          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 relative overflow-hidden group hover:border-clony-primary/30 transition-colors">
                            <div className="absolute top-0 right-0 bg-[#10D682] text-white text-[9px] font-bold px-2 py-1 rounded-bl-xl shadow-sm">수부지 98% 일치</div>
                            <div className="w-[50px] h-[50px] rounded-xl bg-gray-50 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">🧴</div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold">아누아</p>
                              <p className="text-[14px] font-bold text-gray-900 leading-tight">어성초 77 수딩 토너</p>
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 relative overflow-hidden group hover:border-clony-primary/30 transition-colors">
                            <div className="absolute top-0 right-0 bg-[#10D682]/90 text-white text-[9px] font-bold px-2 py-1 rounded-bl-xl shadow-sm">건성 95% 일치</div>
                            <div className="w-[50px] h-[50px] rounded-xl bg-gray-50 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">🥕</div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold">스킨푸드</p>
                              <p className="text-[14px] font-bold text-gray-900 leading-tight">캐롯 카로틴 패드</p>
                            </div>
                          </div>
                        </div>

                        {/* Group 2: Lotion / Cream */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Lotion & Cream</span>
                          </div>

                          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 relative overflow-hidden group hover:border-clony-primary/30 transition-colors">
                            <div className="absolute top-0 right-0 bg-[#10D682]/80 text-white text-[9px] font-bold px-2 py-1 rounded-bl-xl shadow-sm">지성 92% 일치</div>
                            <div className="w-[50px] h-[50px] rounded-xl bg-gray-50 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">💦</div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold">닥터지</p>
                              <p className="text-[14px] font-bold text-gray-900 leading-tight">레드 블레미쉬 크림</p>
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 relative overflow-hidden group hover:border-clony-primary/30 transition-colors">
                            <div className="absolute top-0 right-0 bg-gray-400 text-white text-[9px] font-bold px-2 py-1 rounded-bl-xl shadow-sm">민감성 88% 일치</div>
                            <div className="w-[50px] h-[50px] rounded-xl bg-gray-50 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">🌙</div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold">라네즈</p>
                              <p className="text-[14px] font-bold text-gray-900 leading-tight">워터 슬리핑 마스크</p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Floating Action Button */}
                    <div className="absolute bottom-[90px] right-[20px] z-50">
                      <div className="w-[56px] h-[56px] bg-[#10D682] rounded-full shadow-lg shadow-[#10D682]/40 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom Navigation Bar */}
                    <div className="h-[80px] w-full bg-white border-t border-gray-100 flex justify-between items-start px-8 pt-4 z-40 rounded-b-[44px]">
                      <div className="flex flex-col items-center gap-1 text-[#10D682]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>
                        <span className="text-[10px] font-bold">홈</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        <span className="text-[10px] font-bold">리포트</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-[10px] font-bold">루틴</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                        <span className="text-[10px] font-bold">MY</span>
                      </div>
                    </div>
                  </div>
                </PhoneMockup>
              </Float>
            </div>

            {/* Trust Banner (New) */}
            <TrustBanner />
            <ExpertTeam />

            {/* Service Intro Section */}
            <section id="service-intro" className="py-24 md:py-32 px-4 md:px-8 bg-white border-t border-gray-50">
              <div className="max-w-6xl mx-auto">
                <div className="bg-clony-dark rounded-[48px] p-8 md:p-20 relative overflow-hidden shadow-2xl">
                  {/* Background decoration for the card */}
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-clony-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                  <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <ScrollSlideIn direction="left">
                        <div className="inline-block bg-clony-primary/20 text-clony-primary px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest border border-clony-primary/30">Service Info</div>
                      </ScrollSlideIn>
                      <ScrollSlideIn direction="left" delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight break-keep">
                          "카메라만 켜세요" 🔍<br />
                          당신의 피부타입을<br />
                          <span className="text-clony-primary">바로 분석</span>해드립니다.
                        </h2>
                      </ScrollSlideIn>
                      <ScrollSlideIn direction="left" delay={0.2}>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg break-keep">
                          클로니 AI는 스마트폰 카메라를 통해<br />
                          모공, 수분, 탄력을 실시간 파악합니다.<br />
                          복잡한 기기 없이 지금 바로 전문적인 진단을 받아보세요.
                        </p>
                      </ScrollSlideIn>
                      <ScrollSlideIn direction="left" delay={0.3}>
                        <Button onClick={() => setIsDownloadModalOpen(true)} className="px-10 py-4 shadow-2xl shadow-clony-primary/20">지금 진단 시작하기</Button>
                      </ScrollSlideIn>
                    </div>

                    {/* Right Column: AI Scan Mode Card (Updated per user request) */}
                    <div className="hidden lg:flex justify-center items-center h-full">
                      <div className="relative w-[320px] h-[460px] rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 overflow-hidden group hover:border-clony-primary/50 transition-colors duration-500">
                        {/* Decorative inner border/glow */}
                        <div className="absolute inset-4 rounded-[32px] border border-white/10 pointer-events-none"></div>

                        {/* Camera Icon Circle */}
                        <div className="w-24 h-24 rounded-full bg-clony-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-clony-primary/20">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-clony-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                          </svg>
                        </div>

                        {/* Text */}
                        <h3 className="text-2xl font-bold text-white mb-3">AI 진단 모드</h3>
                        <p className="text-white/40 text-sm leading-relaxed">
                          얼굴을 프레임 안에 맞추고<br />
                          촬영 버튼을 눌러주세요
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skin Quiz (New) */}
            <div ref={skinQuizRef} className="scroll-mt-20">
              <SkinQuiz onQuizComplete={() => setIsQuizCompleted(true)} />
            </div>

            {/* How It Works (New) */}
            <HowItWorks />

            {/* Before/After Slider (New) */}
            <BeforeAfterSlider />

            {/* Product Search Section */}
            {/* Product Search Section (Dynamic) */}
            <ProductSearch isQuizCompleted={isQuizCompleted} onScrollToQuiz={handleScrollToQuiz} />

            {/* Ingredient Dictionary (New) */}
            <IngredientDictionary />

            {/* Community Preview (New) */}
            <CommunityPreview />

            <SkinMagazine />

            {/* Testimonials (New) */}
            <Testimonials />

            {/* FAQ (New) */}
            <FAQ />

            {/* Footer */}
            <footer className="bg-white py-12 px-4 md:px-8 border-t border-gray-100 flex flex-col items-center text-center space-y-6">
              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="text-2xl font-bold font-display text-clony-primary tracking-tight">Clony</span>
                <div className="flex items-center gap-1 ml-4 text-gray-500 hover:text-gray-900 transition-colors">
                  <span className="text-sm font-semibold">사업자 정보</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-x-2 text-[13px] text-gray-400 font-medium">
                <a href="#" className="hover:underline">사업자정보확인</a>
                <span>·</span>
                <a href="#" className="hover:underline">이용약관</a>
                <span>·</span>
                <a href="#" className="text-gray-900 font-bold hover:underline">개인정보 처리방침</a>
              </div>

              <div className="flex flex-wrap justify-center gap-x-2 text-[13px] text-gray-400 font-medium">
                <a href="#" className="hover:underline">1:1 문의</a>
                <span>·</span>
                <a href="#" className="hover:underline">클로니 비즈니스</a>
                <span>·</span>
                <a href="#" className="hover:underline">광고/제휴문의</a>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>

              <div className="text-[11px] text-gray-300 font-medium">
                © 2024 Clony Inc. All rights reserved.
              </div>
            </footer>
          </div>
        )
        }

        {
          view === ViewState.ANALYZE && (
            <div className="min-h-[70vh] flex flex-col justify-center px-4 md:px-8 pt-24">
              <AnalysisView onResult={handleAnalysisComplete} onCancel={() => setView(ViewState.HOME)} />
            </div>
          )
        }

        {
          view === ViewState.RESULTS && analysisResult && (
            <div className="px-4 md:px-8 pt-24 pb-12">
              <ResultView result={analysisResult} onReset={() => setView(ViewState.ANALYZE)} />
            </div>
          )
        }
      </main >

      <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
      <LiveTicker />
    </div >
  );
};

export default App;
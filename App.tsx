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
// PhoneMockup removed from Hero, used in AppShowcase
import { ProductSearch } from './components/ProductSearch';
import { DownloadModal } from './components/DownloadModal';
import { ExpertTeam } from './components/ExpertTeam';
import { SkinMagazine } from './components/SkinMagazine';
import { LiveTicker } from './components/LiveTicker';
import { SkinQuiz } from './components/SkinQuiz';
import { IngredientDictionary } from './components/IngredientDictionary';
import { IngredientSynergy } from './components/IngredientSynergy';
import { CommunityPreview } from './components/CommunityPreview';
import { BottomCTA } from './components/BottomCTA';
import { WhyClony } from './components/WhyClony';
import { AppShowcase } from './components/AppShowcase';
import { OCRDemo } from './components/OCRDemo';
import { ScanToDelivery } from './components/ScanToDelivery';
import { KitPurchaseSection } from './components/KitPurchaseSection';
import { CheckoutView } from './components/CheckoutView';
import { PaymentSuccessView } from './components/PaymentSuccessView';
import AdminDashboard from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';

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
    <div className="absolute top-[15%] right-[20%] w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
    <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-teal-400/5 rounded-full blur-3xl" />
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ days: number; price: number; label: string; kitName: string } | null>(null);
  const [quizSkinType, setQuizSkinType] = useState<string | null>(null);
  const [cartSelectedIndices, setCartSelectedIndices] = useState<number[]>([0]);
  const [cartSelectedDays, setCartSelectedDays] = useState<number>(7);
  const kitPurchaseRef = useRef<HTMLDivElement>(null);

  // User & Registration State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<{
    nickname: string;
    age: string;
    gender: string;
    skinConcern: string;
    address: string;
  } | null>(null);

  const handleLogin = (userInfo: {
    nickname: string;
    age: string;
    gender: string;
    skinConcern: string;
    address: string;
  }) => {
    setUser(userInfo);
    // Optional: Save to localStorage here
    localStorage.setItem('clony_user', JSON.stringify(userInfo));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('clony_user');
    window.location.reload();
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('clony_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handlePurchase = (plan: { days: number; price: number; label: string; kitName: string }) => {
    setSelectedPlan(plan);
    setView(ViewState.CHECKOUT);
    window.scrollTo(0, 0);
  };

  // Payment Success Handler
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (paymentKey && orderId && amount) {
      setView(ViewState.SUCCESS);
      // Clear URL params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

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

  const handleResetQuiz = () => {
    setQuizSkinType(null);
    setIsQuizCompleted(false);
    setCartSelectedIndices([0]);
    setCartSelectedDays(7);
    if (skinQuizRef.current) {
      skinQuizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

  const handleQuizComplete = (skinCode: string) => {
    setIsQuizCompleted(true);
    setQuizSkinType(skinCode);

    // 퀴즈 완료 후 앱 다운로드 안내
    setTimeout(() => {
      setIsDownloadModalOpen(true);
    }, 1000);
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
        className="w-full h-10 bg-clony-primary z-[60] flex items-center justify-center text-white text-sm font-medium tracking-wide cursor-pointer hover:bg-clony-dark transition-colors relative"
      >
        <span>Clony 앱 다운로드 하기</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>

      <Navbar
        setView={setView}
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto relative z-10 overflow-x-hidden">
        {view === ViewState.HOME && (
          <div className="flex flex-col">
            {/* Hero Section (Redesigned - Text Centered, No Phone) */}
            <div className="flex flex-col items-center justify-center min-h-[60vh] lg:min-h-[80vh] px-6 md:px-12 py-20 text-center relative z-20">
              <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
                <FadeInUp delay={0.2} className="mb-4">
                  <span className="text-lg md:text-2xl text-gray-500 font-bold tracking-widest uppercase">
                    매장에서 고민만 하다가 빈손으로 나오셨나요?
                  </span>
                </FadeInUp>

                <div className="mb-6 relative z-10">
                  <h1 className="text-6xl md:text-[10rem] font-display font-black tracking-[0.1em] text-gray-900 leading-none">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 block bubble-text">
                      CLONY
                    </span>
                  </h1>
                </div>

                <div className="space-y-4 px-2 mb-12">
                  <FadeInUp delay={0.4}>
                    <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed break-keep tracking-tight">
                      성분표 찍으면, AI가 내 피부에 맞는지 바로 알려드려요.<br />
                      성분 분석부터 당일 배송까지. 더 이상 고민하지 마세요.
                    </p>
                  </FadeInUp>
                </div>

                <div className="flex flex-col items-center gap-4 pt-4">
                  <FadeInUp delay={0.6}>
                    <span className="text-sm font-bold text-gray-400 mb-2 block">앱 다운로드 받기</span>
                  </FadeInUp>

                  <FadeInUp delay={0.8} className="flex flex-col gap-3 w-full max-w-[200px]">
                    {/* App Store Button */}
                    <button onClick={() => setIsDownloadModalOpen(true)} className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:opacity-80 transition-opacity shadow-lg">
                      <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 46.5 120.4 78.6 119.7 28 0 53.6-26.3 78-26.3 15 0 38.2 26.1 79.4 26.1 40 0 72.2-83.6 82.2-119.7-27.1-12.2-46.7-45.7-47.9-85.8zm-47.9-170c18.5-24.8 33.4-61.9 27.5-101.4-27.9 2-59.5 16.9-79.9 44.2-19.6 25-33.1 61.3-26.9 100.8 29.8-1 57.6-18.4 79.3-43.6z" />
                      </svg>
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] font-medium">Download on the</span>
                        <span className="text-sm font-bold">App Store</span>
                      </div>
                    </button>

                    {/* Google Play Button */}
                    <button onClick={() => setIsDownloadModalOpen(true)} className="flex items-center justify-center gap-3 bg-white text-gray-900 border border-gray-200 px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                      <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6 text-gray-900">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                      </svg>
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] font-medium">GET IT ON</span>
                        <span className="text-sm font-bold">Google Play</span>
                      </div>
                    </button>
                  </FadeInUp>
                </div>
              </div>
            </div>



            {/* WhyClony (Pain Point) - 2nd */}
            <WhyClony />

            {/* AppShowcase (Custom Kit Mockup) - 3rd */}
            <AppShowcase />

            {/* Skin Quiz (Diagnosis) - 4th */}
            <div ref={skinQuizRef} className="scroll-mt-20">
              <SkinQuiz
                isLoggedIn={!!user}
                userName={user?.nickname}
                onRequestLogin={() => setIsLoginModalOpen(true)}
                onQuizComplete={handleQuizComplete}
              />
            </div>

            {/* OCR Demo (Interactive Demo) - 5th (New) */}
            <OCRDemo />

            {/* Scan to Delivery (Full Journey) - 6th (New) */}
            <ScanToDelivery />

            {/* Product Search (OCR 안내로 변경 예정) */}
            <ProductSearch isQuizCompleted={isQuizCompleted} onScrollToQuiz={handleScrollToQuiz} />




            {/* How It Works (New) */}
            <HowItWorks />

            {/* Ingredient Dictionary (New) */}
            <IngredientDictionary />

            {/* Ingredient Synergy Section (New) */}
            <IngredientSynergy />

            {/* Community Preview (New) */}
            <CommunityPreview />

            <SkinMagazine />

            {/* Testimonials (New) */}
            <Testimonials />

            {/* FAQ (New) */}
            <FAQ />

            {/* Bottom CTA (New) */}
            <BottomCTA onDownload={() => setIsDownloadModalOpen(true)} />
            <button
              onClick={() => setView(ViewState.ADMIN)}
              className="w-full py-4 text-[10px] text-gray-200 hover:text-gray-400 transition-colors bg-gray-50/50"
            >
              Admin Console
            </button>

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
        )}

        {view === ViewState.ANALYZE && (
          <div className="min-h-[70vh] flex flex-col justify-center px-4 md:px-8 pt-24">
            <AnalysisView onResult={handleAnalysisComplete} onCancel={() => setView(ViewState.HOME)} />
          </div>
        )}

        {view === ViewState.RESULTS && analysisResult && (
          <div className="px-4 md:px-8 pt-24 pb-12">
            <ResultView result={analysisResult} onReset={() => setView(ViewState.ANALYZE)} />
          </div>
        )}

        {view === ViewState.CHECKOUT && (
          <CheckoutView
            selectedPlan={selectedPlan}
            user={user}
            onBack={() => setView(ViewState.HOME)}
            onComplete={() => {
              setCartSelectedIndices([0]);
              setCartSelectedDays(7);
              setView(ViewState.HOME);
            }}
          />
        )}

        {view === ViewState.SUCCESS && (
          <PaymentSuccessView
            orderId={new URLSearchParams(window.location.search).get('orderId') || 'unknown'}
            amount={Number(new URLSearchParams(window.location.search).get('amount')) || 0}
            paymentKey={new URLSearchParams(window.location.search).get('paymentKey') || ''}
            onHome={() => setView(ViewState.HOME)}
          />
        )}
        {view === ViewState.ADMIN && (
          <AdminDashboard onBack={() => setView(ViewState.HOME)} />
        )}
      </main>

      <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      {view !== ViewState.CHECKOUT && <LiveTicker />}
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  setView: (view: ViewState) => void;
  user: {
    nickname: string;
    age: string;
    gender: string;
    skinConcern: string;
    address: string;
  } | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setView, user, onLoginClick, onLogout }) => {
  const [lang, setLang] = useState<'KR' | 'EN'>('KR');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ... (scroll effect logic remains same)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show immediately if at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide if scrolling down, show if scrolling up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 py-2 px-4 md:py-3 md:px-6 flex justify-between items-center max-w-7xl mx-auto bg-white/80 backdrop-blur-md transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div
        onClick={() => setView(ViewState.HOME)}
        className="cursor-pointer flex items-center gap-2 group min-w-[100px]"
      >
        <span className="text-xl md:text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 tracking-wide">Clony</span>
      </div>

      {/* Center Search Bar */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <input
            type="text"
            readOnly
            placeholder="궁금한 제품을 검색해보세요"
            onClick={() => {
              const el = document.getElementById('product-search');
              el?.scrollIntoView({ behavior: 'smooth' });

              setTimeout(() => {
                const input = document.getElementById('product-search-input');
                input?.focus({ preventScroll: true });
              }, 500);
            }}
            className="w-full px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-teal-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all shadow-[0_2px_10px_rgba(45,212,191,0.1)] group-hover:shadow-[0_4px_15px_rgba(45,212,191,0.2)] cursor-pointer"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="min-w-[200px] flex justify-end gap-3 items-center">
        {/* Login / Profile / Logout Button */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200">
              <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                {user.nickname.charAt(0)}
              </div>
              <span className="text-sm font-bold text-gray-700">{user.nickname}님</span>
            </div>
            <button
              onClick={onLogout}
              className="text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all shadow-md"
          >
            로그인/회원가입
          </button>
        )}

        {/* Language Switcher UI */}
        <div className="bg-white/80 backdrop-blur-md p-1 rounded-full border border-clony-primary/20 flex shadow-sm">
          <button
            onClick={() => setLang('KR')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'KR' ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-teal-500'}`}
          >
            KR
          </button>
          <button
            onClick={() => setLang('EN')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'EN' ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-teal-500'}`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
};
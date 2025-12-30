import React, { useState } from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setView }) => {
  const [lang, setLang] = useState<'KR' | 'EN'>('KR');

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto bg-white/80 backdrop-blur-md transition-all duration-300">
      <div
        onClick={() => setView(ViewState.HOME)}
        className="cursor-pointer flex items-center gap-2 group min-w-[100px]"
      >
        <span className="text-2xl font-display font-bold text-clony-primary tracking-tight">Clony</span>
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

              // Focus the input, with a small timeout to ensure smooth scrolling starts first if needed, 
              // or use preventScroll: true to let scrollIntoView handle the movement.
              setTimeout(() => {
                const input = document.getElementById('product-search-input');
                input?.focus({ preventScroll: true });
              }, 500); // Wait for scroll to settle a bit or just start
            }}
            className="w-full px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-clony-primary/10 text-sm focus:outline-none focus:ring-2 focus:ring-clony-primary/50 transition-all shadow-sm group-hover:shadow-md cursor-pointer"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-clony-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="min-w-[200px] flex justify-end">
        {/* Language Switcher UI */}
        <div className="bg-white/80 backdrop-blur-md p-1 rounded-full border border-clony-primary/20 flex shadow-sm">
          <button
            onClick={() => setLang('KR')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'KR' ? 'bg-clony-primary text-white shadow-md' : 'text-gray-400 hover:text-clony-primary'}`}
          >
            KR
          </button>
          <button
            onClick={() => setLang('EN')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'EN' ? 'bg-clony-primary text-white shadow-md' : 'text-gray-400 hover:text-clony-primary'}`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
};
import React, { useState } from 'react';
import { SkinAnalysisResult } from '../types';
import { Button } from './Button';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getRecommendedProducts, getSkinTypeInfo, parseSkinTraits } from '../utils/productDatabase';
import { PulseButton } from './Motion';

interface ResultViewProps {
  result: SkinAnalysisResult;
  onReset: () => void;
  onPurchase?: (plan: { days: number; price: number; label: string }) => void;
}

const PRICING_OPTIONS = [
  { days: 3, price: 1470, label: '3일 체험' },
  { days: 5, price: 1960, label: '5일 체험' },
  { days: 7, price: 2450, label: '7일 체험', recommend: true },
  { days: 14, price: 3920, label: '2주 완성' },
  { days: 30, price: 7900, label: '30일 루틴' }
];

const CATEGORIES = ['전체', '클렌징', '토너/패드', '세럼/앰플', '보습', '선케어'];

export const ResultView: React.FC<ResultViewProps> = ({ result, onReset, onPurchase }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedDays, setSelectedDays] = useState(7);

  // Get skin type info and traits
  const skinTypeInfo = getSkinTypeInfo(result.skinType);
  const traits = parseSkinTraits(result.skinType);

  // Get recommended products
  const recommendedProducts = getRecommendedProducts(result.skinType, selectedCategory);

  // Get selected pricing option
  const selectedOption = PRICING_OPTIONS.find(op => op.days === selectedDays) || PRICING_OPTIONS[2];

  const handlePurchaseClick = () => {
    if (onPurchase) {
      onPurchase({
        days: selectedOption.days,
        price: selectedOption.price,
        label: selectedOption.label
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Summary Header */}
      <div className="bg-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <div className="inline-block bg-clony-secondary text-white px-4 py-1 rounded-full font-bold mb-4">
            분석 완료
          </div>
          <h2 className="text-4xl font-display font-bold text-gray-800 mb-2 break-keep">
            당신의 피부 타입은 <span className="text-clony-primary">{result.skinType}</span> 입니다
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed break-keep mb-4">{skinTypeInfo.desc}</p>

          <div className="flex flex-wrap gap-2">
            {skinTypeInfo.tags.map((tag, idx) => (
              <span key={idx} className="bg-teal-50 text-teal-600 px-3 py-1 rounded-lg text-sm font-semibold border border-teal-100">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 bg-teal-50 border border-teal-100 rounded-3xl p-6 flex flex-col items-center justify-center min-w-[160px]">
          <span className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-1">Your Type</span>
          <span className="text-6xl font-black text-teal-900 leading-tight">{result.skinType}</span>
          <div className="h-1 w-8 bg-teal-200 rounded-full mt-2"></div>
        </div>
      </div>

      {/* Skin Balance Chart */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h3 className="text-2xl font-display font-bold text-gray-800 mb-6 text-center">피부 균형 보고서</h3>

        <div className="space-y-6">
          {/* Hydration */}
          <div>
            <div className="flex justify-between mb-2">
              <span className={`font-bold text-xs ${!traits.isOily ? 'text-clony-primary' : 'text-gray-300'}`}>DRY (건성)</span>
              <span className={`font-bold text-xs ${traits.isOily ? 'text-clony-primary' : 'text-gray-300'}`}>OILY (지성)</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
              <div className={`absolute top-0 bottom-0 w-1/2 bg-clony-primary rounded-full ${traits.isOily ? 'right-0' : 'left-0'}`} />
            </div>
          </div>

          {/* Sensitivity */}
          <div>
            <div className="flex justify-between mb-2">
              <span className={`font-bold text-xs ${!traits.isSensitive ? 'text-clony-primary' : 'text-gray-300'}`}>RESISTANT (저항성)</span>
              <span className={`font-bold text-xs ${traits.isSensitive ? 'text-clony-primary' : 'text-gray-300'}`}>SENSITIVE (민감)</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
              <div className={`absolute top-0 bottom-0 w-1/2 bg-clony-primary rounded-full ${traits.isSensitive ? 'right-0' : 'left-0'}`} />
            </div>
          </div>

          {/* Pigmentation */}
          <div>
            <div className="flex justify-between mb-2">
              <span className={`font-bold text-xs ${!traits.isPigmented ? 'text-clony-primary' : 'text-gray-300'}`}>NON-PIGMENTED (비색소)</span>
              <span className={`font-bold text-xs ${traits.isPigmented ? 'text-clony-primary' : 'text-gray-300'}`}>PIGMENTED (색소)</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
              <div className={`absolute top-0 bottom-0 w-1/2 bg-clony-primary rounded-full ${traits.isPigmented ? 'right-0' : 'left-0'}`} />
            </div>
          </div>

          {/* Wrinkle */}
          <div>
            <div className="flex justify-between mb-2">
              <span className={`font-bold text-xs ${!traits.isWrinkled ? 'text-clony-primary' : 'text-gray-300'}`}>TIGHT (탄력)</span>
              <span className={`font-bold text-xs ${traits.isWrinkled ? 'text-clony-primary' : 'text-gray-300'}`}>WRINKLED (주름)</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
              <div className={`absolute top-0 bottom-0 w-1/2 bg-clony-primary rounded-full ${traits.isWrinkled ? 'right-0' : 'left-0'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h3 className="text-2xl font-display font-bold text-gray-800 mb-6">맞춤 솔루션 제품</h3>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {recommendedProducts.map((product, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center text-3xl shadow-sm">
                  🧴
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-block bg-clony-primary/10 px-2 py-0.5 rounded text-[10px] text-clony-primary font-bold mb-1">
                    {product.category}
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1 leading-tight">{product.name}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{product.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recommendedProducts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            해당 카테고리의 추천 제품이 없습니다.
          </div>
        )}
      </div>

      {/* Kit Purchase Section */}
      {onPurchase && (
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-8 shadow-lg border border-teal-100">
          <h3 className="text-2xl font-display font-bold text-gray-800 mb-2 text-center">맞춤 키트 구매하기</h3>
          <p className="text-gray-600 text-center mb-6">진단 결과에 맞춰 가장 효과적인 제품만 담았습니다</p>

          {/* Pricing Options */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
            {PRICING_OPTIONS.map((option) => (
              <button
                key={option.days}
                onClick={() => setSelectedDays(option.days)}
                className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-300 ${selectedDays === option.days
                  ? 'border-teal-500 bg-white shadow-lg shadow-teal-500/10 scale-105 z-10'
                  : 'border-white bg-white/50 hover:bg-white hover:border-gray-200'
                  }`}
              >
                {option.recommend && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    BEST
                  </div>
                )}
                <div className={`text-lg font-bold mb-1 ${selectedDays === option.days ? 'text-gray-900' : 'text-gray-400'}`}>
                  {option.label}
                </div>
                <div className={`text-sm font-bold ${selectedDays === option.days ? 'text-teal-600' : 'text-gray-400'}`}>
                  {option.price.toLocaleString()}원
                </div>
              </button>
            ))}
          </div>

          {/* Purchase Summary */}
          <div className="bg-white rounded-2xl p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">총 결제 금액</div>
                <div className="text-3xl font-black text-gray-900">
                  {selectedOption.price.toLocaleString()}<span className="text-xl font-medium text-gray-400">원</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-1">배송비 무료</div>
                <div className="text-xs text-teal-600 font-bold">오늘 출발 예정 🚀</div>
              </div>
            </div>

            <PulseButton
              onClick={handlePurchaseClick}
              className="w-full bg-black text-white text-xl font-bold py-5 rounded-2xl shadow-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              <span>맞춤 키트 구매하기</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </PulseButton>

            <p className="text-center text-xs text-gray-400 mt-3">
              * 챌린지 참여권이 포함된 가격입니다.
            </p>
          </div>
        </div>
      )}

      <div className="text-center pt-8">
        <Button onClick={onReset} variant="primary" className="px-12">다시 진단하기</Button>
      </div>
    </div>
  );
};
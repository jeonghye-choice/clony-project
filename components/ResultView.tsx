import React from 'react';
import { SkinAnalysisResult } from '../types';
import { Button } from './Button';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ResultViewProps {
  result: SkinAnalysisResult;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const scoreData = [
    { name: 'Score', value: result.score },
    { name: 'Remaining', value: 100 - result.score }
  ];
  const COLORS = ['#059669', '#E5E7EB']; // Emerald Primary and Gray

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
          <p className="text-gray-600 text-lg leading-relaxed break-keep">{result.summary}</p>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {result.concerns.map((concern, idx) => (
              <span key={idx} className="bg-red-50 text-red-500 px-3 py-1 rounded-lg text-sm font-semibold border border-red-100">
                {concern}
              </span>
            ))}
          </div>
        </div>
        
        <div className="w-48 h-48 relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={scoreData}
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{result.score}</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">피부 점수</span>
          </div>
        </div>
      </div>

      {/* Routine Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-display font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-clony-dark text-white flex items-center justify-center text-sm">1</span>
            데일리 루틴
          </h3>
          <div className="space-y-6">
            {result.routine.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="mt-1 w-2 h-2 rounded-full bg-clony-secondary group-hover:scale-150 transition-transform"></div>
                <div>
                  <h4 className="font-bold text-gray-800">{step.step} <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded ml-2">{step.timeOfDay}</span></h4>
                  <p className="text-gray-600 text-sm break-keep">{step.instruction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="space-y-4">
          <h3 className="text-2xl font-display font-bold text-gray-800 mb-6 flex items-center gap-2">
             <span className="w-8 h-8 rounded-full bg-clony-primary text-white flex items-center justify-center text-sm">2</span>
             맞춤 제품 추천
          </h3>
          {result.products.map((product, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-l-4 border-clony-primary flex gap-4">
               <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-4xl">
                  🧴
               </div>
               <div>
                 <h4 className="font-bold text-lg text-gray-900">{product.name}</h4>
                 <p className="text-clony-dark font-medium text-sm mb-1">{product.type} • {product.keyIngredient}</p>
                 <p className="text-gray-500 text-sm break-keep">{product.description}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-8">
        <Button onClick={onReset} variant="primary" className="px-12">다시 진단하기</Button>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { CameraCapture } from './CameraCapture';
import { analyzeSkinImage } from '../services/geminiService';
import { SkinAnalysisResult } from '../types';
import { Button } from './Button';

interface AnalysisViewProps {
  onResult: (result: SkinAnalysisResult) => void;
  onCancel: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ onResult, onCancel }) => {
  const [mode, setMode] = useState<'selection' | 'camera'>('selection');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingImage, setAnalyzingImage] = useState<string | null>(null);

  const handleImageAnalysis = async (imageData: string) => {
    setAnalyzingImage(imageData);
    setIsAnalyzing(true);
    try {
      const result = await analyzeSkinImage(imageData);
      onResult(result);
    } catch (e) {
      alert("분석에 실패했습니다. 다시 시도해주세요.");
      setIsAnalyzing(false);
      setAnalyzingImage(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleImageAnalysis(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isAnalyzing && analyzingImage) {
    return (
      <div className="relative w-full h-[100vh] bg-black overflow-hidden">
        <style>{`
            .container { position: relative; width: 100%; height: 100vh; }
            iframe { width: 100%; height: 100%; border: none; }
            .overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 320px;
                height: 650px;
                pointer-events: none;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #00ff88;
                font-family: 'Courier New', Courier, monospace;
                z-index: 20;
            }
            .face-frame {
                position: relative;
                width: 220px;
                height: 280px;
                border: 2px solid rgba(0, 255, 136, 0.3);
                border-radius: 40px;
            }
            .face-frame::before, .face-frame::after {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                border: 3px solid #00ff88;
            }
            .face-frame::before { top: -5px; left: -5px; border-right: 0; border-bottom: 0; }
            .face-frame::after { top: -5px; right: -5px; border-left: 0; border-bottom: 0; }
            .corner-bl { position: absolute; bottom: -5px; left: -5px; width: 20px; height: 20px; border: 3px solid #00ff88; border-right: 0; border-top: 0; }
            .corner-br { position: absolute; bottom: -5px; right: -5px; width: 20px; height: 20px; border: 3px solid #00ff88; border-left: 0; border-top: 0; }
            .analysis-data {
                position: absolute;
                bottom: 60px;
                left: 20px;
                font-size: 12px;
                text-shadow: 0 0 5px #00ff88;
            }
            .status {
                position: absolute;
                top: 50px;
                right: 20px;
                font-weight: bold;
                animation: blink 1s step-end infinite;
            }
            @keyframes blink { 50% { opacity: 0; } }
            .captured-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 45px;
                z-index: -1;
                opacity: 0.6;
                filter: grayscale(0.5);
            }
            .loading-radar {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100px;
                height: 100px;
                border: 4px solid rgba(0,255,136,0.1);
                border-top: 4px solid #00ff88;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        `}</style>

        <div className="container">
            <iframe src='https://my.spline.design/iphone14procopy-tQQrQHRL9R1ssvU0PNwghTWh/' frameBorder='0' width='100%' height='100%'></iframe>

            <div className="overlay">
                <img src={analyzingImage} alt="Analysis Target" className="captured-image" />
                
                <div className="status">● PROCESSING DATA...</div>
                
                <div className="face-frame">
                    <div className="loading-radar"></div>
                    <div className="corner-bl"></div>
                    <div className="corner-br"></div>
                </div>

                <div className="analysis-data">
                    <p>GEMINI_AI: CONNECTED</p>
                    <p>TEXTURE_MAP: GENERATING</p>
                    <p>DIAGNOSIS: PENDING...</p>
                </div>
            </div>
        </div>
      </div>
    );
  }

  if (mode === 'camera') {
    return <CameraCapture onCapture={handleImageAnalysis} onCancel={() => setMode('selection')} />;
  }

  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-auto shadow-xl border border-white/50 animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">피부 진단을 시작해볼까요?</h2>
        <p className="text-gray-700">카메라를 사용하거나 사진을 업로드하여 맞춤형 AI 분석을 받아보세요.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button 
          onClick={() => setMode('camera')}
          className="group flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-clony-primary"
        >
          <div className="w-20 h-20 bg-clony-primary/10 rounded-full flex items-center justify-center mb-4 text-clony-primary group-hover:bg-clony-primary group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </div>
          <span className="font-bold text-lg text-gray-800">사진 촬영</span>
        </button>

        <label className="cursor-pointer group flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-clony-dark">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <div className="w-20 h-20 bg-clony-dark/10 rounded-full flex items-center justify-center mb-4 text-clony-dark group-hover:bg-clony-dark group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <span className="font-bold text-lg text-gray-800">사진 업로드</span>
        </label>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={onCancel} variant="outline">홈으로 돌아가기</Button>
      </div>
    </div>
  );
};
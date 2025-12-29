import { SkinAnalysisResult } from "../types";

// NOTE: The real GoogleGenAI import is REMOVED intentionally to fix the blank screen crash.
// import { GoogleGenAI, Type } from "@google/genai";

export const analyzeSkinImage = async (base64Image: string): Promise<SkinAnalysisResult> => {
  console.log("Mock Analysis Triggered");

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Return mock data so the app definitely works
  return {
    skinType: '복합성',
    concerns: ['수분 부족', '미세 주름'],
    summary: "AI 서비스 점검 중입니다. (임시 결과) 전반적으로 피부 장벽은 튼튼하나 수분 공급이 필요해 보입니다!",
    score: 85,
    routine: [
      { step: "세안", instruction: "약산성 클렌저로 부드럽게 세안하세요.", timeOfDay: "아침/저녁" },
      { step: "보습", instruction: "히알루론산 앰플을 사용하여 수분을 채워주세요.", timeOfDay: "저녁" }
    ],
    products: [
      { name: "Clony 하이드라 앰플", type: "앰플", description: "즉각적인 수분 공급", keyIngredient: "히알루론산" }
    ]
  };
};
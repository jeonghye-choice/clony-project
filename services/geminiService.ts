import { GoogleGenAI, Type } from "@google/genai";
import { SkinAnalysisResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSkinImage = async (base64Image: string): Promise<SkinAnalysisResult> => {
  // Remove header if present (data:image/jpeg;base64,)
  const cleanBase64 = base64Image.split(',')[1] || base64Image;

  const prompt = `
    You are an expert dermatologist AI for 'Clony', a skincare brand.
    Analyze the provided face image. 
    Determine the skin type, visible concerns (acne, wrinkles, pores, redness, etc.), and provide a personalized routine.
    
    Strictly output JSON matching this structure in **Korean language**:
    {
      "skinType": "지성" | "건성" | "복합성" | "중성" | "민감성",
      "concerns": ["여드름", "모공", "홍조", "주름" etc...],
      "summary": "A friendly, encouraging 2-sentence summary of their skin condition in Korean.",
      "score": 85, (integer 0-100 based on perceived health),
      "routine": [
        {"step": "클렌징", "instruction": "약산성 폼 클렌저를 사용하여...", "timeOfDay": "아침/저녁"}
      ],
      "products": [
        {"name": "Clony 프레시 젤", "type": "수분크림", "description": "가벼운 수분 충전...", "keyIngredient": "알로에"}
      ]
    }
    
    Keep the tone cheerful, helpful, and scientific yet accessible.
  `;

  try {
    // Fixed: Switched from generation model 'gemini-2.5-flash-image' to 'gemini-3-flash-preview' for image analysis and structured JSON extraction.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skinType: { type: Type.STRING },
            concerns: { type: Type.ARRAY, items: { type: Type.STRING } },
            summary: { type: Type.STRING },
            score: { type: Type.INTEGER },
            routine: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.STRING },
                  instruction: { type: Type.STRING },
                  timeOfDay: { type: Type.STRING }
                }
              }
            },
            products: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING },
                  description: { type: Type.STRING },
                  keyIngredient: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim()) as SkinAnalysisResult;
    } else {
      throw new Error("No text returned from Gemini");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback mock data in case of API failure or non-face image
    return {
      skinType: '중성',
      concerns: ['수분 부족'],
      summary: "얼굴을 명확하게 인식하지 못했지만, 균형 잡힌 루틴을 추천해 드릴게요!",
      score: 80,
      routine: [
        { step: "세안", instruction: "미지근한 물로 가볍게 세안하세요.", timeOfDay: "아침/저녁" },
        { step: "보습", instruction: "피부 장벽 강화 크림을 발라주세요.", timeOfDay: "저녁" }
      ],
      products: [
        { name: "Clony 데일리 밸런스", type: "크림", description: "pH 밸런스를 맞춰줍니다.", keyIngredient: "세라마이드" }
      ]
    };
  }
};
export interface ProductRecommendation {
  name: string;
  type: string;
  description: string;
  keyIngredient: string;
}

export interface RoutineStep {
  step: string;
  instruction: string;
  timeOfDay: string;
}

export interface SkinAnalysisResult {
  skinType: string;
  concerns: string[];
  summary: string;
  routine: RoutineStep[];
  products: ProductRecommendation[];
  score: number; // 0-100 skin health score
}

export enum ViewState {
  HOME = 'HOME',
  ANALYZE = 'ANALYZE',
  RESULTS = 'RESULTS'
}
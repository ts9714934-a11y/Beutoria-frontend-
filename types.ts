export interface Score {
  name: string;
  value: number;
  category: 'Symmetry & Harmony' | 'Skin Health' | 'Key Features';
}

export interface EnhancementSolution {
  title: string;
  description: string;
}

export interface Enhancement {
  area: string;
  problem: string;
  solutions: EnhancementSolution[];
}

export interface AnalysisResult {
  overallScore: number;
  scores: Score[];
  enhancements: Enhancement[];
  summary: string;
}
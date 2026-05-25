
export interface UserProfile {
  height: number;
  weight?: number;
  level: 'iniciante' | 'intermediario' | 'avancado';
  terrain: 'lazer_urbano' | 'mobilidade' | 'mtb_recreativo' | 'mtb_intermediario' | 'mtb_pesado' | 'estrada' | 'gravel' | 'bmx';
  frequency: 'fds' | '3x_semana' | 'diario';
  budget: 'ate_1500' | 'ate_3000' | '3000_5000' | '5000_10000' | 'acima_10000';
}

export interface RecommendationLink {
  label: string;
  url: string;
}

export interface RecommendationOption {
  // Added 'Entrada', 'Ideal', 'Pro' categories to match model output and UI logic, fixing comparison errors.
  // Included 'string' to allow flexibility with AI-generated labels and prevent strict narrowing overlap issues.
  category: 'Economica' | 'CustoBeneficio' | 'Avancada' | 'Entrada' | 'Ideal' | 'Pro' | string;
  brand: string;
  model: string;
  priceRange: string;
  description: string;
  highlights: string[];
}

export interface IdealSpecs {
  type: string;
  frameSize: string;
  transmission: string;
  brakes: string;
  suspension: string;
  wheelsTires: string;
}

export interface RecommendationResponse {
  summary: string;
  profileAnalysis: string;
  idealSpecs: IdealSpecs;
  options: RecommendationOption[];
  upgrades: string[];
  accessories: string[];
  maintenanceTips: string[];
  nextSteps?: string[];
  searchSources?: { title: string; uri: string }[];
}

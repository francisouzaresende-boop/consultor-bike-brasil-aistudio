import { UserProfile, RecommendationResponse } from "../types";

export const getBikeRecommendation = async (profile: UserProfile): Promise<RecommendationResponse> => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Erro de resposta do servidor (${response.status})`);
    }

    const data = await response.json();
    return data as RecommendationResponse;
  } catch (error) {
    console.error("Erro ao obter recomendações:", error);
    throw error;
  }
};

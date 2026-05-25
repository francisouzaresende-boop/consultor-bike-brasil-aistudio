import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

export default async function handler(req: any, res: any) {
  // Allow elements via post only
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const profile = req.body as UserProfile;
    if (!profile || !profile.height) {
      return res.status(400).json({ error: "Ficha do ciclista inválida ou incompleta." });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.error("Erro: Nenhuma chave de API do Gemini foi encontrada.");
      return res.status(500).json({ 
        error: "A chave API do Gemini não está configurada no servidor. Por favor, adicione GEMINI_API_KEY." 
      });
    }

    const ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    const model = "gemini-3.5-flash";

    const systemInstruction = `
      Você é o maior especialista em bicicletas do Brasil. Responda de forma INSTANTÂNEA.
      OBJETIVO: Recomendar 3 modelos de bikes (Entrada, Ideal, Pro) baseando-se no seu vasto conhecimento do mercado brasileiro.
      
      DIRETRIZES DE VELOCIDADE:
      1. NÃO utilize ferramentas de busca externa.
      2. Responda apenas com modelos consolidados e conhecidos no Brasil (ex: Oggi, Soul, Sense, Caloi, Specialized, Trek).
      3. NÃO inclua links de sites externos.
      4. Mantenha os diferenciais: Upgrades, Kit Essencial e Manutenção.
      5. Geometria ideal para ciclista de ${profile.height}cm.
      
      FORMATO: JSON puro.
    `;

    const userPrompt = `
      Recomende 3 bikes para: Altura ${profile.height}cm, Nivel ${profile.level}, Terreno ${profile.terrain}, Orçamento ${profile.budget}.
      Gere JSON com: summary, profileAnalysis, idealSpecs, options (NÃO incluir links), upgrades, accessories, maintenanceTips.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            profileAnalysis: { type: Type.STRING },
            idealSpecs: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                frameSize: { type: Type.STRING },
                transmission: { type: Type.STRING },
                brakes: { type: Type.STRING },
                suspension: { type: Type.STRING },
                wheelsTires: { type: Type.STRING },
              },
              required: ["type", "frameSize", "transmission", "brakes", "suspension", "wheelsTires"]
            },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  brand: { type: Type.STRING },
                  model: { type: Type.STRING },
                  priceRange: { type: Type.STRING },
                  description: { type: Type.STRING },
                  highlights: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            },
            upgrades: { type: Type.ARRAY, items: { type: Type.STRING } },
            accessories: { type: Type.ARRAY, items: { type: Type.STRING } },
            maintenanceTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["summary", "profileAnalysis", "idealSpecs", "options", "upgrades", "accessories", "maintenanceTips"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Sem resposta do modelo Gemini");
    }
    return res.status(200).json(JSON.parse(text));
  } catch (error: any) {
    console.error("Erro na API do Gemini:", error);
    return res.status(500).json({ error: error.message || "Erro ao gerar recomendação" });
  }
}

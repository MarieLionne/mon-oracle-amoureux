// Fonction serveur Vercel : interroge Gemini sans jamais exposer la clé au navigateur.
// La clé se règle dans Vercel → Settings → Environment Variables → GEMINI_API_KEY.
import { GoogleGenAI, Type } from "@google/genai";
import { ORACLE_CARDS } from "../constants";

const SYSTEM_INSTRUCTION = `
Tu es le "Grand Oracle de l'Éveil Amoureux". Ton ton est poétique, mystique, bienveillant, et profondément réconfortant.
Tu interprètes une carte tirée d'un oracle de 88 cartes pour un utilisateur qui cherche des réponses sur sa vie amoureuse.
Ta mission est de guider, de soigner les cœurs et d'offrir une vision spirituelle des énergies.
Même pour les cartes d' "Ombre", reste constructif et propose un chemin de guérison.
Réponds TOUJOURS en JSON selon le format demandé.
`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: "GEMINI_API_KEY manquante sur Vercel" }, 500);

  let cardId: unknown;
  let question: unknown;
  try {
    ({ cardId, question } = await request.json());
  } catch {
    return json({ error: "Requête invalide" }, 400);
  }

  const card = ORACLE_CARDS.find((c) => c.id === Number(cardId));
  if (!card) return json({ error: "Carte inconnue" }, 400);

  const userQuestion =
    typeof question === "string" && question.trim()
      ? question.trim().slice(0, 500)
      : "Quelle est l'énergie de mon cœur aujourd'hui ?";

  const prompt = `
L'utilisateur a tiré la carte suivante : "${card.name}" (Catégorie: ${card.category}).
Description courte : ${card.description}
Question de l'utilisateur : ${userQuestion}

Fournis une lecture approfondie incluant :
1. Une interprétation poétique du message de la carte (3-4 phrases).
2. Un conseil pratique et spirituel pour avancer.
3. Un ressenti sur "l'énergie" actuelle (ex: Fluide, Stagnante, En feu, Douce...).
`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interpretation: { type: Type.STRING },
            advice: { type: Type.STRING },
            energy: { type: Type.STRING },
          },
          required: ["interpretation", "advice", "energy"],
        },
      },
    });
    const result = JSON.parse(response.text ?? "{}");
    return json({
      interpretation: result.interpretation,
      advice: result.advice,
      energy: result.energy,
    });
  } catch (error) {
    console.error("Erreur Gemini :", error);
    return json({ error: "L'oracle n'a pas pu répondre" }, 502);
  }
}

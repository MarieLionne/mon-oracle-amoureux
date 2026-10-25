import { OracleCard, Reading } from "../types";

// Le navigateur n'appelle plus Gemini directement : il passe par la fonction
// serveur /api/oracle, qui garde la clé secrète côté Vercel.
export async function getOracleReading(card: OracleCard, userQuestion: string = ""): Promise<Reading> {
  try {
    const res = await fetch("/api/oracle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: card.id, question: userQuestion }),
    });
    if (!res.ok) throw new Error(`Réponse ${res.status}`);
    const result = await res.json();

    return {
      card,
      interpretation: result.interpretation,
      advice: result.advice,
      energy: result.energy,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("Erreur de l'oracle :", error);
    return {
      card,
      interpretation: "L'univers murmure une vérité que les mots peinent à saisir. Prenez un instant pour écouter le silence de votre cœur.",
      advice: "Faites confiance à votre intuition première.",
      energy: "Mystérieuse",
      timestamp: new Date(),
    };
  }
}

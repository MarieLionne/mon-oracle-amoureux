// Fonction serveur Vercel : reçoit la question d'un tirage personnalisé
// et l'envoie par e-mail à Marie Lionne via Brevo.
// À régler dans Vercel → Settings → Environment Variables :
//   BREVO_API_KEY   : la clé API Brevo
//   EMAIL_RECEPTION : l'adresse où recevoir les questions (doit être un expéditeur validé dans Brevo)

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_VALIDE = /^\d{4}-\d{2}-\d{2}$/;

const nouvelleReference = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

const formaterDate = (iso: string) => {
  const [a, m, j] = iso.split("-");
  return `${j}/${m}/${a}`;
};

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.BREVO_API_KEY;
  const reception = process.env.EMAIL_RECEPTION;
  if (!apiKey || !reception) {
    return json({ error: "Envoi des questions non configuré" }, 503);
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Requête invalide" }, 400);
  }

  const question = typeof data.question === "string" ? data.question.trim() : "";
  const naissance = typeof data.naissance === "string" ? data.naissance.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const prenom = typeof data.prenom === "string" ? data.prenom.trim().slice(0, 80) : "";

  if (question.length < 5 || question.length > 1500) {
    return json({ error: "Merci d'écrire votre question (1500 caractères maximum)." }, 400);
  }
  if (!DATE_VALIDE.test(naissance)) {
    return json({ error: "Merci d'indiquer votre date de naissance." }, 400);
  }
  if (!EMAIL_VALIDE.test(email) || email.length > 200) {
    return json({ error: "Merci d'indiquer une adresse e-mail valide." }, 400);
  }

  const reference = nouvelleReference();
  const texte = [
    `Nouvelle demande de tirage personnalisé — référence ${reference}`,
    "",
    `Prénom : ${prenom || "(non indiqué)"}`,
    `E-mail : ${email}`,
    `Date de naissance : ${formaterDate(naissance)}`,
    "",
    "Question :",
    question,
    "",
    "⚠️ Vérifiez dans Stripe qu'un paiement de 11 € a bien été reçu avec cette adresse e-mail avant de répondre.",
    "Pour répondre, utilisez simplement « Répondre » : la réponse partira vers la cliente.",
  ].join("\n");

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: reception, name: "Mon Oracle Amoureux" },
        to: [{ email: reception }],
        replyTo: { email, name: prenom || email },
        subject: `🔮 Nouvelle question (${reference}) — ${prenom || email}`,
        textContent: texte,
      }),
    });
    if (!res.ok) {
      console.error("Erreur Brevo :", res.status, await res.text());
      return json({ error: "La question n'a pas pu être envoyée, réessayez dans un instant." }, 502);
    }
  } catch (error) {
    console.error("Erreur Brevo :", error);
    return json({ error: "La question n'a pas pu être envoyée, réessayez dans un instant." }, 502);
  }

  return json({ reference });
}

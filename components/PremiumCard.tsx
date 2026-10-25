import React, { useState } from 'react';
import { Feather, Loader2 } from 'lucide-react';
import { TIRAGE_PREMIUM } from '../constants';

// Encart « Tirage personnalisé » : la personne écrit sa question,
// Marie Lionne la reçoit par e-mail, puis la personne est envoyée vers le paiement Stripe.
const PremiumCard: React.FC = () => {
  const [ouvert, setOuvert] = useState(false);
  const [prenom, setPrenom] = useState('');
  const [question, setQuestion] = useState('');
  const [naissance, setNaissance] = useState('');
  const [email, setEmail] = useState('');
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState('');

  if (!TIRAGE_PREMIUM.actif || !TIRAGE_PREMIUM.lienPaiement) return null;

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setEnvoi(true);
    try {
      const res = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, question, naissance, email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Une erreur s'est produite, réessayez.");

      const url = new URL(TIRAGE_PREMIUM.lienPaiement);
      url.searchParams.set('prefilled_email', email);
      url.searchParams.set('client_reference_id', data.reference);
      url.searchParams.set('locale', 'fr');
      window.location.href = url.toString();
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Une erreur s'est produite, réessayez.");
      setEnvoi(false);
    }
  };

  const champ =
    'w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-base md:text-lg outline-none focus:border-fuchsia-500/50 transition-all font-serif text-white placeholder:text-white/30';

  return (
    <div className="w-full p-8 rounded-[40px] bg-gradient-to-br from-fuchsia-600/20 via-rose-500/10 to-amber-300/10 border border-fuchsia-400/30 backdrop-blur-xl shadow-[0_0_60px_rgba(255,0,127,0.15)] space-y-5 text-center">
      <div className="flex items-center justify-center gap-3">
        <Feather className="w-5 h-5 text-amber-200" />
        <h3 className="font-decorative text-xl md:text-2xl text-white">Tirage personnalisé</h3>
      </div>
      <p className="font-serif text-lg md:text-xl text-white/80 italic leading-relaxed">
        Posez votre question à Marie Lionne et recevez une réponse écrite, rien que pour vous, sous {TIRAGE_PREMIUM.delai}.
      </p>

      {!ouvert ? (
        <button
          onClick={() => setOuvert(true)}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white font-decorative font-black text-sm uppercase tracking-[0.15em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,0,127,0.4)]"
        >
          Poser ma question — {TIRAGE_PREMIUM.prix}
        </button>
      ) : (
        <form onSubmit={envoyer} className="space-y-4 text-left">
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Votre prénom"
            maxLength={80}
            className={champ}
          />
          <textarea
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Posez-moi votre question ici…"
            minLength={5}
            maxLength={1500}
            rows={5}
            className={`${champ} resize-none italic`}
          />
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-fuchsia-200/80 font-decorative">Votre date de naissance</span>
            <input
              required
              type="date"
              value={naissance}
              onChange={(e) => setNaissance(e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
              className={`${champ} [color-scheme:dark]`}
            />
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre e-mail (pour recevoir la réponse)"
            className={champ}
          />

          {erreur && <p className="text-rose-300 text-sm text-center">{erreur}</p>}

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={envoi}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white font-decorative font-black text-sm uppercase tracking-[0.15em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,0,127,0.4)] disabled:opacity-60 disabled:hover:scale-100"
            >
              {envoi && <Loader2 className="w-4 h-4 animate-spin" />}
              {envoi ? 'Envoi…' : `Envoyer et payer ${TIRAGE_PREMIUM.prix}`}
            </button>
          </div>
          <p className="text-[11px] text-white/40 text-center leading-relaxed">
            Vous serez redirigé·e vers le paiement sécurisé Stripe. Vos informations servent uniquement à répondre à votre question.
          </p>
        </form>
      )}

      <p className="text-[10px] text-white/30 uppercase tracking-widest">
        Tirage proposé à titre de divertissement et de développement personnel
      </p>
    </div>
  );
};

export default PremiumCard;

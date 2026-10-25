import React from 'react';
import { Feather } from 'lucide-react';
import { TIRAGE_PREMIUM } from '../constants';

// Encart « Tirage personnalisé ». Il reste invisible tant que
// TIRAGE_PREMIUM.lienPaiement (dans constants.ts) est vide.
const PremiumCard: React.FC = () => {
  if (!TIRAGE_PREMIUM.lienPaiement) return null;

  return (
    <div className="w-full p-8 rounded-[40px] bg-gradient-to-br from-fuchsia-600/20 via-rose-500/10 to-amber-300/10 border border-fuchsia-400/30 backdrop-blur-xl shadow-[0_0_60px_rgba(255,0,127,0.15)] space-y-5 text-center">
      <div className="flex items-center justify-center gap-3">
        <Feather className="w-5 h-5 text-amber-200" />
        <h3 className="font-decorative text-xl md:text-2xl text-white">Tirage personnalisé</h3>
      </div>
      <p className="font-serif text-lg md:text-xl text-white/80 italic leading-relaxed">
        Posez votre question à Marie Lionne et recevez une réponse écrite, rien que pour vous, sous {TIRAGE_PREMIUM.delai}.
      </p>
      <a
        href={TIRAGE_PREMIUM.lienPaiement}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white font-decorative font-black text-sm uppercase tracking-[0.15em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,0,127,0.4)]"
      >
        Poser ma question — {TIRAGE_PREMIUM.prix}
      </a>
      <p className="text-[10px] text-white/30 uppercase tracking-widest">
        Paiement sécurisé · Tirage proposé à titre de divertissement et de développement personnel
      </p>
    </div>
  );
};

export default PremiumCard;

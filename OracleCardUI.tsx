
import React from 'react';
import { OracleCard } from '../types';
import { Heart, Sparkles, Moon, Sun, Map } from 'lucide-react';

interface OracleCardUIProps {
  card: OracleCard;
  isFlipped: boolean;
  onClick?: () => void;
}

const OracleCardUI: React.FC<OracleCardUIProps> = ({ card, isFlipped, onClick }) => {
  const getCategoryIcon = () => {
    switch (card.category) {
      case 'Lumière': return <Sun className="w-24 h-24 text-yellow-300 drop-shadow-[0_0_40px_rgba(253,224,71,1)]" />;
      case 'Ombre': return <Moon className="w-24 h-24 text-fuchsia-300 drop-shadow-[0_0_40px_rgba(216,180,254,1)]" />;
      case 'Chemin': return <Map className="w-24 h-24 text-cyan-300 drop-shadow-[0_0_40px_rgba(103,232,249,1)]" />;
      case 'Émotion': return <Heart className="w-24 h-24 text-rose-400 drop-shadow-[0_0_40px_rgba(251,113,133,1)] fill-current" />;
      default: return <Sparkles className="w-24 h-24 text-white" />;
    }
  };

  const getCategoryStyles = () => {
    switch (card.category) {
      case 'Lumière': return 'from-yellow-400 via-amber-500 to-orange-700 border-white/40 shadow-[0_0_100px_rgba(251,191,36,0.6)]';
      case 'Ombre': return 'from-fuchsia-500 via-purple-800 to-indigo-950 border-white/40 shadow-[0_0_100px_rgba(192,38,211,0.6)]';
      case 'Chemin': return 'from-cyan-400 via-blue-700 to-teal-950 border-white/40 shadow-[0_0_100px_rgba(34,211,238,0.6)]';
      case 'Émotion': return 'from-rose-400 via-pink-600 to-fuchsia-950 border-white/40 shadow-[0_0_100px_rgba(244,63,94,0.6)]';
      default: return 'from-gray-700 to-gray-900 border-gray-500';
    }
  };

  return (
    <div 
      className="relative w-full h-[550px] md:h-[720px] cursor-pointer group perspective-2000"
      onClick={onClick}
    >
      <div className={`card-inner w-full h-full relative ${isFlipped ? 'card-flipped' : ''}`}>
        
        {/* Dos de la carte */}
        <div className="card-face w-full h-full rounded-[60px] border-[8px] border-white/10 bg-gradient-to-br from-[#12041a] via-[#320c4a] to-[#050206] flex items-center justify-center p-8 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40"></div>
          
          <div className="absolute w-[120%] h-[120%] bg-fuchsia-600/20 blur-[130px] rounded-full animate-pulse"></div>
          
          <div className="relative z-10 w-full h-full border-2 border-white/10 rounded-[50px] flex flex-col items-center justify-center space-y-16 bg-black/50 backdrop-blur-2xl">
            <div className="relative">
              <div className="absolute -inset-12 blur-[60px] bg-fuchsia-500/50 rounded-full scale-150 animate-pulse"></div>
              <div className="w-40 h-40 rounded-full border-4 border-white/20 flex items-center justify-center relative bg-black/90 shadow-[0_0_60px_rgba(255,0,127,0.5)]">
                 <Heart className="w-20 h-20 text-fuchsia-400 fill-current animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="font-decorative text-amber-100 text-4xl tracking-[0.4em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">Mon Oracle</p>
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent mx-auto"></div>
              <p className="font-serif italic text-white/40 text-lg tracking-[0.6em] uppercase">Amoureux</p>
            </div>
          </div>
        </div>

        {/* Face Révélée */}
        <div className={`card-face card-back w-full h-full rounded-[60px] border-[8px] bg-gradient-to-br ${getCategoryStyles()} flex flex-col items-center justify-between p-16 text-center backdrop-blur-sm overflow-hidden`}>
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-white/30 via-transparent to-transparent rotate-45 pointer-events-none"></div>
          
          <div className="w-full flex justify-center z-10 scale-150 mt-4 mb-4">
            {getCategoryIcon()}
          </div>
          
          <div className="space-y-10 z-10">
            <h3 className="font-decorative text-5xl md:text-6xl text-white tracking-widest uppercase leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              {card.name}
            </h3>
            <div className="w-32 h-3 bg-white/80 mx-auto rounded-full shadow-[0_0_30px_rgba(255,255,255,0.8)]"></div>
            <p className="font-serif italic text-3xl md:text-4xl text-white leading-relaxed drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] px-10">
              "{card.description}"
            </p>
          </div>

          <div className="z-10 bg-black/80 backdrop-blur-3xl px-14 py-6 rounded-full border border-white/30 text-[14px] font-decorative tracking-[0.6em] text-white uppercase font-black shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            {card.category} — {card.id}/88
          </div>
        </div>
      </div>
    </div>
  );
};

export default OracleCardUI;

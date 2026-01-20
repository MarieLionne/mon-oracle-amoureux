
import React, { useState, useEffect } from 'react';
import { Sparkles, History, ArrowLeft, Heart, Zap, Star } from 'lucide-react';
import { ORACLE_CARDS } from './constants';
import { OracleCard, Reading, AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [history, setHistory] = useState<Reading[]>([]);
  const [currentReading, setCurrentReading] = useState<Reading | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const drawCard = async (card: OracleCard) => {
    setIsLoading(true);
    setAppState(AppState.READING);
    setIsFlipped(false);
    
    try {
      const reading = await getOracleReading(card, userQuestion);
      setCurrentReading(reading);
      setHistory(prev => [reading, ...prev]);
    } catch (error) {
      console.error("Erreur de tirage:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsFlipped(true), 800);
    }
  };

  const handleRandomDraw = () => {
    const randomCard = ORACLE_CARDS[Math.floor(Math.random() * ORACLE_CARDS.length)];
    drawCard(randomCard);
  };

  const reset = () => {
    setAppState(AppState.LANDING);
    setCurrentReading(null);
    setIsFlipped(false);
    setUserQuestion("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col text-white selection:bg-fuchsia-500/40 bg-[#050206]">
      {/* Fond Dynamique Magique */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-fuchsia-800/20 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-cyan-800/15 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-8 py-6 flex justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={reset}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-rose-500 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,127,0.4)] transition-transform group-hover:scale-110">
            <Heart className="w-7 h-7 text-white fill-current animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-decorative text-xl md:text-2xl tracking-tighter text-white">Mon Oracle Amoureux</h1>
            <span className="text-[8px] uppercase tracking-[0.6em] text-fuchsia-400 font-bold">Guidance & Lumière</span>
          </div>
        </div>
        
        <button onClick={() => setAppState(AppState.HISTORY)} className="p-2 text-white/60 hover:text-white transition-colors">
          <History className="w-6 h-6" />
        </button>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col container mx-auto px-6 py-10">
        
        {appState === AppState.LANDING && (
          <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {/* Badge Pulsant du Cœur */}
            <div className="group relative">
               <div className="absolute -inset-4 bg-fuchsia-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
               <div className="relative px-8 py-3 bg-black/40 border border-white/10 rounded-full flex items-center gap-4 backdrop-blur-xl border-fuchsia-500/30">
                  <div className="w-3 h-3 bg-fuchsia-500 rounded-full animate-ping"></div>
                  <span className="text-[10px] font-decorative uppercase tracking-[0.3em] text-fuchsia-200">L'énergie du moment : L'Amour Pur</span>
                  <Heart className="w-4 h-4 text-rose-500 fill-current animate-pulse" />
               </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-decorative text-5xl md:text-8xl font-black leading-tight tracking-tight">
                Votre destin <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-rose-300 to-amber-200">s'illumine</span>
              </h2>
              <p className="font-serif text-xl md:text-3xl text-white/70 italic max-w-2xl mx-auto font-light leading-relaxed">
                "Une question, une carte, un avenir. Laissez les 88 secrets de l'oracle vous guider avec tendresse."
              </p>
            </div>

            <div className="w-full max-w-2xl space-y-10">
              <input 
                type="text" 
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Quelle question porte votre cœur ?"
                className="w-full bg-white/5 border border-white/10 rounded-[30px] px-8 py-6 text-lg md:text-xl outline-none focus:border-fuchsia-500/50 transition-all text-center shadow-2xl backdrop-blur-md italic font-serif"
              />

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <button 
                  onClick={handleRandomDraw} 
                  disabled={isLoading} 
                  className="group relative px-10 py-5 bg-white text-black font-decorative font-black text-lg rounded-full hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95 hover-vibrate"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isLoading ? 'Consultation...' : 'Tirage du Destin'}
                    <Zap className="w-5 h-5 fill-current" />
                  </span>
                </button>
                
                <button 
                  onClick={handleRandomDraw} 
                  className="px-10 py-5 bg-fuchsia-600/20 border border-fuchsia-500/30 text-fuchsia-100 font-decorative font-bold text-base rounded-full hover:bg-fuchsia-500/40 transition-all flex items-center gap-3 backdrop-blur-md hover-vibrate"
                >
                   Message Express
                   <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Écran de Lecture */}
        {appState === AppState.READING && currentReading && (
          <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-10 animate-in fade-in zoom-in duration-700">
            <div className="w-full max-w-[320px] md:max-w-md shrink-0 animate-float">
              <OracleCardUI card={currentReading.card} isFlipped={isFlipped} />
            </div>
            
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Star className="w-4 h-4 text-fuchsia-400 fill-current" />
                    <span className="text-fuchsia-400 font-decorative text-xs tracking-[0.5em] uppercase font-bold">Révélation Divine</span>
                </div>
                <h2 className="font-decorative text-4xl md:text-7xl text-white uppercase drop-shadow-lg">{currentReading.card.name}</h2>
                <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs font-decorative">
                   Énergie : <span className="text-white font-black uppercase tracking-widest">{currentReading.energy}</span>
                </div>
              </div>
              
              <p className="font-serif text-xl md:text-3xl text-white/90 leading-relaxed italic border-l-2 border-fuchsia-500/30 pl-6">
                "{currentReading.interpretation}"
              </p>
              
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-white/5 to-transparent border border-white/10 space-y-4 backdrop-blur-xl shadow-2xl">
                <h4 className="font-decorative text-amber-300 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 justify-center lg:justify-start">
                  <Zap className="w-3 h-3 fill-current" /> Le Conseil de l'Oracle
                </h4>
                <p className="text-lg md:text-xl text-white/80 font-serif leading-relaxed">
                  {currentReading.advice}
                </p>
              </div>

              <button onClick={reset} className="px-10 py-5 rounded-full bg-white text-black font-black font-decorative text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl">
                Nouveau Tirage
              </button>
            </div>
          </div>
        )}

        {/* Écran d'Historique */}
        {appState === AppState.HISTORY && (
          <div className="max-w-3xl mx-auto w-full space-y-10 animate-in fade-in slide-in-from-bottom-8">
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <h2 className="font-decorative text-3xl">Mémoires de l'Âme</h2>
              <button onClick={reset} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all"><ArrowLeft className="w-6 h-6" /></button>
            </div>
            <div className="grid gap-4">
              {history.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                    <p className="font-serif italic text-2xl text-white/40">Le livre de votre destin est encore vierge...</p>
                    <button onClick={reset} className="text-fuchsia-400 font-decorative text-xs uppercase tracking-widest hover:underline">Faire un premier tirage</button>
                </div>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer" onClick={() => { setCurrentReading(item); setAppState(AppState.READING); setIsFlipped(true); }}>
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center font-decorative text-fuchsia-400 border border-fuchsia-500/20">
                         {item.card.id}
                       </div>
                       <div>
                         <h3 className="font-decorative text-lg group-hover:text-fuchsia-300 transition-colors">{item.card.name}</h3>
                         <p className="text-[10px] text-white/30 uppercase tracking-widest">{new Date(item.timestamp).toLocaleDateString()}</p>
                       </div>
                    </div>
                    <ArrowLeft className="w-5 h-5 rotate-180 text-white/20 group-hover:text-white transition-all" />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer Décoratif */}
      <footer className="relative z-10 py-8 text-center border-t border-white/5">
        <p className="text-[9px] font-decorative uppercase tracking-[0.4em] text-white/20">
          Créé avec Amour & Lumière — 2024
        </p>
      </footer>
    </div>
  );
};

export default App;

import React from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles, Trophy, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
import { LEVEL_TITLES } from '../../data/gamification';

export const LevelUpModal: React.FC = () => {
  const { isLevelUpModalOpen, leveledUpTo, closeLevelUpModal, stats } = useGame();

  if (!isLevelUpModalOpen || leveledUpTo === null) return null;

  const currentTier = LEVEL_TITLES.find((t) => t.level === leveledUpTo) || {
    level: leveledUpTo,
    title: 'Mestre da Programação',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-indigo-500/50 shadow-2xl shadow-indigo-500/20 text-center space-y-6">
        
        {/* Glow Ring & Badge */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-amber-400 opacity-30 blur-xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center shadow-xl text-4xl">
            👑
          </div>
        </div>

        {/* Level Up Announcement */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Sparkles className="w-3.5 h-3.5" />
            Evolução de Nível!
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Nível {leveledUpTo} Desbloqueado!
          </h2>
          <p className="text-base font-semibold text-indigo-300">
            {currentTier.title}
          </p>
        </div>

        {/* Rewards Summary */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Gem className="w-5 h-5 fill-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Recompensa</p>
              <p className="text-sm font-bold text-cyan-300">+25 Gemas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Novo Título</p>
              <p className="text-sm font-bold text-indigo-300 truncate">Ativo</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Você está dominando novos conceitos e construindo uma base sólida de lógica e código.
        </p>

        {/* Action Button */}
        <button
          onClick={closeLevelUpModal}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/40 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <span>Continuar Minha Jornada</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

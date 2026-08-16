import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Flame, Gem, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { StreakModal } from '../modals/StreakModal';
import { ProfileModal } from '../modals/ProfileModal';

export const Navbar: React.FC = () => {
  const { stats, levelInfo, isSoundMuted, toggleSound, setView, currentView } = useGame();
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Brand Wordmark & Icon */}
          <button
            onClick={() => setView('landing')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-600/30 text-white font-black text-lg group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
              Code<span className="text-indigo-400">Quest</span>
            </span>
          </button>

          {/* Quick Header Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setView('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentView === 'dashboard'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setView('trail')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentView === 'trail'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              Trilha
            </button>
            <button
              onClick={() => setView('tracks')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentView === 'tracks'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              Linguagens
            </button>
            <button
              onClick={() => setView('challenges')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentView === 'challenges'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              Desafios
            </button>
            <button
              onClick={() => setView('achievements')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentView === 'achievements'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              Conquistas
            </button>
          </nav>

          {/* Gamification Stats Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Streak Counter Button */}
            <button
              onClick={() => setIsStreakModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold transition cursor-pointer"
              title="Sequência Diária de Estudos"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{stats.streak}</span>
              <span className="hidden sm:inline text-xs font-normal opacity-80">dias</span>
            </button>

            {/* Gems / Moedas */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold"
              title="Gemas Acumuladas"
            >
              <Gem className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>{stats.gems}</span>
            </div>

            {/* Level / XP Progress Pill */}
            <button
              onClick={() => setView('progress')}
              className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer"
              title="Progresso do Nível"
            >
              <div className="flex items-center gap-1 text-xs font-bold text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nvl {levelInfo.currentLevel}</span>
              </div>
              
              <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                {stats.xp} XP
              </span>
            </button>

            {/* Sound Mute Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isSoundMuted ? 'Ativar Efeitos Sonoros' : 'Desativar Sons'}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
              title={isSoundMuted ? 'Ativar Sons' : 'Silenciar'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* User Avatar Button */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/40 hover:border-indigo-400 flex items-center justify-center text-lg transition-transform hover:scale-105 cursor-pointer"
              title="Meu Perfil"
            >
              <span>{stats.avatar}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <StreakModal isOpen={isStreakModalOpen} onClose={() => setIsStreakModalOpen(false)} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </>
  );
};

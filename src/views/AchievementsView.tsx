import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Gift, 
  ShieldCheck, 
  Flame 
} from 'lucide-react';
import { sound } from '../utils/audio';

export const AchievementsView: React.FC = () => {
  const { achievements, stats, claimAchievement } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'progress', label: 'Progresso' },
    { id: 'streak', label: 'Consistência' },
    { id: 'challenges', label: 'Desafios' },
    { id: 'mastery', label: 'Maestria' },
  ];

  const filteredAchievements = achievements.filter((ach) => {
    if (selectedCategory !== 'all' && ach.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Header & Overall Trophy Tracker */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Trophy className="w-4 h-4" />
            Galeria de Conquistas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Insígnias e Marcos de Evolução
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Cada marco completado desbloqueia bônus permanentes de XP e registra seu progresso na jornada.
          </p>
        </div>

        {/* Global Trophy Meter */}
        <div className="w-full sm:w-56 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-center">
          <p className="text-xs text-slate-400">Total Desbloqueado</p>
          <p className="text-2xl font-black text-amber-300 font-mono">
            {unlockedCount} / {achievements.length}
          </p>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((ach) => {
          const isClaimed = stats.unlockedAchievementIds.includes(ach.id);
          const isClaimable = ach.isUnlocked && !isClaimed;

          return (
            <div
              key={ach.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-5 ${
                ach.isUnlocked
                  ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-900/40 border-slate-800/80 opacity-70'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${
                    ach.isUnlocked
                      ? 'bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 border border-amber-500/40'
                      : 'bg-slate-950 border border-slate-800 grayscale'
                  }`}>
                    {ach.icon}
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    ach.isUnlocked
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {ach.isUnlocked ? 'Desbloqueada' : 'Em Progresso'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                {/* Progress bar if in progress */}
                {!ach.isUnlocked && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Progresso</span>
                      <span className="font-mono">{ach.currentValue}/{ach.targetValue}</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all"
                        style={{ width: `${Math.min(100, (ach.currentValue / ach.targetValue) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom XP Bonus & Claim Action */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  +{ach.xpBonus} XP
                </span>

                {isClaimable ? (
                  <button
                    onClick={() => claimAchievement(ach.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Resgatar XP</span>
                  </button>
                ) : isClaimed ? (
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Resgatado
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    Bloqueada
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

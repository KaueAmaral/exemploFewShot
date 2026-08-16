import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  Play, 
  Sparkles, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Gift, 
  Swords, 
  Target,
  Clock
} from 'lucide-react';
import { STANDALONE_CHALLENGES } from '../data/gamification';

export const DashboardView: React.FC = () => {
  const { 
    stats, 
    levelInfo, 
    activeTrack, 
    dailyQuests, 
    claimQuest, 
    achievements, 
    setView, 
    startLesson, 
    startChallenge,
    getNextRecommendedLesson 
  } = useGame();

  const nextStep = getNextRecommendedLesson();
  const recentAchievements = achievements.filter((a) => a.isUnlocked).slice(0, 3);
  const featuredChallenge = STANDALONE_CHALLENGES[0];

  const totalLessonsInTrack = activeTrack.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedInTrack = activeTrack.modules.reduce((acc, m) => {
    return acc + m.lessons.filter((l) => stats.completedLessonIds.includes(l.id)).length;
  }, 0);
  const trackProgressPercent = Math.round((completedInTrack / Math.max(1, totalLessonsInTrack)) * 100);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Welcome Banner / User Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-4xl shadow-inner shrink-0">
            {stats.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Olá, {stats.userName}!
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Nível {levelInfo.currentLevel}
              </span>
            </div>
            <p className="text-sm font-medium text-indigo-400 mt-0.5">
              {levelInfo.title}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {stats.completedLessonIds.length} lições dominadas • {stats.xp} XP total
            </p>
          </div>
        </div>

        {/* Level XP Progress Meter */}
        <div className="w-full md:w-64 space-y-2 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Próximo Nível</span>
            <span className="font-mono text-indigo-300 font-bold">
              {levelInfo.currentLevelXp} / {levelInfo.nextLevelXp} XP
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 text-right font-medium">
            {levelInfo.nextLevelXp - levelInfo.currentLevelXp} XP para o Nível {levelInfo.currentLevel + 1}
          </p>
        </div>
      </div>

      {/* Hero: "O Que Fazer Agora?" Next Recommended Action */}
      {nextStep ? (
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Próxima Ação Recomendada
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Trilha {nextStep.track.name}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {nextStep.lesson.title}
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                {nextStep.lesson.summary}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  ~{nextStep.lesson.estimatedMinutes} minutos
                </span>
                <span className="flex items-center gap-1 font-mono text-amber-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  +{nextStep.lesson.xpReward} XP
                </span>
              </div>
            </div>

            <button
              onClick={() => startLesson(nextStep.lesson.id, nextStep.track.id)}
              className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-base shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition cursor-pointer hover:scale-[1.02] shrink-0"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Continuar Aprendizado</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Você concluiu todas as lições disponíveis!</h3>
          <p className="text-xs text-slate-300">Explore novas linguagens ou teste suas habilidades na Arena de Desafios.</p>
          <button
            onClick={() => setView('tracks')}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition cursor-pointer"
          >
            Explorar Novas Trilhas
          </button>
        </div>
      )}

      {/* Main Grid: Active Track vs Daily Quests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Active Track Overview & Arena Challenge */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Track Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeTrack.icon}</span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Trilha em Andamento</span>
                  <h3 className="text-lg font-bold text-white">{activeTrack.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setView('trail')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Trilha Completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{completedInTrack} de {totalLessonsInTrack} lições finalizadas</span>
                <span className="font-mono text-slate-200 font-bold">{trackProgressPercent}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${trackProgressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1 text-center">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Módulos</p>
                <p className="text-base font-bold text-white mt-0.5">{activeTrack.modulesCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">XP Disponível</p>
                <p className="text-base font-bold text-amber-300 font-mono mt-0.5">+{activeTrack.totalXp}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Nível</p>
                <p className="text-xs font-bold text-indigo-300 mt-1 truncate">{activeTrack.levelLabel}</p>
              </div>
            </div>
          </div>

          {/* Quick Arena Challenge Card */}
          {featuredChallenge && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {featuredChallenge.category}
                  </span>
                  <span className="text-xs text-amber-400 font-mono font-semibold">
                    +{featuredChallenge.xpReward} XP
                  </span>
                </div>
                <h4 className="text-base font-bold text-white truncate">
                  {featuredChallenge.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {featuredChallenge.description}
                </p>
              </div>

              <button
                onClick={() => {
                  startChallenge(featuredChallenge);
                  setView('challenges');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
              >
                <Swords className="w-4 h-4 text-indigo-400" />
                <span>Desafiar</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Col: Daily Quests & Achievements */}
        <div className="space-y-6">
          
          {/* Daily Quests Box */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Missões Diárias</h3>
              </div>
              <span className="text-xs text-slate-500">Reseta à meia-noite</span>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => {
                const isClaimable = quest.isCompleted && !quest.isClaimed;

                return (
                  <div
                    key={quest.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">{quest.title}</h4>
                        <p className="text-[11px] text-slate-400">{quest.description}</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-300">
                        +{quest.xpReward} XP
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, (quest.progress / quest.target) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {quest.progress}/{quest.target}
                      </span>
                    </div>

                    {isClaimable && (
                      <button
                        onClick={() => claimQuest(quest.id)}
                        className="w-full py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Coletar Recompensa</span>
                      </button>
                    )}

                    {quest.isClaimed && (
                      <div className="text-center text-[11px] font-semibold text-emerald-400">
                        ✓ Recompensa Coletada
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Conquistas</h3>
              </div>
              <button
                onClick={() => setView('achievements')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
              >
                Ver todas
              </button>
            </div>

            <div className="space-y-2.5">
              {recentAchievements.length > 0 ? (
                recentAchievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3"
                  >
                    <span className="text-2xl">{ach.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate">{ach.title}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{ach.description}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">
                      Desbloqueada
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic text-center py-2">
                  Complete lições para desbloquear seus primeiros troféus.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

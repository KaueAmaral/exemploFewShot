import React from 'react';
import { useGame } from '../context/GameContext';
import { TRACKS_DATA } from '../data/courses';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Sparkles, 
  Clock, 
  Layers, 
  ChevronRight,
  Compass,
  Trophy
} from 'lucide-react';
import { sound } from '../utils/audio';

export const LearningTrailView: React.FC = () => {
  const { activeTrack, selectTrack, startLesson, stats } = useGame();

  const handleStartLesson = (lessonId: string, isLocked: boolean) => {
    if (isLocked) {
      sound.playError();
      return;
    }
    startLesson(lessonId, activeTrack.id);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Header & Language Track Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3.5">
          <span className="text-4xl">{activeTrack.icon}</span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Trilha de Aprendizado
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {activeTrack.name}
            </h2>
          </div>
        </div>

        {/* Quick Language Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800">
          {TRACKS_DATA.map((track) => (
            <button
              key={track.id}
              onClick={() => selectTrack(track.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                track.id === activeTrack.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{track.icon}</span>
              <span className="hidden sm:inline">{track.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Modules Quest Trail */}
      <div className="space-y-8 relative">
        {activeTrack.modules.map((module, modIndex) => {
          const isPreviousModuleCompleted = modIndex === 0 || activeTrack.modules[modIndex - 1].lessons.every(
            (l) => stats.completedLessonIds.includes(l.id)
          );

          const moduleCompletedCount = module.lessons.filter((l) =>
            stats.completedLessonIds.includes(l.id)
          ).length;
          const isModuleFullyDone = moduleCompletedCount === module.lessons.length;

          return (
            <div
              key={module.id}
              className={`rounded-3xl border transition-all ${
                isPreviousModuleCompleted
                  ? 'bg-slate-900/70 border-slate-800'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              {/* Module Header Bar */}
              <div className="p-5 sm:p-6 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-indigo-300 border border-slate-700">
                      Módulo {module.order}
                    </span>
                    {isModuleFullyDone && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Concluído
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">{module.title}</h3>
                  <p className="text-xs text-slate-400">{module.description}</p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>{moduleCompletedCount}/{module.lessons.length} Lições</span>
                  <span className="text-amber-300 font-bold">+{module.xpReward} XP</span>
                </div>
              </div>

              {/* Module Lessons Trail Nodes */}
              <div className="p-5 sm:p-6 space-y-3.5">
                {module.lessons.map((lesson, lesIndex) => {
                  const isCompleted = stats.completedLessonIds.includes(lesson.id);
                  
                  // A lesson is unlocked if it's the first lesson or previous lesson was completed
                  const isUnlocked = isPreviousModuleCompleted && (
                    lesIndex === 0 || 
                    stats.completedLessonIds.includes(module.lessons[lesIndex - 1].id) ||
                    isCompleted
                  );

                  // Current active recommended step
                  const isCurrent = isUnlocked && !isCompleted;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleStartLesson(lesson.id, !isUnlocked)}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/10'
                          : isCompleted
                          ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/60'
                          : isUnlocked
                          ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-950/40 border-slate-900 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Node Icon */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-transform ${
                            isCompleted
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : isCurrent
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 animate-pulse'
                              : isUnlocked
                              ? 'bg-slate-800 text-slate-300 border border-slate-700'
                              : 'bg-slate-900 text-slate-600 border border-slate-800'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : isCurrent ? (
                            <Play className="w-4 h-4 fill-white" />
                          ) : isUnlocked ? (
                            <span>{lesson.order}</span>
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </div>

                        {/* Lesson Info */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-sm font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                              {lesson.title}
                            </h4>
                            {isCurrent && (
                              <span className="px-2 py-0.2 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                Próxima
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {lesson.summary}
                          </p>
                        </div>
                      </div>

                      {/* Right Meta & Button */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:flex flex-col items-end text-xs">
                          <span className="font-mono text-amber-300 font-bold">
                            +{lesson.xpReward} XP
                          </span>
                          <span className="text-[10px] text-slate-500">
                            ~{lesson.estimatedMinutes} min
                          </span>
                        </div>

                        <button
                          disabled={!isUnlocked}
                          className={`p-2 rounded-xl text-xs font-bold transition ${
                            isCurrent
                              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                              : isCompleted
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              : isUnlocked
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              : 'bg-slate-900 text-slate-700'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { STANDALONE_CHALLENGES } from '../data/gamification';
import { StandaloneChallenge } from '../types';
import { 
  Swords, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Play, 
  X, 
  Bug, 
  Code2, 
  Layers 
} from 'lucide-react';
import { MultipleChoiceExercise } from '../components/exercises/MultipleChoiceExercise';
import { FillInCodeExercise } from '../components/exercises/FillInCodeExercise';
import { FindBugExercise } from '../components/exercises/FindBugExercise';
import { OrderBlocksExercise } from '../components/exercises/OrderBlocksExercise';
import { CodeSandboxExercise } from '../components/exercises/CodeSandboxExercise';
import { TrueFalseExercise } from '../components/exercises/TrueFalseExercise';
import { sound } from '../utils/audio';

export const ChallengesView: React.FC = () => {
  const { stats, finishChallenge, selectedChallenge, startChallenge } = useGame();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeChallenge, setActiveChallenge] = useState<StandaloneChallenge | null>(selectedChallenge || null);

  const categories = ['all', 'Lógica', 'Sintaxe', 'Bugs', 'Algoritmos'];

  const filteredChallenges = STANDALONE_CHALLENGES.filter((ch) => {
    if (activeCategory !== 'all' && ch.category !== activeCategory) {
      return false;
    }
    return true;
  });

  const handleOpenChallenge = (challenge: StandaloneChallenge) => {
    sound.playClick();
    setActiveChallenge(challenge);
  };

  const handleCloseChallenge = () => {
    sound.playClick();
    setActiveChallenge(null);
  };

  const handleChallengeComplete = (isCorrect: boolean) => {
    if (isCorrect && activeChallenge) {
      finishChallenge(activeChallenge.id, activeChallenge.xpReward);
      setTimeout(() => {
        setActiveChallenge(null);
      }, 1200);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
          <Swords className="w-4 h-4" />
          Arena de Códigos
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Desafios Rápidos para Treinar o Cérebro
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Exercícios curtos e intensivos para fixar padrões, encontrar erros comuns e acelerar seu raciocínio lógico.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
              activeCategory === cat
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat === 'all' ? 'Todos os Desafios' : cat}
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((ch) => {
          const isDone = stats.completedChallengeIds.includes(ch.id);

          return (
            <div
              key={ch.id}
              onClick={() => handleOpenChallenge(ch)}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-5 cursor-pointer ${
                isDone
                  ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/60'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900 shadow-lg'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    ch.category === 'Bugs'
                      ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                      : ch.category === 'Algoritmos'
                      ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                      : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                  }`}>
                    {ch.category}
                  </span>

                  <span className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    +{ch.xpReward} XP
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {ch.title}
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {ch.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {ch.timeEstimate}
                </span>

                <button className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isDone
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30'
                }`}>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isDone ? 'Praticar Novamente' : 'Resolver'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal Runner */}
      {activeChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {activeChallenge.category}
                  </span>
                  <span className="text-xs font-mono text-amber-300 font-bold">
                    +{activeChallenge.xpReward} XP
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {activeChallenge.title}
                </h3>
              </div>

              <button
                onClick={handleCloseChallenge}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Exercise Dispatcher */}
            <div className="pt-2">
              {activeChallenge.exercise.type === 'multiple-choice' && activeChallenge.exercise.multipleChoice && (
                <MultipleChoiceExercise
                  data={activeChallenge.exercise.multipleChoice}
                  prompt={activeChallenge.exercise.prompt}
                  hints={activeChallenge.exercise.hints}
                  explanationOnSuccess={activeChallenge.exercise.explanationOnSuccess}
                  explanationOnError={activeChallenge.exercise.explanationOnError}
                  onComplete={handleChallengeComplete}
                />
              )}

              {activeChallenge.exercise.type === 'fill-in-code' && activeChallenge.exercise.fillInCode && (
                <FillInCodeExercise
                  data={activeChallenge.exercise.fillInCode}
                  prompt={activeChallenge.exercise.prompt}
                  hints={activeChallenge.exercise.hints}
                  explanationOnSuccess={activeChallenge.exercise.explanationOnSuccess}
                  explanationOnError={activeChallenge.exercise.explanationOnError}
                  onComplete={handleChallengeComplete}
                />
              )}

              {activeChallenge.exercise.type === 'find-bug' && activeChallenge.exercise.findBug && (
                <FindBugExercise
                  data={activeChallenge.exercise.findBug}
                  prompt={activeChallenge.exercise.prompt}
                  hints={activeChallenge.exercise.hints}
                  explanationOnSuccess={activeChallenge.exercise.explanationOnSuccess}
                  explanationOnError={activeChallenge.exercise.explanationOnError}
                  onComplete={handleChallengeComplete}
                />
              )}

              {activeChallenge.exercise.type === 'order-blocks' && activeChallenge.exercise.orderBlocks && (
                <OrderBlocksExercise
                  data={activeChallenge.exercise.orderBlocks}
                  prompt={activeChallenge.exercise.prompt}
                  hints={activeChallenge.exercise.hints}
                  explanationOnSuccess={activeChallenge.exercise.explanationOnSuccess}
                  explanationOnError={activeChallenge.exercise.explanationOnError}
                  onComplete={handleChallengeComplete}
                />
              )}

              {activeChallenge.exercise.type === 'code-sandbox' && activeChallenge.exercise.codeSandbox && (
                <CodeSandboxExercise
                  data={activeChallenge.exercise.codeSandbox}
                  prompt={activeChallenge.exercise.prompt}
                  hints={activeChallenge.exercise.hints}
                  explanationOnSuccess={activeChallenge.exercise.explanationOnSuccess}
                  explanationOnError={activeChallenge.exercise.explanationOnError}
                  onComplete={handleChallengeComplete}
                />
              )}

              {activeChallenge.exercise.type === 'true-false' && activeChallenge.exercise.trueFalse && (
                <TrueFalseExercise
                  data={activeChallenge.exercise.trueFalse}
                  prompt={activeChallenge.exercise.prompt}
                  hints={activeChallenge.exercise.hints}
                  explanationOnSuccess={activeChallenge.exercise.explanationOnSuccess}
                  explanationOnError={activeChallenge.exercise.explanationOnError}
                  onComplete={handleChallengeComplete}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

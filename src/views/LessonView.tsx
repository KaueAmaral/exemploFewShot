import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  Trophy,
  Flame,
  Check
} from 'lucide-react';
import { MultipleChoiceExercise } from '../components/exercises/MultipleChoiceExercise';
import { FillInCodeExercise } from '../components/exercises/FillInCodeExercise';
import { FindBugExercise } from '../components/exercises/FindBugExercise';
import { OrderBlocksExercise } from '../components/exercises/OrderBlocksExercise';
import { CodeSandboxExercise } from '../components/exercises/CodeSandboxExercise';
import { TrueFalseExercise } from '../components/exercises/TrueFalseExercise';
import { sound } from '../utils/audio';

export const LessonView: React.FC = () => {
  const { activeLesson, activeTrack, setView, finishLesson, startLesson } = useGame();
  
  // Step in lesson: 'concept' (learn & example) -> 'practice' (interactive exercise) -> 'completed'
  const [currentStage, setCurrentStage] = useState<'concept' | 'practice' | 'completed'>('concept');

  if (!activeLesson) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-slate-400">Nenhuma lição selecionada.</p>
        <button
          onClick={() => setView('trail')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm cursor-pointer"
        >
          Voltar para a Trilha
        </button>
      </div>
    );
  }

  // Find next lesson in track
  let nextLessonInTrack = null;
  for (let m = 0; m < activeTrack.modules.length; m++) {
    const mod = activeTrack.modules[m];
    const index = mod.lessons.findIndex((l) => l.id === activeLesson.id);
    if (index !== -1) {
      if (index + 1 < mod.lessons.length) {
        nextLessonInTrack = mod.lessons[index + 1];
      } else if (m + 1 < activeTrack.modules.length) {
        nextLessonInTrack = activeTrack.modules[m + 1].lessons[0];
      }
      break;
    }
  }

  const handleExerciseComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      finishLesson(activeLesson.id, activeLesson.xpReward);
      setCurrentStage('completed');
    }
  };

  const handleGoToNextLesson = () => {
    if (nextLessonInTrack) {
      setCurrentStage('concept');
      startLesson(nextLessonInTrack.id, activeTrack.id);
    } else {
      setView('trail');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <button
          onClick={() => setView('trail')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Voltar para a Trilha</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xl">{activeTrack.icon}</span>
          <div className="text-center">
            <h3 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-sm">
              {activeLesson.title}
            </h3>
            <p className="text-[10px] text-indigo-400 font-medium">
              {activeTrack.name} • Lição {activeLesson.order}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>+{activeLesson.xpReward} XP</span>
        </div>
      </div>

      {/* Stage Stepper Tabs */}
      <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
        <button
          disabled={currentStage === 'completed'}
          onClick={() => {
            sound.playClick();
            setCurrentStage('concept');
          }}
          className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            currentStage === 'concept'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Conceito & Exemplo</span>
        </button>

        <button
          disabled={currentStage === 'completed'}
          onClick={() => {
            sound.playClick();
            setCurrentStage('practice');
          }}
          className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            currentStage === 'practice' || currentStage === 'completed'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>2. Prática Interativa</span>
        </button>
      </div>

      {/* Stage 1: Concept & Syntax Example */}
      {currentStage === 'concept' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Concept Explanation Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 inline-block">
                O que você vai aprender
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {activeLesson.title}
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
              {activeLesson.conceptIntro.explanation.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Pontos-Chave
              </h4>
              <ul className="space-y-2">
                {activeLesson.conceptIntro.keyPoints.map((point, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Example Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl space-y-0">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">{activeLesson.codeExample.title}</span>
                </div>
                <span className="text-xs font-mono text-indigo-400 uppercase">
                  {activeLesson.codeExample.language}
                </span>
              </div>

              <div className="p-5 font-mono text-sm leading-relaxed text-slate-100 whitespace-pre-wrap overflow-x-auto bg-slate-950">
                {activeLesson.codeExample.code}
              </div>

              {activeLesson.codeExample.output && (
                <div className="px-5 py-3 bg-slate-900/90 border-t border-slate-800 font-mono text-xs text-emerald-400 flex items-start gap-2">
                  <span className="text-slate-500 select-none">&gt; Saída:</span>
                  <span className="whitespace-pre-wrap">{activeLesson.codeExample.output}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed italic">
              {activeLesson.codeExample.explanation}
            </p>

            {/* Next Step CTA */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentStage('practice');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition cursor-pointer"
              >
                <span>Fazer Exercício Prático</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: Interactive Exercise */}
      {currentStage === 'practice' && (
        <div className="animate-fadeIn">
          {activeLesson.exercise.type === 'multiple-choice' && activeLesson.exercise.multipleChoice && (
            <MultipleChoiceExercise
              data={activeLesson.exercise.multipleChoice}
              prompt={activeLesson.exercise.prompt}
              hints={activeLesson.exercise.hints}
              explanationOnSuccess={activeLesson.exercise.explanationOnSuccess}
              explanationOnError={activeLesson.exercise.explanationOnError}
              onComplete={handleExerciseComplete}
            />
          )}

          {activeLesson.exercise.type === 'fill-in-code' && activeLesson.exercise.fillInCode && (
            <FillInCodeExercise
              data={activeLesson.exercise.fillInCode}
              prompt={activeLesson.exercise.prompt}
              hints={activeLesson.exercise.hints}
              explanationOnSuccess={activeLesson.exercise.explanationOnSuccess}
              explanationOnError={activeLesson.exercise.explanationOnError}
              onComplete={handleExerciseComplete}
            />
          )}

          {activeLesson.exercise.type === 'find-bug' && activeLesson.exercise.findBug && (
            <FindBugExercise
              data={activeLesson.exercise.findBug}
              prompt={activeLesson.exercise.prompt}
              hints={activeLesson.exercise.hints}
              explanationOnSuccess={activeLesson.exercise.explanationOnSuccess}
              explanationOnError={activeLesson.exercise.explanationOnError}
              onComplete={handleExerciseComplete}
            />
          )}

          {activeLesson.exercise.type === 'order-blocks' && activeLesson.exercise.orderBlocks && (
            <OrderBlocksExercise
              data={activeLesson.exercise.orderBlocks}
              prompt={activeLesson.exercise.prompt}
              hints={activeLesson.exercise.hints}
              explanationOnSuccess={activeLesson.exercise.explanationOnSuccess}
              explanationOnError={activeLesson.exercise.explanationOnError}
              onComplete={handleExerciseComplete}
            />
          )}

          {activeLesson.exercise.type === 'code-sandbox' && activeLesson.exercise.codeSandbox && (
            <CodeSandboxExercise
              data={activeLesson.exercise.codeSandbox}
              prompt={activeLesson.exercise.prompt}
              hints={activeLesson.exercise.hints}
              explanationOnSuccess={activeLesson.exercise.explanationOnSuccess}
              explanationOnError={activeLesson.exercise.explanationOnError}
              onComplete={handleExerciseComplete}
            />
          )}

          {activeLesson.exercise.type === 'true-false' && activeLesson.exercise.trueFalse && (
            <TrueFalseExercise
              data={activeLesson.exercise.trueFalse}
              prompt={activeLesson.exercise.prompt}
              hints={activeLesson.exercise.hints}
              explanationOnSuccess={activeLesson.exercise.explanationOnSuccess}
              explanationOnError={activeLesson.exercise.explanationOnError}
              onComplete={handleExerciseComplete}
            />
          )}
        </div>
      )}

      {/* Stage 3: Completed Celebration Card */}
      {currentStage === 'completed' && (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-emerald-500/50 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center text-4xl shadow-lg">
            🎉
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Lição Concluída com Sucesso!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Você dominou os conceitos de <strong className="text-white">{activeLesson.title}</strong> e ganhou pontos de experiência!
            </p>
          </div>

          {/* XP & Rewards */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="font-mono text-lg font-bold text-amber-300">
              +{activeLesson.xpReward} XP Ganhos
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setView('trail')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition cursor-pointer"
            >
              Voltar para a Trilha
            </button>

            {nextLessonInTrack && (
              <button
                onClick={handleGoToNextLesson}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Próxima Lição: {nextLessonInTrack.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

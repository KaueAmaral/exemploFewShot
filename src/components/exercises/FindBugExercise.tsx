import React, { useState } from 'react';
import { FindBugData } from '../../types';
import { Bug, CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  data: FindBugData;
  prompt: string;
  hints: string[];
  explanationOnSuccess: string;
  explanationOnError: string;
  onComplete: (isCorrect: boolean) => void;
}

export const FindBugExercise: React.FC<Props> = ({
  data,
  prompt,
  hints,
  explanationOnSuccess,
  explanationOnError,
  onComplete,
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const isCorrect = selectedOptionIndex !== null && data.options[selectedOptionIndex]?.isCorrect;

  const handleSelect = (idx: number) => {
    if (isChecked && isCorrect) return;
    setSelectedOptionIndex(idx);
    setIsChecked(false);
    sound.playClick();
  };

  const handleCheck = () => {
    if (selectedOptionIndex === null) return;
    setIsChecked(true);
    if (data.options[selectedOptionIndex]?.isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleRetry = () => {
    setSelectedOptionIndex(null);
    setIsChecked(false);
    sound.playClick();
  };

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Bug className="w-3.5 h-3.5" />
            Caçador de Bugs
          </span>
          {hints.length > 0 && (
            <button
              onClick={() => {
                setShowHint(true);
                setHintIndex((prev) => (prev + 1) % hints.length);
                sound.playClick();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Dica</span>
            </button>
          )}
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-snug">
          {prompt}
        </h3>
      </div>

      {showHint && hints.length > 0 && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Dica: </span>
            {hints[hintIndex]}
          </div>
        </div>
      )}

      {/* Code Inspector Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400">buggy_script.js</span>
          </div>
          <span className="text-xs text-rose-400/80 font-mono">Inspeção de Sintaxe</span>
        </div>

        <div className="p-4 sm:p-5 font-mono text-sm leading-relaxed text-slate-200 whitespace-pre-wrap bg-slate-950/70 border-l-2 border-rose-500/50">
          {data.code}
        </div>
      </div>

      {/* Options for Bug Identification */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Qual é o diagnóstico correto?
        </p>
        {data.options.map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;
          let stateStyle = 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-slate-200';

          if (isChecked) {
            if (option.isCorrect) {
              stateStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-sm shadow-emerald-900/30';
            } else if (isSelected && !option.isCorrect) {
              stateStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
            } else {
              stateStyle = 'bg-slate-900/40 border-slate-800/50 text-slate-500 opacity-60';
            }
          } else if (isSelected) {
            stateStyle = 'bg-indigo-950/40 border-indigo-500 text-indigo-100 ring-1 ring-indigo-500/50';
          }

          return (
            <button
              key={idx}
              disabled={isChecked && isCorrect}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${stateStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>

              {isChecked && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isChecked && isSelected && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Result feedback */}
      {isChecked && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          isCorrect 
            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
            : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
        }`}>
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="text-sm font-semibold">
              {isCorrect ? 'Bug Detectado com Sucesso!' : 'Diagnóstico Incorreto'}
            </p>
            <p className="text-xs sm:text-sm opacity-90">
              {isCorrect ? explanationOnSuccess : explanationOnError}
            </p>
            {isCorrect && data.bugExplanation && (
              <p className="text-xs text-emerald-300/80 pt-1 font-mono">
                {data.bugExplanation}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center justify-between pt-2">
        {isChecked && !isCorrect ? (
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tentar Novamente</span>
          </button>
        ) : (
          <div />
        )}

        {!isChecked ? (
          <button
            disabled={selectedOptionIndex === null}
            onClick={handleCheck}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-rose-600/30 transition cursor-pointer"
          >
            <Bug className="w-4 h-4" />
            <span>Verificar Bug</span>
          </button>
        ) : isCorrect ? (
          <button
            onClick={() => onComplete(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition cursor-pointer"
          >
            <span>Continuar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

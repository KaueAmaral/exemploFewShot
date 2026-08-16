import React, { useState } from 'react';
import { TrueFalseData } from '../../types';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  data: TrueFalseData;
  prompt: string;
  hints: string[];
  explanationOnSuccess: string;
  explanationOnError: string;
  onComplete: (isCorrect: boolean) => void;
}

export const TrueFalseExercise: React.FC<Props> = ({
  data,
  prompt,
  hints,
  explanationOnSuccess,
  explanationOnError,
  onComplete,
}) => {
  const [selectedBool, setSelectedBool] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const isCorrect = selectedBool === data.isTrue;

  const handleSelect = (val: boolean) => {
    if (isChecked && isCorrect) return;
    setSelectedBool(val);
    setIsChecked(false);
    sound.playClick();
  };

  const handleCheck = () => {
    if (selectedBool === null) return;
    setIsChecked(true);
    if (selectedBool === data.isTrue) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleRetry = () => {
    setSelectedBool(null);
    setIsChecked(false);
    sound.playClick();
  };

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Verdadeiro ou Falso
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

      {/* Code snippet if provided */}
      {data.codeSnippet && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-slate-200 shadow-inner">
          {data.codeSnippet}
        </div>
      )}

      {/* True / False Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* True Option */}
        <button
          disabled={isChecked && isCorrect}
          onClick={() => handleSelect(true)}
          className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedBool === true
              ? isChecked
                ? isCorrect
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500 text-rose-200'
                : 'bg-indigo-950/50 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500/30'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
          }`}
        >
          <span className="text-2xl">✅</span>
          <span className="font-bold text-base sm:text-lg">Verdadeiro</span>
        </button>

        {/* False Option */}
        <button
          disabled={isChecked && isCorrect}
          onClick={() => handleSelect(false)}
          className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedBool === false
              ? isChecked
                ? isCorrect
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500 text-rose-200'
                : 'bg-indigo-950/50 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500/30'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
          }`}
        >
          <span className="text-2xl">❌</span>
          <span className="font-bold text-base sm:text-lg">Falso</span>
        </button>
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
              {isCorrect ? 'Resposta Exata!' : 'Incorreto'}
            </p>
            <p className="text-xs sm:text-sm opacity-90">
              {isCorrect ? explanationOnSuccess : explanationOnError}
            </p>
            {data.explanation && (
              <p className="text-xs opacity-80 pt-1 font-sans">
                {data.explanation}
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
            disabled={selectedBool === null}
            onClick={handleCheck}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
          >
            <span>Confirmar Resposta</span>
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

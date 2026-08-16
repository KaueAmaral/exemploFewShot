import React, { useState } from 'react';
import { FillInCodeData } from '../../types';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  data: FillInCodeData;
  prompt: string;
  hints: string[];
  explanationOnSuccess: string;
  explanationOnError: string;
  onComplete: (isCorrect: boolean) => void;
}

export const FillInCodeExercise: React.FC<Props> = ({
  data,
  prompt,
  hints,
  explanationOnSuccess,
  explanationOnError,
  onComplete,
}) => {
  const [inputs, setInputs] = useState<{ [key: string]: string }>(() => {
    const initial: { [key: string]: string } = {};
    data.blanks.forEach((b) => {
      initial[b.id] = '';
    });
    return initial;
  });

  const [isChecked, setIsChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const checkCorrectness = () => {
    return data.blanks.every((b) => {
      const userVal = (inputs[b.id] || '').trim();
      const expectedVal = b.expected.trim();
      return userVal.toLowerCase() === expectedVal.toLowerCase();
    });
  };

  const isCorrect = isChecked && checkCorrectness();

  const handleInputChange = (id: string, val: string) => {
    setInputs((prev) => ({ ...prev, [id]: val }));
    setIsChecked(false);
  };

  const handleCheck = () => {
    const allFilled = data.blanks.every((b) => (inputs[b.id] || '').trim().length > 0);
    if (!allFilled) return;

    setIsChecked(true);
    if (checkCorrectness()) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleRetry = () => {
    setIsChecked(false);
    sound.playClick();
  };

  // Render the code template with inline input fields
  const renderTemplate = () => {
    const parts = data.codeTemplate.split(/(\{\{blank_\d+\}\})/g);

    return parts.map((part, idx) => {
      const match = part.match(/\{\{(blank_\d+)\}\}/);
      if (match) {
        const blankId = match[1];
        const blankDef = data.blanks.find((b) => b.id === blankId);
        const val = inputs[blankId] || '';
        const isBlankCorrect = isChecked && val.trim().toLowerCase() === blankDef?.expected.trim().toLowerCase();

        return (
          <span key={idx} className="inline-block my-0.5 mx-1">
            <input
              type="text"
              value={val}
              disabled={isChecked && isCorrect}
              placeholder={blankDef?.placeholder || '...'}
              onChange={(e) => handleInputChange(blankId, e.target.value)}
              className={`font-mono text-sm px-2.5 py-1 rounded-md border text-center transition-all outline-none ${
                isChecked
                  ? isBlankCorrect
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                    : 'bg-rose-950/60 border-rose-500 text-rose-300 ring-1 ring-rose-500'
                  : 'bg-slate-800 border-indigo-500/50 text-indigo-200 focus:border-indigo-400 focus:bg-slate-700/80 focus:ring-1 focus:ring-indigo-400'
              }`}
              style={{ width: `${Math.max(6, (blankDef?.expected.length || 5) + 3)}ch` }}
            />
          </span>
        );
      }
      return (
        <span key={idx} className="text-slate-200 whitespace-pre-wrap">
          {part}
        </span>
      );
    });
  };

  const isAnyBlankEmpty = data.blanks.some((b) => !(inputs[b.id] || '').trim());

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Complete o Código
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

      {/* Code Editor Box with Blank Slots */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400">code_quest.js</span>
          </div>
          <span className="text-xs text-slate-500">Preencha os campos em destaque</span>
        </div>

        <div className="p-5 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
          {renderTemplate()}
        </div>
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
              {isCorrect ? 'Código Correto!' : 'Atenção à sintaxe'}
            </p>
            <p className="text-xs sm:text-sm opacity-90">
              {isCorrect ? explanationOnSuccess : explanationOnError}
            </p>
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
            disabled={isAnyBlankEmpty}
            onClick={handleCheck}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition cursor-pointer"
          >
            <span>Verificar Código</span>
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

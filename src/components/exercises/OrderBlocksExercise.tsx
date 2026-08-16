import React, { useState } from 'react';
import { OrderBlocksData, OrderBlockItem } from '../../types';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, ArrowUp, ArrowDown, Shuffle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  data: OrderBlocksData;
  prompt: string;
  hints: string[];
  explanationOnSuccess: string;
  explanationOnError: string;
  onComplete: (isCorrect: boolean) => void;
}

export const OrderBlocksExercise: React.FC<Props> = ({
  data,
  prompt,
  hints,
  explanationOnSuccess,
  explanationOnError,
  onComplete,
}) => {
  // Scramble initial order deterministically
  const [blocks, setBlocks] = useState<OrderBlockItem[]>(() => {
    return [...data.blocks].sort(() => Math.random() - 0.5);
  });

  const [isChecked, setIsChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const checkCorrectness = () => {
    return blocks.every((b, idx) => b.correctPosition === idx);
  };

  const isCorrect = isChecked && checkCorrectness();

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (isChecked && isCorrect) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;

    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIdx];
    newBlocks[targetIdx] = temp;

    setBlocks(newBlocks);
    setIsChecked(false);
    sound.playClick();
  };

  const handleCheck = () => {
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

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Shuffle className="w-3.5 h-3.5" />
            Ordene os Blocos
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

      {/* Code Blocks Ordered List */}
      <div className="space-y-2.5">
        {blocks.map((block, idx) => {
          const isItemInCorrectSpot = isChecked && block.correctPosition === idx;

          let itemStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700';
          if (isChecked) {
            if (isItemInCorrectSpot) {
              itemStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200';
            } else {
              itemStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
            }
          }

          return (
            <div
              key={block.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${itemStyle}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 text-xs font-mono flex items-center justify-center shrink-0 font-bold">
                  {idx + 1}
                </span>
                <span className="font-mono text-sm sm:text-base text-slate-100 truncate">
                  {block.text}
                </span>
              </div>

              {/* Reordering Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  disabled={idx === 0 || (isChecked && isCorrect)}
                  onClick={() => moveBlock(idx, 'up')}
                  aria-label="Mover bloco para cima"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  disabled={idx === blocks.length - 1 || (isChecked && isCorrect)}
                  onClick={() => moveBlock(idx, 'down')}
                  aria-label="Mover bloco para baixo"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition cursor-pointer"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
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
              {isCorrect ? 'Sequência Perfeita!' : 'Ordem Incorreta'}
            </p>
            <p className="text-xs sm:text-sm opacity-90">
              {isCorrect ? explanationOnSuccess : explanationOnError}
            </p>
            {isCorrect && data.resultExplanation && (
              <p className="text-xs text-emerald-300/80 pt-1 font-mono">
                {data.resultExplanation}
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
            onClick={handleCheck}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold shadow-lg shadow-cyan-600/30 transition cursor-pointer"
          >
            <span>Verificar Ordem</span>
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

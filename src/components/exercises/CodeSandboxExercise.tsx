import React, { useState } from 'react';
import { CodeSandboxData } from '../../types';
import { Play, CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Terminal } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  data: CodeSandboxData;
  prompt: string;
  hints: string[];
  explanationOnSuccess: string;
  explanationOnError: string;
  onComplete: (isCorrect: boolean) => void;
}

export const CodeSandboxExercise: React.FC<Props> = ({
  data,
  prompt,
  hints,
  explanationOnSuccess,
  explanationOnError,
  onComplete,
}) => {
  const [userCode, setUserCode] = useState(data.starterCode);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [hasRun, setHasRun] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const runCode = () => {
    sound.playClick();
    setHasRun(true);
    setErrorMessage(null);
    const logs: string[] = [];

    // Safe execution sandbox
    try {
      // Capture console.log
      const customConsole = {
        log: (...args: unknown[]) => {
          logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
        },
        error: (...args: unknown[]) => {
          logs.push('Erro: ' + args.join(' '));
        },
      };

      // Check required keywords if any
      if (data.expectedKeywords) {
        for (const kw of data.expectedKeywords) {
          if (!userCode.includes(kw)) {
            throw new Error(`Seu código precisa utilizar "${kw}".`);
          }
        }
      }

      // Safe evaluation
      const runner = new Function('console', userCode);
      runner(customConsole);

      setConsoleOutput(logs.length > 0 ? logs : ['(Código executado sem saída de texto no console)']);

      // Check expected output
      const fullOutput = logs.join('\n').trim();
      const expected = data.expectedOutput.trim();

      const matched = fullOutput.toLowerCase().includes(expected.toLowerCase());
      if (matched) {
        setIsSuccess(true);
        sound.playSuccess();
      } else {
        setIsSuccess(false);
        sound.playError();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro na execução do código.';
      setErrorMessage(msg);
      setConsoleOutput([...logs, `❌ Exceção: ${msg}`]);
      setIsSuccess(false);
      sound.playError();
    }
  };

  const handleReset = () => {
    setUserCode(data.starterCode);
    setConsoleOutput([]);
    setHasRun(false);
    setIsSuccess(false);
    setErrorMessage(null);
    sound.playClick();
  };

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Terminal className="w-3.5 h-3.5" />
            Sandbox Interativo
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

      {/* Code Editor */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400">playground.js</span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restaurar</span>
          </button>
        </div>

        <textarea
          value={userCode}
          onChange={(e) => {
            setUserCode(e.target.value);
            setHasRun(false);
          }}
          rows={6}
          spellCheck={false}
          className="w-full bg-slate-950/90 p-4 font-mono text-sm sm:text-base text-slate-200 focus:outline-none resize-none border-b border-slate-800"
        />

        {/* Live Terminal Output */}
        <div className="p-4 bg-slate-950">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              Console Output
            </span>
            <span>Esperado: "{data.expectedOutput}"</span>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3 font-mono text-xs text-slate-300 min-h-[50px] border border-slate-800/80">
            {consoleOutput.length > 0 ? (
              consoleOutput.map((line, i) => (
                <div key={i} className="text-emerald-400 leading-relaxed">
                  &gt; {line}
                </div>
              ))
            ) : (
              <span className="text-slate-600 italic">Clique em "Executar Código" para rodar...</span>
            )}
          </div>
        </div>
      </div>

      {/* Result feedback */}
      {hasRun && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          isSuccess 
            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
            : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
        }`}>
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="text-sm font-semibold">
              {isSuccess ? 'Executado com Sucesso!' : 'Saída Incorreta'}
            </p>
            <p className="text-xs sm:text-sm opacity-90">
              {isSuccess ? explanationOnSuccess : errorMessage || explanationOnError}
            </p>
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={runCode}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-600/30 transition cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Executar Código</span>
        </button>

        {isSuccess && (
          <button
            onClick={() => onComplete(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition cursor-pointer"
          >
            <span>Continuar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

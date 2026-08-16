import React from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles, Trophy, Flame, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useGame();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-xl flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${
              toast.type === 'xp'
                ? 'bg-slate-900/95 border-amber-500/40 text-amber-100 shadow-amber-500/10'
                : toast.type === 'achievement'
                ? 'bg-slate-900/95 border-indigo-500/40 text-indigo-100 shadow-indigo-500/10'
                : 'bg-slate-900/95 border-slate-700 text-slate-100'
            }`}
          >
            <div className="p-2 rounded-xl bg-slate-800/80 shrink-0 mt-0.5">
              {toast.type === 'xp' && <Sparkles className="w-4 h-4 text-amber-400" />}
              {toast.type === 'achievement' && <Trophy className="w-4 h-4 text-indigo-400" />}
              {toast.type === 'streak' && <Flame className="w-4 h-4 text-orange-400" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400" />}
              {toast.type === 'level' && <Sparkles className="w-4 h-4 text-emerald-400" />}
            </div>

            <div className="min-w-0 flex-1">
              <h5 className="text-xs font-bold leading-tight text-white">{toast.title}</h5>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

import React from 'react';
import { useGame } from '../../context/GameContext';
import { Flame, X, Check, Calendar, Zap } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const StreakModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { stats } = useGame();

  if (!isOpen) return null;

  const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-7 h-7 fill-amber-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
                Sequência de {stats.streak} Dias
              </h3>
              <p className="text-xs text-amber-300 font-medium">Hábito de Estudo Diário Ativo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mini Calendar Visualizer */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              Esta Semana
            </span>
            <span className="text-amber-400 font-semibold">{stats.streak} dias praticados</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {daysOfWeek.map((day, idx) => {
              const isPastOrToday = idx < stats.streak;
              return (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-slate-500">{day}</span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isPastOrToday
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                        : 'bg-slate-900 border border-slate-800 text-slate-600'
                    }`}
                  >
                    {isPastOrToday ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak Benefits */}
        <div className="space-y-2.5 text-xs text-slate-300">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-100">Bônus de XP Contínuo</p>
              <p className="text-slate-400 text-[11px]">Estudar todo dia aumenta a retenção de aprendizado em até 40%.</p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition cursor-pointer"
        >
          Entendido, vamos continuar!
        </button>
      </div>
    </div>
  );
};

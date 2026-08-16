import React from 'react';
import { useGame } from '../../context/GameContext';
import { Home, Compass, Code2, Swords, Trophy } from 'lucide-react';
import { ViewMode } from '../../types';

export const MobileNav: React.FC = () => {
  const { currentView, setView } = useGame();

  const items: { id: ViewMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'trail', label: 'Trilha', icon: Compass },
    { id: 'tracks', label: 'Linguagens', icon: Code2 },
    { id: 'challenges', label: 'Desafios', icon: Swords },
    { id: 'achievements', label: 'Conquistas', icon: Trophy },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
                isActive
                  ? 'text-indigo-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400 scale-110' : 'text-slate-400'} transition-transform`} />
              <span className="text-[10px] mt-1 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

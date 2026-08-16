import React from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Home, 
  Compass, 
  Code2, 
  Swords, 
  Trophy, 
  BarChart3, 
  User, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ViewMode } from '../../types';

interface NavItem {
  id: ViewMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { currentView, setView, activeTrack, stats } = useGame();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'trail', label: 'Trilha Atual', icon: Compass, badge: activeTrack.name },
    { id: 'tracks', label: 'Linguagens', icon: Code2 },
    { id: 'challenges', label: 'Arena de Desafios', icon: Swords },
    { id: 'achievements', label: 'Conquistas', icon: Trophy, badge: `${stats.unlockedAchievementIds.length}` },
    { id: 'progress', label: 'Estatísticas', icon: BarChart3 },
    { id: 'profile', label: 'Meu Perfil', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800/80 bg-slate-950/50 p-4 space-y-6">
      
      {/* Current Track Snapshot Card */}
      <div 
        onClick={() => setView('trail')}
        className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 hover:border-slate-700 transition cursor-pointer group shadow-sm"
      >
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-indigo-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Trilha Ativa
          </span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{activeTrack.icon}</span>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-100 truncate">{activeTrack.name}</h4>
            <p className="text-xs text-slate-400 truncate">{activeTrack.modulesCount} Módulos</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 pb-1">
          Navegação Principal
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Daily XP Target Widget */}
      <div className="mt-auto pt-4 border-t border-slate-800/80">
        <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Meta de Hoje
            </span>
            <span className="font-mono text-indigo-300 font-bold">{stats.xp % 100}/100 XP</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, stats.xp % 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500">Complete mais 1 lição para bater a meta!</p>
        </div>
      </div>
    </aside>
  );
};

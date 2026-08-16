import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { TRACKS_DATA } from '../data/courses';
import { 
  Code2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck, 
  Search,
  Check
} from 'lucide-react';
import { sound } from '../utils/audio';

export const TracksView: React.FC = () => {
  const { stats, selectTrack, setView, activeTrackId } = useGame();
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredTracks = TRACKS_DATA.filter((track) => {
    const matchesSearch = track.name.toLowerCase().includes(search.toLowerCase()) ||
      track.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleSelectTrack = (trackId: string) => {
    sound.playClick();
    selectTrack(trackId);
    setView('trail');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <Code2 className="w-4 h-4" />
          Catálogo de Linguagens
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Escolha Sua Trilha de Conhecimento
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Cada trilha é estruturada do zero com módulos progressivos, desafios práticos e feedback instantâneo no navegador.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por linguagem ou tecnologia..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTracks.map((track) => {
          const isActive = track.id === activeTrackId;
          const totalLessons = track.modules.reduce((acc, m) => acc + m.lessons.length, 0);
          const completedLessons = track.modules.reduce((acc, m) => {
            return acc + m.lessons.filter((l) => stats.completedLessonIds.includes(l.id)).length;
          }, 0);
          const progressPercent = Math.round((completedLessons / Math.max(1, totalLessons)) * 100);

          return (
            <div
              key={track.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-6 ${
                isActive
                  ? 'bg-slate-900/90 border-indigo-500/60 ring-1 ring-indigo-500/30 shadow-xl shadow-indigo-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-4">
                
                {/* Top badges */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{track.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {track.name}
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            Ativa
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        {track.prerequisites}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${track.badgeColor}`}>
                    {track.levelLabel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {track.fullDescription}
                </p>

                {/* Topics Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {track.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-slate-950/80 text-slate-300 border border-slate-800"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {completedLessons} de {totalLessons} lições ({progressPercent}%)
                    </span>
                    <span className="font-mono text-amber-300 font-bold">
                      +{track.totalXp} XP
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    {track.modulesCount} Módulos
                  </span>
                </div>

                <button
                  onClick={() => handleSelectTrack(track.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>{progressPercent > 0 ? 'Continuar Trilha' : 'Iniciar Trilha'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

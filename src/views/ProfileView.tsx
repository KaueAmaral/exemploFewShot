import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  User, 
  Sparkles, 
  Shield, 
  Award, 
  Flame, 
  RotateCcw, 
  Check, 
  Gem,
  Calendar
} from 'lucide-react';
import { sound } from '../utils/audio';

const AVATARS = ['🚀', '⚡', '🧙‍♂️', '🤖', '🐱‍💻', '👾', '🦊', '🦉', '💎', '🔥', '💻', '🎮'];

export const ProfileView: React.FC = () => {
  const { stats, levelInfo, updateProfile, resetProgress } = useGame();
  const [name, setName] = useState(stats.userName);
  const [avatar, setAvatar] = useState(stats.avatar);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, avatar);
    sound.playSuccess();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <User className="w-4 h-4" />
          Minha Conta
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Perfil do Aluno
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Gerencie seus dados pessoais, avatar e personalize sua experiência no CodeQuest.
        </p>
      </div>

      {/* Main Profile Showcase Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-slate-950 border-2 border-indigo-500/40 flex items-center justify-center text-5xl shadow-inner shrink-0">
          {stats.avatar}
        </div>
        <div className="space-y-1.5 text-center sm:text-left min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="text-2xl font-black text-white">{stats.userName}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 w-fit mx-auto sm:mx-0">
              Nível {levelInfo.currentLevel}
            </span>
          </div>
          <p className="text-sm font-semibold text-indigo-400">{levelInfo.title}</p>
          <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 pt-1">
            <Calendar className="w-3.5 h-3.5" />
            Membro ativo desde {stats.joinedDate}
          </p>
        </div>
      </div>

      {/* Core Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <Sparkles className="w-5 h-5 text-amber-400 mx-auto" />
          <p className="text-[10px] uppercase font-bold text-slate-400">Total XP</p>
          <p className="text-xl font-bold text-white font-mono">{stats.xp}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <Gem className="w-5 h-5 text-cyan-400 mx-auto" />
          <p className="text-[10px] uppercase font-bold text-slate-400">Gemas</p>
          <p className="text-xl font-bold text-white font-mono">{stats.gems}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <Flame className="w-5 h-5 text-orange-400 mx-auto" />
          <p className="text-[10px] uppercase font-bold text-slate-400">Ofensiva</p>
          <p className="text-xl font-bold text-white font-mono">{stats.streak} dias</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <Award className="w-5 h-5 text-emerald-400 mx-auto" />
          <p className="text-[10px] uppercase font-bold text-slate-400">Conquistas</p>
          <p className="text-xl font-bold text-white font-mono">{stats.unlockedAchievementIds.length}</p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h4 className="text-lg font-bold text-white">Editar Dados do Perfil</h4>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Nome de Exibição
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Escolher Novo Avatar
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setAvatar(av)}
                  className={`h-14 rounded-2xl text-2xl flex items-center justify-center transition cursor-pointer ${
                    avatar === av
                      ? 'bg-indigo-600 border-2 border-indigo-400 shadow-md scale-105'
                      : 'bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar Todo o Progresso</span>
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>

        {showResetConfirm && (
          <div className="p-5 rounded-2xl bg-rose-950/80 border border-rose-500/50 space-y-3">
            <p className="text-xs font-semibold text-rose-200">
              Atenção: isto apagará todo o XP acumulado, lições concluídas e conquistas locais. Deseja continuar?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Sim, Resetar Agora
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

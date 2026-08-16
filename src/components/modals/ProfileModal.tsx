import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { X, Check, RotateCcw, Shield, Sparkles, Award } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_CHOICES = ['🚀', '⚡', '🧙‍♂️', '🤖', '🐱‍💻', '👾', '🦊', '🦉', '💎', '🔥'];

export const ProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { stats, updateProfile, resetProgress, levelInfo } = useGame();
  const [name, setName] = useState(stats.userName);
  const [selectedAvatar, setSelectedAvatar] = useState(stats.avatar);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, selectedAvatar);
    onClose();
  };

  const handleResetConfirm = () => {
    resetProgress();
    setShowConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Perfil do Programador</h3>
            <p className="text-xs text-slate-400">Personalize sua identidade no CodeQuest</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card Preview */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/20 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-indigo-500/40 flex items-center justify-center text-3xl shadow-inner shrink-0">
            {selectedAvatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-white truncate">{name || 'Seu Nome'}</h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Nvl {levelInfo.currentLevel}
              </span>
            </div>
            <p className="text-xs text-indigo-400 font-medium">{levelInfo.title}</p>
            <p className="text-[11px] text-slate-400 mt-1">Membro desde {stats.joinedDate} • {stats.xp} XP total</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              Escolha seu Avatar
            </label>
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_CHOICES.map((av) => {
                const isSelected = selectedAvatar === av;
                return (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`h-12 rounded-xl text-2xl flex items-center justify-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 border-2 border-indigo-400 shadow-md shadow-indigo-600/30 scale-105'
                        : 'bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {av}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Nome de Usuário
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 text-sm outline-none transition"
              placeholder="Digite seu nome ou apelido"
            />
          </div>

          {/* Stats summary */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <p className="text-[10px] text-slate-400">Lições</p>
              <p className="text-sm font-bold text-white">{stats.completedLessonIds.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <Shield className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <p className="text-[10px] text-slate-400">Precisão</p>
              <p className="text-sm font-bold text-white">{stats.accuracyRate}%</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <Sparkles className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <p className="text-[10px] text-slate-400">Gemas</p>
              <p className="text-sm font-bold text-white">{stats.gems}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar Dados</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Salvar</span>
              </button>
            </div>
          </div>
        </form>

        {/* Reset Confirmation Overlay */}
        {showConfirmReset && (
          <div className="p-4 rounded-2xl bg-rose-950/90 border border-rose-500/50 space-y-3">
            <p className="text-xs font-semibold text-rose-200">
              Tem certeza que deseja reiniciar todo o progresso (XP, Lições e Conquistas)?
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleResetConfirm}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Sim, Resetar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

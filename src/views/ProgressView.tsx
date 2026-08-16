import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { TRACKS_DATA } from '../data/courses';
import { 
  BarChart3, 
  Award, 
  Flame, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Download, 
  Share2, 
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { sound } from '../utils/audio';

export const ProgressView: React.FC = () => {
  const { stats, levelInfo, activeTrack } = useGame();
  const [selectedTrackForCert, setSelectedTrackForCert] = useState(activeTrack.id);

  const currentTrack = TRACKS_DATA.find((t) => t.id === selectedTrackForCert) || activeTrack;
  const totalLessonsInTrack = currentTrack.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedInTrack = currentTrack.modules.reduce((acc, m) => {
    return acc + m.lessons.filter((l) => stats.completedLessonIds.includes(l.id)).length;
  }, 0);
  const trackPercentage = Math.round((completedInTrack / Math.max(1, totalLessonsInTrack)) * 100);

  const isCertificateUnlocked = trackPercentage >= 100;

  const handleDownloadCertificate = () => {
    sound.playSuccess();
    window.print();
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4" />
          Analytics & Desempenho
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Sua Evolução Técnica
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Acompanhe o crescimento da sua proficiência em lógica, consistência de estudos e desbloqueie certificados de conclusão.
        </p>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1 */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total de XP</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-mono">{stats.xp}</p>
          <p className="text-[11px] text-amber-300">Nível {levelInfo.currentLevel} • {levelInfo.title}</p>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Lições Dominadas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-mono">{stats.completedLessonIds.length}</p>
          <p className="text-[11px] text-emerald-300">Em 4 linguagens</p>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Taxa de Precisão</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-mono">{stats.accuracyRate}%</p>
          <p className="text-[11px] text-cyan-300">{stats.correctAnswersCount} acertos nos exercícios</p>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Sequência Ativa</span>
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-mono">{stats.streak} dias</p>
          <p className="text-[11px] text-orange-300">Ritmo consistente</p>
        </div>
      </div>

      {/* Weekly Activity Bar Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              Atividade Semanal de XP
            </h3>
            <p className="text-xs text-slate-400">Distribuição dos pontos conquistados nos últimos 7 dias</p>
          </div>
          <span className="text-xs font-mono text-indigo-300 font-semibold">
            Média: 58 XP / dia
          </span>
        </div>

        {/* CSS Bar Chart */}
        <div className="grid grid-cols-7 gap-3 pt-4 items-end h-44">
          {stats.weeklyXp.map((item, idx) => {
            const heightPercent = Math.min(100, Math.max(15, (item.xp / 100) * 100));
            const isToday = idx === stats.weeklyXp.length - 1;

            return (
              <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-400 font-semibold">{item.xp}</span>
                <div className="w-full bg-slate-950 rounded-xl h-full max-h-32 flex items-end p-1 border border-slate-800/80">
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${isToday ? 'text-indigo-400' : 'text-slate-500'}`}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Generator Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Certificado Oficial de Conclusão
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Comprovação de Habilidades
            </h3>
            <p className="text-xs text-slate-400">
              Conclua 100% de uma trilha para emitir seu certificado nominal verificável.
            </p>
          </div>

          {/* Select Track for Certificate */}
          <div className="flex items-center gap-2">
            <select
              value={selectedTrackForCert}
              onChange={(e) => setSelectedTrackForCert(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 outline-none cursor-pointer"
            >
              {TRACKS_DATA.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.modules.reduce((acc, m) => acc + m.lessons.filter((l) => stats.completedLessonIds.includes(l.id)).length, 0)}/{t.modules.reduce((acc, m) => acc + m.lessons.length, 0)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Certificate Mock Preview Box */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border-2 border-indigo-500/30 text-center space-y-5 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-4">
            <span className="font-bold tracking-widest text-indigo-400">CODEQUEST ACADEMY</span>
            <span className="font-mono">ID: CQ-{Math.abs(stats.userName.length * 997).toString().padStart(6, '0')}</span>
          </div>

          <div className="space-y-2 py-4">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Certificado de Excelência Técnica
            </p>
            <h4 className="text-2xl sm:text-3xl font-black text-white">
              {stats.userName}
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              concluiu com êxito a trilha intensiva de <strong className="text-indigo-300">{currentTrack.name}</strong>, demonstrando domínio prático em sintaxe, estruturas de controle e algoritmos.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              Autenticidade Verificada
            </span>
            <span className="font-mono">Status: {trackPercentage}% Concluído</span>
          </div>

          {/* Action button inside cert */}
          <div className="pt-2">
            <button
              onClick={handleDownloadCertificate}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 mx-auto shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Imprimir / Salvar Certificado</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

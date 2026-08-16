import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { TRACKS_DATA } from '../data/courses';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Trophy, 
  Zap, 
  Code2, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  ShieldCheck,
  Play,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/audio';

export const LandingPage: React.FC = () => {
  const { setView, selectTrack, startLesson } = useGame();
  const [demoInput, setDemoInput] = useState('');
  const [demoOutput, setDemoOutput] = useState<string | null>(null);

  const handleRunDemo = () => {
    sound.playClick();
    if (!demoInput.trim()) {
      setDemoOutput('Digite um comando acima!');
      return;
    }
    try {
      if (demoInput.includes('console.log')) {
        const match = demoInput.match(/console\.log\((.*?)\)/);
        if (match) {
          const val = match[1].replace(/["']/g, '');
          setDemoOutput(`> ${val}`);
          sound.playSuccess();
          return;
        }
      }
      setDemoOutput(`> ${demoInput}`);
      sound.playSuccess();
    } catch {
      setDemoOutput('> Erro ao executar.');
      sound.playError();
    }
  };

  const handleStartCoding = () => {
    sound.playClick();
    setView('dashboard');
  };

  return (
    <div className="space-y-24 py-8 sm:py-16">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-float">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Aprenda Programação Jogando</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
          Transforme código em sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-amber-300">super habilidade</span>.
        </h1>

        {/* Subhead */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Sem textos gigantes ou vídeos intermináveis. Aprenda com lições rápidas de 3 minutos, desafios interativos em tempo real, XP e conquistas.
        </p>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleStartCoding}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition cursor-pointer hover:scale-[1.02]"
          >
            <span>Começar a Programar Gratuitamente</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setView('tracks')}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-base transition cursor-pointer"
          >
            Ver Trilhas Disponíveis
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Prático e Interativo</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Direto no Navegador</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Feito para Iniciantes</span>
          </div>
        </div>

        {/* Interactive Live Playground Teaser */}
        <div className="pt-10 max-w-2xl mx-auto">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden text-left">
            <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">experimente_agora.js</span>
              </div>
              <span className="text-xs text-indigo-400 font-mono">Simulador Ao Vivo</span>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-400">
                Digite um comando como <code className="text-indigo-300 font-mono">console.log("Olá Mundo")</code> e veja o código rodar:
              </p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  placeholder='console.log("CodeQuest é incrível!");'
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleRunDemo}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Rodar</span>
                </button>
              </div>

              {demoOutput && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-xs text-emerald-400">
                  {demoOutput}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Core Pillars (4 Steps) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Como o CodeQuest Funciona
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Uma metodologia baseada em ciência da aprendizagem e ciclos curtos de feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Conceito Direto</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Explicações em 3 a 5 linhas sem jargões confusos ou teorias pesadas.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Prática Imediata</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Complete códigos, ache bugs e organize blocos lógicos na mesma tela.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Feedback Real</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Saiba exatamente por que seu código funcionou ou onde precisa de ajuste.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-lg">
              4
            </div>
            <h3 className="text-lg font-bold text-white">XP & Evolução</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Suba de nível, ganhe insígnias e acompanhe seu domínio técnico real.
            </p>
          </div>
        </div>
      </section>

      {/* Language Tracks Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Trilhas de Aprendizado</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Escolha Sua Primeira Linguagem
            </h2>
          </div>
          <button
            onClick={() => setView('tracks')}
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todas as trilhas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRACKS_DATA.map((track) => (
            <div
              key={track.id}
              onClick={() => {
                selectTrack(track.id);
                setView('trail');
              }}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition cursor-pointer group flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{track.icon}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${track.badgeColor}`}>
                    {track.levelLabel}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {track.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {track.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{track.modulesCount} Módulos</span>
                <span className="font-mono text-indigo-300 font-bold">+{track.totalXp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gamification Spotlight */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Flame className="w-3.5 h-3.5" />
                Gamificação Real
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Aprender programação agora dá vontade de continuar amanhã.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Mantenha sua sequência diária (streak), ganhe gemas para desbloquear desafios lendários e colecione conquistas conforme domina a lógica dos algoritmos.
              </p>
              <button
                onClick={handleStartCoding}
                className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition shadow-lg cursor-pointer inline-flex items-center gap-2"
              >
                <span>Acessar Meu Dashboard</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            {/* Gamification Cards Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Flame className="w-5 h-5 fill-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-white">Streak Diário</h4>
                <p className="text-xs text-slate-400">Proteja seu ritmo de estudo todos os dias.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Conquistas</h4>
                <p className="text-xs text-slate-400">De "Primeiro Código" a "Arquiteto de Software".</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Níveis de XP</h4>
                <p className="text-xs text-slate-400">Ganhe experiência prática com cada exercício.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Arena de Códigos</h4>
                <p className="text-xs text-slate-400">Desafios rápidos para testar seus reflexos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Callout */}
      <footer className="text-center border-t border-slate-900 pt-12 text-slate-500 text-xs">
        <p>CodeQuest — Plataforma Interativa e Gamificada de Programação.</p>
        <p className="mt-1">Feito para transformar iniciantes em desenvolvedores confiantes.</p>
      </footer>
    </div>
  );
};

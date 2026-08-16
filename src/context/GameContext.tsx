import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserStats, 
  Achievement, 
  DailyQuest, 
  ViewMode, 
  LanguageTrack, 
  Lesson,
  StandaloneChallenge 
} from '../types';
import { TRACKS_DATA } from '../data/courses';
import { INITIAL_ACHIEVEMENTS, INITIAL_DAILY_QUESTS, LEVEL_TITLES, STANDALONE_CHALLENGES } from '../data/gamification';
import { sound } from '../utils/audio';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'xp' | 'achievement' | 'level' | 'streak' | 'info';
  xpAmount?: number;
}

interface GameContextType {
  stats: UserStats;
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  currentView: ViewMode;
  activeTrackId: string;
  activeLesson: Lesson | null;
  activeTrack: LanguageTrack;
  selectedChallenge: StandaloneChallenge | null;
  levelInfo: {
    currentLevel: number;
    title: string;
    currentLevelXp: number;
    nextLevelXp: number;
    progressPercent: number;
  };
  toasts: ToastNotification[];
  isLevelUpModalOpen: boolean;
  leveledUpTo: number | null;
  isSoundMuted: boolean;
  // Actions
  setView: (view: ViewMode) => void;
  selectTrack: (trackId: string) => void;
  startLesson: (lessonId: string, trackId?: string) => void;
  finishLesson: (lessonId: string, xp: number) => void;
  startChallenge: (challenge: StandaloneChallenge) => void;
  finishChallenge: (challengeId: string, xp: number) => void;
  claimQuest: (questId: string) => void;
  claimAchievement: (achievementId: string) => void;
  toggleSound: () => void;
  closeLevelUpModal: () => void;
  removeToast: (id: string) => void;
  updateProfile: (name: string, avatar: string) => void;
  resetProgress: () => void;
  getNextRecommendedLesson: () => { lesson: Lesson; track: LanguageTrack } | null;
}

const STORAGE_KEY = 'codequest_user_state_v1';

const INITIAL_STATS: UserStats = {
  xp: 45,
  level: 1,
  levelTitle: 'Aprendiz do Código',
  gems: 25,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: [],
  completedChallengeIds: [],
  unlockedAchievementIds: [],
  claimedQuestIds: [],
  activeTrackId: 'javascript',
  userName: 'Dev Iniciante',
  avatar: '🚀',
  joinedDate: 'Agosto 2025',
  dailyStreakHistory: {
    [new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0]]: true,
    [new Date(Date.now() - 86400000).toISOString().split('T')[0]]: true,
    [new Date().toISOString().split('T')[0]]: true,
  },
  weeklyXp: [
    { day: 'Seg', xp: 40 },
    { day: 'Ter', xp: 65 },
    { day: 'Qua', xp: 30 },
    { day: 'Qui', xp: 85 },
    { day: 'Sex', xp: 50 },
    { day: 'Sáb', xp: 90 },
    { day: 'Dom', xp: 45 },
  ],
  accuracyRate: 94,
  totalExercisesAnswered: 4,
  correctAnswersCount: 4,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // LocalStorage fallback
    }
    return INITIAL_STATS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(INITIAL_DAILY_QUESTS);
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [activeTrackId, setActiveTrackId] = useState<string>(stats.activeTrackId || 'javascript');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<StandaloneChallenge | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState<number | null>(null);
  const [isSoundMuted, setIsSoundMuted] = useState(sound.getMuted());

  // Save to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // LocalStorage fallback
    }
  }, [stats]);

  // Calculate Level Progression
  const calculateLevel = (xp: number) => {
    let current = LEVEL_TITLES[0];
    for (const tier of LEVEL_TITLES) {
      if (xp >= tier.minXp) {
        current = tier;
      }
    }
    const xpInLevel = xp - current.minXp;
    const xpRequiredForNext = current.maxXp - current.minXp;
    const progressPercent = Math.min(100, Math.round((xpInLevel / xpRequiredForNext) * 100));

    return {
      currentLevel: current.level,
      title: current.title,
      currentLevelXp: xpInLevel,
      nextLevelXp: xpRequiredForNext,
      progressPercent,
    };
  };

  const levelInfo = calculateLevel(stats.xp);

  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsSoundMuted(muted);
  };

  const activeTrack = TRACKS_DATA.find((t) => t.id === activeTrackId) || TRACKS_DATA[0];

  const selectTrack = (trackId: string) => {
    setActiveTrackId(trackId);
    setStats((prev) => ({ ...prev, activeTrackId: trackId }));
    sound.playClick();
  };

  const setView = (view: ViewMode) => {
    sound.playClick();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getNextRecommendedLesson = (): { lesson: Lesson; track: LanguageTrack } | null => {
    const currentTrack = TRACKS_DATA.find((t) => t.id === activeTrackId) || TRACKS_DATA[0];
    for (const mod of currentTrack.modules) {
      for (const les of mod.lessons) {
        if (!stats.completedLessonIds.includes(les.id)) {
          return { lesson: les, track: currentTrack };
        }
      }
    }
    // If current track is done, find from next track
    for (const track of TRACKS_DATA) {
      for (const mod of track.modules) {
        for (const les of mod.lessons) {
          if (!stats.completedLessonIds.includes(les.id)) {
            return { lesson: les, track };
          }
        }
      }
    }
    return null;
  };

  const startLesson = (lessonId: string, trackId?: string) => {
    const targetTrackId = trackId || activeTrackId;
    const track = TRACKS_DATA.find((t) => t.id === targetTrackId);
    if (!track) return;

    for (const mod of track.modules) {
      const found = mod.lessons.find((l) => l.id === lessonId);
      if (found) {
        setActiveLesson(found);
        setActiveTrackId(targetTrackId);
        setCurrentView('lesson');
        sound.playClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
  };

  const checkAchievements = (newStats: UserStats) => {
    setAchievements((prev) => {
      return prev.map((ach) => {
        if (ach.isUnlocked) return ach;
        let isNowUnlocked = false;
        let currentVal = ach.currentValue;

        if (ach.id === 'first_code' && newStats.completedLessonIds.length >= 1) {
          isNowUnlocked = true;
          currentVal = 1;
        } else if (ach.id === 'streak_3' && newStats.streak >= 3) {
          isNowUnlocked = true;
          currentVal = newStats.streak;
        } else if (ach.id === 'streak_7' && newStats.streak >= 7) {
          isNowUnlocked = true;
          currentVal = newStats.streak;
        } else if (ach.id === 'bug_hunter' && newStats.completedChallengeIds.length >= 3) {
          isNowUnlocked = true;
          currentVal = newStats.completedChallengeIds.length;
        } else if (ach.id === 'xp_500' && newStats.xp >= 500) {
          isNowUnlocked = true;
          currentVal = newStats.xp;
        }

        if (isNowUnlocked && !ach.isUnlocked) {
          sound.playSuccess();
          addToast({
            title: `🏆 Conquista Desbloqueada: ${ach.title}`,
            message: `${ach.description} (+${ach.xpBonus} XP disponíveis)`,
            type: 'achievement',
          });
          return {
            ...ach,
            isUnlocked: true,
            currentValue: ach.targetValue,
            unlockedAt: new Date().toLocaleDateString('pt-BR'),
          };
        }
        return ach;
      });
    });
  };

  const updateDailyQuests = (type: 'lesson' | 'challenge' | 'xp', amount: number = 1) => {
    setDailyQuests((prev) => {
      return prev.map((q) => {
        if (q.isCompleted) return q;
        let newProg = q.progress;
        if (type === 'lesson' && q.type === 'complete_lesson') {
          newProg += amount;
        } else if (type === 'challenge' && q.type === 'solve_challenge') {
          newProg += amount;
        } else if (type === 'xp' && q.type === 'earn_xp') {
          newProg += amount;
        }

        const isNowCompleted = newProg >= q.target;
        if (isNowCompleted && !q.isCompleted) {
          sound.playSuccess();
          addToast({
            title: `🎯 Missão Concluída: ${q.title}`,
            message: `Você completou a missão diária! (+${q.xpReward} XP)`,
            type: 'info',
          });
        }
        return {
          ...q,
          progress: Math.min(q.target, newProg),
          isCompleted: isNowCompleted,
        };
      });
    });
  };

  const finishLesson = (lessonId: string, xpGained: number) => {
    const isFirstTime = !stats.completedLessonIds.includes(lessonId);
    const awardedXp = isFirstTime ? xpGained : Math.round(xpGained * 0.4);

    const oldLevel = levelInfo.currentLevel;
    const newXp = stats.xp + awardedXp;
    const newLevelInfo = calculateLevel(newXp);

    // Audio & Confetti
    sound.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#eab308', '#6366f1', '#10b981', '#ec4899'],
      });
    } catch {
      // Confetti fallback
    }

    addToast({
      title: 'Lição Concluída!',
      message: `Você ganhou +${awardedXp} XP de conhecimento!`,
      type: 'xp',
      xpAmount: awardedXp,
    });

    const updatedLessonIds = isFirstTime
      ? [...stats.completedLessonIds, lessonId]
      : stats.completedLessonIds;

    const newStats: UserStats = {
      ...stats,
      xp: newXp,
      level: newLevelInfo.currentLevel,
      levelTitle: newLevelInfo.title,
      gems: stats.gems + (isFirstTime ? 5 : 1),
      completedLessonIds: updatedLessonIds,
      totalExercisesAnswered: stats.totalExercisesAnswered + 1,
      correctAnswersCount: stats.correctAnswersCount + 1,
      accuracyRate: Math.min(
        100,
        Math.round(((stats.correctAnswersCount + 1) / (stats.totalExercisesAnswered + 1)) * 100)
      ),
    };

    setStats(newStats);
    checkAchievements(newStats);
    updateDailyQuests('lesson', 1);
    updateDailyQuests('xp', awardedXp);

    if (newLevelInfo.currentLevel > oldLevel) {
      setTimeout(() => {
        sound.playLevelUp();
        setLeveledUpTo(newLevelInfo.currentLevel);
        setIsLevelUpModalOpen(true);
        try {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
          });
        } catch {
          // Confetti fallback
        }
      }, 500);
    }
  };

  const startChallenge = (challenge: StandaloneChallenge) => {
    setSelectedChallenge(challenge);
    sound.playClick();
  };

  const finishChallenge = (challengeId: string, xpGained: number) => {
    const isFirstTime = !stats.completedChallengeIds.includes(challengeId);
    const awardedXp = isFirstTime ? xpGained : Math.round(xpGained * 0.3);

    const oldLevel = levelInfo.currentLevel;
    const newXp = stats.xp + awardedXp;
    const newLevelInfo = calculateLevel(newXp);

    sound.playSuccess();
    try {
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.7 },
      });
    } catch {
      // Confetti fallback
    }

    addToast({
      title: 'Desafio Superado!',
      message: `Você ganhou +${awardedXp} XP na Arena!`,
      type: 'xp',
      xpAmount: awardedXp,
    });

    const updatedChallengeIds = isFirstTime
      ? [...stats.completedChallengeIds, challengeId]
      : stats.completedChallengeIds;

    const newStats: UserStats = {
      ...stats,
      xp: newXp,
      level: newLevelInfo.currentLevel,
      levelTitle: newLevelInfo.title,
      gems: stats.gems + 8,
      completedChallengeIds: updatedChallengeIds,
      totalExercisesAnswered: stats.totalExercisesAnswered + 1,
      correctAnswersCount: stats.correctAnswersCount + 1,
    };

    setStats(newStats);
    checkAchievements(newStats);
    updateDailyQuests('challenge', 1);
    updateDailyQuests('xp', awardedXp);

    if (newLevelInfo.currentLevel > oldLevel) {
      setTimeout(() => {
        sound.playLevelUp();
        setLeveledUpTo(newLevelInfo.currentLevel);
        setIsLevelUpModalOpen(true);
      }, 500);
    }
  };

  const claimQuest = (questId: string) => {
    const quest = dailyQuests.find((q) => q.id === questId);
    if (!quest || !quest.isCompleted || quest.isClaimed) return;

    sound.playXPTick();
    setDailyQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, isClaimed: true } : q))
    );

    const newXp = stats.xp + quest.xpReward;
    const newLevelInfo = calculateLevel(newXp);

    addToast({
      title: 'Recompensa Coletada!',
      message: `+${quest.xpReward} XP e +${quest.gemsReward} Gemas adicionadas!`,
      type: 'xp',
    });

    setStats((prev) => ({
      ...prev,
      xp: newXp,
      gems: prev.gems + quest.gemsReward,
      level: newLevelInfo.currentLevel,
      levelTitle: newLevelInfo.title,
      claimedQuestIds: [...prev.claimedQuestIds, questId],
    }));
  };

  const claimAchievement = (achievementId: string) => {
    const ach = achievements.find((a) => a.id === achievementId);
    if (!ach || !ach.isUnlocked || stats.unlockedAchievementIds.includes(achievementId)) return;

    sound.playXPTick();
    const newXp = stats.xp + ach.xpBonus;
    const newLevelInfo = calculateLevel(newXp);

    addToast({
      title: 'Bônus de Conquista!',
      message: `+${ach.xpBonus} XP coletados com sucesso!`,
      type: 'xp',
    });

    setStats((prev) => ({
      ...prev,
      xp: newXp,
      level: newLevelInfo.currentLevel,
      levelTitle: newLevelInfo.title,
      unlockedAchievementIds: [...prev.unlockedAchievementIds, achievementId],
    }));
  };

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
    setLeveledUpTo(null);
  };

  const updateProfile = (name: string, avatar: string) => {
    setStats((prev) => ({
      ...prev,
      userName: name.trim() || 'Dev Explorador',
      avatar,
    }));
    sound.playClick();
    addToast({
      title: 'Perfil Atualizado',
      message: 'Suas preferências foram salvas com sucesso.',
      type: 'info',
    });
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStats(INITIAL_STATS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setDailyQuests(INITIAL_DAILY_QUESTS);
    setCurrentView('dashboard');
    sound.playClick();
    addToast({
      title: 'Progresso Reiniciado',
      message: 'Os dados foram restaurados para o padrão de demonstração.',
      type: 'info',
    });
  };

  return (
    <GameContext.Provider
      value={{
        stats,
        achievements,
        dailyQuests,
        currentView,
        activeTrackId,
        activeLesson,
        activeTrack,
        selectedChallenge,
        levelInfo,
        toasts,
        isLevelUpModalOpen,
        leveledUpTo,
        isSoundMuted,
        setView,
        selectTrack,
        startLesson,
        finishLesson,
        startChallenge,
        finishChallenge,
        claimQuest,
        claimAchievement,
        toggleSound,
        closeLevelUpModal,
        removeToast,
        updateProfile,
        resetProgress,
        getNextRecommendedLesson,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

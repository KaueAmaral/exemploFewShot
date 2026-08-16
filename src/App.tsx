import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/ToastContainer';
import { LevelUpModal } from './components/modals/LevelUpModal';

// Views
import { LandingPage } from './views/LandingPage';
import { DashboardView } from './views/DashboardView';
import { TracksView } from './views/TracksView';
import { LearningTrailView } from './views/LearningTrailView';
import { LessonView } from './views/LessonView';
import { ChallengesView } from './views/ChallengesView';
import { AchievementsView } from './views/AchievementsView';
import { ProgressView } from './views/ProgressView';
import { ProfileView } from './views/ProfileView';

const MainContent: React.FC = () => {
  const { currentView } = useGame();

  const isLanding = currentView === 'landing';
  const isLesson = currentView === 'lesson';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Container Layout */}
      {isLanding ? (
        <main className="flex-1 w-full">
          <LandingPage />
        </main>
      ) : (
        <div className="flex-1 flex w-full max-w-7xl mx-auto">
          {/* Desktop Sidebar (hidden during focused lesson or on small screens) */}
          {!isLesson && <Sidebar />}

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 pb-24 lg:pb-12">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'tracks' && <TracksView />}
            {currentView === 'trail' && <LearningTrailView />}
            {currentView === 'lesson' && <LessonView />}
            {currentView === 'challenges' && <ChallengesView />}
            {currentView === 'achievements' && <AchievementsView />}
            {currentView === 'progress' && <ProgressView />}
            {currentView === 'profile' && <ProfileView />}
          </main>
        </div>
      )}

      {/* Mobile Bottom Navigation (only when logged in / not on landing) */}
      {!isLanding && !isLesson && <MobileNav />}

      {/* Global Modals & Toast Alerts */}
      <LevelUpModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
}

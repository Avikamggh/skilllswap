import React, { useState } from 'react';
import { SwapProvider, useSwap } from './context/SwapContext';
import Navbar from './components/Navbar';
import PitchTourBanner from './components/PitchTourBanner';
import ProfileModal from './components/ProfileModal';
import HomePage from './pages/HomePage';
import ExploreMatches from './pages/ExploreMatches';
import MessagesPage from './pages/MessagesPage';
import SchedulerPage from './pages/SchedulerPage';
import SwapRoomPage from './pages/SwapRoomPage';
import DashboardPage from './pages/DashboardPage';
import CommunityPage from './pages/CommunityPage';
import { Sparkles, CheckCircle2, Info } from 'lucide-react';
import './App.css';

function MainLayout() {
  const { activeView, setActiveView, notification } = useSwap();
  const [searchQueryFromHome, setSearchQueryFromHome] = useState('');

  const handleSearchFromHome = (query) => {
    setSearchQueryFromHome(query);
    setActiveView('explore');
  };

  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <Navbar />

      {/* Guided Hackathon Pitch Tour Banner */}
      <PitchTourBanner />

      {/* Dynamic View Router */}
      <main className="main-content-area">
        {activeView === 'home' && (
          <HomePage onSelectSearchSkill={handleSearchFromHome} />
        )}
        {activeView === 'explore' && (
          <ExploreMatches initialQuery={searchQueryFromHome} />
        )}
        {activeView === 'messages' && (
          <MessagesPage />
        )}
        {activeView === 'scheduler' && (
          <SchedulerPage />
        )}
        {activeView === 'room' && (
          <SwapRoomPage />
        )}
        {activeView === 'dashboard' && (
          <DashboardPage />
        )}
        {activeView === 'community' && (
          <CommunityPage />
        )}
      </main>

      {/* Global Edit Profile Modal */}
      <ProfileModal />

      {/* Global Toast Notification */}
      {notification && (
        <div className="toast-notification">
          {notification.type === 'info' ? (
            <Info size={18} className="cyan-text" />
          ) : (
            <CheckCircle2 size={18} className="emerald-text" />
          )}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <SwapProvider>
      <MainLayout />
    </SwapProvider>
  );
}

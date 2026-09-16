import React from 'react';
import { useSwap } from '../context/SwapContext';
import {
  Sparkles,
  Compass,
  MessageSquare,
  Calendar,
  Video,
  LayoutDashboard,
  Users,
  RotateCcw,
  UserCheck,
  Flame,
  Award
} from 'lucide-react';

export default function Navbar() {
  const {
    activeView,
    setActiveView,
    currentUser,
    conversations,
    sessions,
    setIsProfileModalOpen,
    pitchTourStep,
    setPitchTourStep,
    resetDemoData
  } = useSwap();

  // Count unread / pending interactions
  const pendingSessionsCount = sessions.filter(s => s.status === 'scheduled').length;

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Left: Brand Logo */}
        <div className="navbar-brand" onClick={() => setActiveView('home')}>
          <div className="brand-logo-icon">
            <Sparkles size={20} className="brand-icon-spin" />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">
              SKILL <span className="brand-highlight">SWAP</span>
            </span>
            <span className="brand-tagline">Knowledge is the currency</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="navbar-nav">
          <button
            className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => setActiveView('home')}
          >
            Overview
          </button>
          <button
            className={`nav-link ${activeView === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveView('explore')}
          >
            <Compass size={16} />
            Smart Match
          </button>
          <button
            className={`nav-link ${activeView === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveView('messages')}
          >
            <MessageSquare size={16} />
            Messages
            <span className="nav-badge-pill">2</span>
          </button>
          <button
            className={`nav-link ${activeView === 'scheduler' ? 'active' : ''}`}
            onClick={() => setActiveView('scheduler')}
          >
            <Calendar size={16} />
            Sessions
            {pendingSessionsCount > 0 && (
              <span className="nav-badge-pill cyan">{pendingSessionsCount}</span>
            )}
          </button>
          <button
            className={`nav-link ${activeView === 'room' ? 'active' : ''}`}
            onClick={() => setActiveView('room')}
          >
            <Video size={16} />
            Live Room
          </button>
          <button
            className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            <LayoutDashboard size={16} />
            Tracker
          </button>
          <button
            className={`nav-link ${activeView === 'community' ? 'active' : ''}`}
            onClick={() => setActiveView('community')}
          >
            <Users size={16} />
            Community
          </button>
        </nav>

        {/* Right Actions: Pitch Tour CTA, User Pill & Reset */}
        <div className="navbar-right">
          {/* Hackathon Pitch Demo Mode Button */}
          <button
            className={`btn btn-sm ${pitchTourStep > 0 ? 'btn-cyan' : 'btn-outline-purple'}`}
            onClick={() => setPitchTourStep(prev => (prev === 0 ? 1 : 0))}
            title="Interactive Hackathon Pitch Demo Walkthrough"
          >
            <Sparkles size={15} />
            {pitchTourStep > 0 ? `Demo Flow (${pitchTourStep}/5)` : 'Pitch Demo'}
          </button>

          {/* User Profile Pill */}
          <div
            className="user-profile-pill"
            onClick={() => setIsProfileModalOpen(true)}
            title="Click to edit your skills and availability"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="user-avatar"
            />
            <div className="user-info-text">
              <span className="user-name">{currentUser.name.split(' ')[0]}</span>
              <span className="user-karma">
                <Flame size={12} className="karma-icon" /> {currentUser.karmaPoints} karma
              </span>
            </div>
          </div>

          {/* Reset Demo Data Button */}
          <button
            className="btn-icon-ghost"
            onClick={resetDemoData}
            title="Reset to initial pitch deck demo state"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

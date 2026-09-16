import React from 'react';
import { useSwap } from '../context/SwapContext';
import {
  Award,
  Clock,
  Flame,
  Star,
  BookOpen,
  ArrowRightLeft,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Calendar
} from 'lucide-react';

export default function DashboardPage() {
  const { currentUser, sessions, setActiveView, setIsProfileModalOpen } = useSwap();

  const completedSessions = sessions.filter(s => s.status === 'completed');

  return (
    <div className="dashboard-page-container container">
      {/* Top Welcome / Header */}
      <div className="dashboard-header-row">
        <div className="dashboard-user-hero">
          <img src={currentUser.avatar} alt={currentUser.name} className="dash-avatar" />
          <div>
            <div className="badge-hackathon">04 LEARNING TRACKER & TRUST</div>
            <h1 className="dash-title">Welcome back, {currentUser.name}!</h1>
            <p className="dash-subtitle">
              {currentUser.title} • Knowledge Portfolio & Reputation
            </p>
          </div>
        </div>

        <button
          className="btn btn-outline-purple"
          onClick={() => setIsProfileModalOpen(true)}
        >
          Edit Skills & Goals
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="stats-metric-grid">
        <div className="stat-card glass-card">
          <div className="stat-icon-wrap violet">
            <Clock size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Hours Exchanged</span>
            <h2 className="stat-number">{currentUser.hoursExchanged} hrs</h2>
            <span className="stat-sub">Equal 1:1 barter ratio</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-wrap cyan">
            <ArrowRightLeft size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Completed Swaps</span>
            <h2 className="stat-number">{currentUser.swapsCompleted} swaps</h2>
            <span className="stat-sub">100% completion rate</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-wrap amber">
            <Flame size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Karma & Trust</span>
            <h2 className="stat-number">{currentUser.karmaPoints} pts</h2>
            <span className="stat-sub">Top 5% verified swapper</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-icon-wrap emerald">
            <Star size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Reputation Score</span>
            <h2 className="stat-number">★ {currentUser.rating}</h2>
            <span className="stat-sub">Based on {currentUser.reviewCount} peer reviews</span>
          </div>
        </div>
      </div>

      {/* Learning Roadmap vs Teaching Offerings */}
      <div className="dashboard-two-col-grid">
        {/* Left: Skills You Are Learning */}
        <div className="dash-panel glass-card">
          <div className="dash-panel-header">
            <div className="panel-title-group">
              <BookOpen size={18} className="cyan-text" />
              <h3>Skills In Progress (Learning)</h3>
            </div>
            <span className="badge badge-learn">Needs</span>
          </div>

          <div className="skills-roadmap-list">
            {(currentUser.wantsToLearn || []).map((skill, idx) => (
              <div key={skill} className="roadmap-item">
                <div className="roadmap-left">
                  <div className="roadmap-dot" />
                  <div>
                    <strong className="roadmap-skill">{skill}</strong>
                    <p className="roadmap-notes">Active swaps scheduled with peer mentors</p>
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setActiveView('explore')}
                >
                  Find Mentors
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Skills You Are Teaching */}
        <div className="dash-panel glass-card">
          <div className="dash-panel-header">
            <div className="panel-title-group">
              <Sparkles size={18} className="violet-text" />
              <h3>Skills You Barter (Teaching)</h3>
            </div>
            <span className="badge badge-teach">Offerings</span>
          </div>

          <div className="skills-roadmap-list">
            {(currentUser.canTeach || []).map(skill => (
              <div key={skill} className="roadmap-item">
                <div className="roadmap-left">
                  <div className="roadmap-dot teach" />
                  <div>
                    <strong className="roadmap-skill">{skill}</strong>
                    <p className="roadmap-notes">Mastery level • {currentUser.teachLevel}</p>
                  </div>
                </div>
                <span className="badge badge-teach">Verified</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges & Trust Achievements */}
      <div className="dash-panel glass-card" style={{ marginTop: '24px' }}>
        <div className="dash-panel-header">
          <div className="panel-title-group">
            <Award size={18} className="amber-text" />
            <h3>Trust Badges & Reputation Unlocked</h3>
          </div>
          <span className="badge badge-score">Trust Level 3</span>
        </div>

        <div className="badges-list-grid">
          {(currentUser.badges || []).map(b => (
            <div key={b} className="badge-card">
              <div className="badge-icon-disc">
                <Award size={20} />
              </div>
              <strong className="badge-name">{b}</strong>
              <span className="badge-desc">Awarded for punctuality & exceptional mentorship</span>
            </div>
          ))}
          <div className="badge-card locked">
            <div className="badge-icon-disc locked">
              <Sparkles size={20} />
            </div>
            <strong className="badge-name">Master Swapper</strong>
            <span className="badge-desc">Complete 10 swaps to unlock (+2 swaps left)</span>
          </div>
        </div>
      </div>

      {/* Recent Reviews Received */}
      <div className="dash-panel glass-card" style={{ marginTop: '24px' }}>
        <div className="dash-panel-header">
          <div className="panel-title-group">
            <Star size={18} className="amber-text" />
            <h3>Verified Peer Testimonials</h3>
          </div>
          <span className="badge badge-online">Verified Exchanges</span>
        </div>

        <div className="reviews-list">
          {(currentUser.reviews || []).map(rev => (
            <div key={rev.id} className="testimonial-card">
              <div className="testimonial-header">
                <div>
                  <strong>{rev.author}</strong>
                  <span className="rev-skill-tag">• {rev.skill}</span>
                </div>
                <div className="stars-row">
                  {'★'.repeat(rev.rating)}
                </div>
              </div>
              <p className="testimonial-body">"{rev.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

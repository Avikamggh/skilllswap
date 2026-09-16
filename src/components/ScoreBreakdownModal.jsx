import React from 'react';
import { useSwap } from '../context/SwapContext';
import { X, Sparkles, CheckCircle2, Clock, Globe, Award, Zap, ArrowRightLeft } from 'lucide-react';

export default function ScoreBreakdownModal({ peer, onClose, onPropose }) {
  const { currentUser, calculateMatchDetails } = useSwap();

  if (!peer) return null;

  const details = calculateMatchDetails(peer);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container score-modal-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="score-circle-badge">
              <span className="score-number">{details.totalScore}%</span>
              <span className="score-sub">MATCH</span>
            </div>
            <div>
              <div className="match-title-row">
                <h2 className="modal-title">Smart Match Breakdown</h2>
                <span className="badge badge-score">Slide 05 Algorithm</span>
              </div>
              <p className="modal-subtitle">
                Calculating reciprocal barter compatibility between <strong>{currentUser.name}</strong> and <strong>{peer.name}</strong>
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Algorithm Formula Banner */}
        <div className="formula-banner">
          <span className="formula-tag">ENGINE FORMULA</span>
          <code>Match Score = fit (40%) + availability (25%) + goals (20%) + reputation (15%)</code>
        </div>

        {/* Reciprocal Skills Exchange Highlight */}
        <div className="exchange-preview-box">
          <div className="exchange-user-col">
            <span className="exchange-label">YOU TEACH</span>
            <div className="exchange-skill-pill teach">
              {details.mutualGive.join(', ')}
            </div>
          </div>
          <div className="exchange-swap-icon">
            <ArrowRightLeft size={22} className="swap-rotate-icon" />
          </div>
          <div className="exchange-user-col">
            <span className="exchange-label">{peer.name.split(' ')[0].toUpperCase()} TEACHES</span>
            <div className="exchange-skill-pill learn">
              {details.mutualGet.join(', ')}
            </div>
          </div>
        </div>

        {/* 4 Signals Detailed Breakdown */}
        <div className="signal-cards-list">
          {/* 1. Skill Fit */}
          <div className="signal-card">
            <div className="signal-header">
              <div className="signal-title-group">
                <Zap size={17} className="signal-icon violet" />
                <span className="signal-name">1. Skills & Interests Fit (Max 40 pts)</span>
              </div>
              <span className="signal-points">{details.fitScore} / 40 pts</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill fill-violet"
                style={{ width: `${(details.fitScore / 40) * 100}%` }}
              />
            </div>
            <p className="signal-note">
              High reciprocal synergy: Both peers have skills the other is actively looking to acquire.
            </p>
          </div>

          {/* 2. Availability */}
          <div className="signal-card">
            <div className="signal-header">
              <div className="signal-title-group">
                <Clock size={17} className="signal-icon cyan" />
                <span className="signal-name">2. Schedule & Time Slots (Max 25 pts)</span>
              </div>
              <span className="signal-points">{details.availScore} / 25 pts</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill fill-cyan"
                style={{ width: `${(details.availScore / 25) * 100}%` }}
              />
            </div>
            <p className="signal-note">
              Mutual free slots: <strong>{(peer.availability || []).join(', ')}</strong>.
            </p>
          </div>

          {/* 3. Location / Mode & Goals */}
          <div className="signal-card">
            <div className="signal-header">
              <div className="signal-title-group">
                <Globe size={17} className="signal-icon emerald" />
                <span className="signal-name">3. Learning Goals & Mode (Max 20 pts)</span>
              </div>
              <span className="signal-points">{details.goalsScore} / 20 pts</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill fill-emerald"
                style={{ width: `${(details.goalsScore / 20) * 100}%` }}
              />
            </div>
            <p className="signal-note">
              Preferred learning format: {peer.mode}. Shared focus on {(peer.goals || []).join(' & ')}.
            </p>
          </div>

          {/* 4. Reputation & Trust */}
          <div className="signal-card">
            <div className="signal-header">
              <div className="signal-title-group">
                <Award size={17} className="signal-icon amber" />
                <span className="signal-name">4. Reputation & Feedback Track (Max 15 pts)</span>
              </div>
              <span className="signal-points">{details.repScore} / 15 pts</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill fill-amber"
                style={{ width: `${(details.repScore / 15) * 100}%` }}
              />
            </div>
            <p className="signal-note">
              ★ {peer.rating} rating across {peer.reviewCount || 0} reviews, {peer.swapsCompleted || 0} completed swaps, {peer.karmaPoints || 0} karma points.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              if (onPropose) onPropose(peer);
            }}
          >
            <Sparkles size={16} /> Propose 45-Min Swap with {peer.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  );
}

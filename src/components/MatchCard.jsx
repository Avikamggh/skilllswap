import React from 'react';
import { useSwap } from '../context/SwapContext';
import {
  Sparkles,
  ArrowRightLeft,
  Star,
  Clock,
  Globe,
  Award,
  MessageSquare,
  Calendar
} from 'lucide-react';

export default function MatchCard({ peer, onInspect, onPropose }) {
  const { currentUser, calculateMatchDetails, setActiveChatPeerId, setActiveView } = useSwap();

  const details = calculateMatchDetails(peer);

  const handleStartChat = () => {
    setActiveChatPeerId(peer.id);
    setActiveView('messages');
  };

  return (
    <div className="match-card glass-card">
      {/* Card Header: Score Badge & Status */}
      <div className="match-card-top">
        <div className="match-score-pill" onClick={() => onInspect(peer)} title="Click to view full algorithm breakdown">
          <Sparkles size={14} className="sparkle-icon" />
          <span className="score-val">{details.totalScore}%</span>
          <span className="score-lbl">MATCH</span>
        </div>

        <div className="rating-pill">
          <Star size={13} className="star-icon-solid" />
          <span>{peer.rating}</span>
          <span className="review-count">({peer.reviewCount})</span>
        </div>
      </div>

      {/* Peer Profile Summary */}
      <div className="match-profile-row">
        <img src={peer.avatar} alt={peer.name} className="peer-avatar-img" />
        <div className="peer-title-col">
          <h3 className="peer-name">{peer.name}</h3>
          <p className="peer-headline">{peer.title}</p>
          <div className="peer-meta-pills">
            <span className="badge badge-online">{peer.mode}</span>
            <span className="meta-text">{peer.location.split('•')[1] || peer.location}</span>
          </div>
        </div>
      </div>

      {/* Reciprocal Barter Strip */}
      <div className="reciprocal-strip">
        <div className="strip-item strip-teach">
          <span className="strip-label">THEY TEACH</span>
          <div className="strip-tags">
            {peer.canTeach.slice(0, 2).map(skill => (
              <span key={skill} className="skill-chip teach-chip small">
                {skill}
              </span>
            ))}
            {peer.canTeach.length > 2 && (
              <span className="chip-more">+{peer.canTeach.length - 2}</span>
            )}
          </div>
        </div>

        <div className="strip-divider">
          <ArrowRightLeft size={16} />
        </div>

        <div className="strip-item strip-learn">
          <span className="strip-label">THEY WANT</span>
          <div className="strip-tags">
            {peer.wantsToLearn.slice(0, 2).map(skill => (
              <span key={skill} className="skill-chip learn-chip small">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Match Signals Bar (Slide 05: fit + availability + goals + reputation) */}
      <div className="match-signals-preview" onClick={() => onInspect(peer)}>
        <div className="signal-mini">
          <span className="sig-name">Fit:</span>
          <span className="sig-val">{details.fitScore}/40</span>
        </div>
        <div className="signal-mini">
          <span className="sig-name">Avail:</span>
          <span className="sig-val">{details.availScore}/25</span>
        </div>
        <div className="signal-mini">
          <span className="sig-name">Goals:</span>
          <span className="sig-val">{details.goalsScore}/20</span>
        </div>
        <div className="signal-mini">
          <span className="sig-name">Rep:</span>
          <span className="sig-val">{details.repScore}/15</span>
        </div>
      </div>

      {/* Bio snippet */}
      <p className="peer-bio-snippet">{peer.bio}</p>

      {/* Card Footer Actions */}
      <div className="match-card-actions">
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => onInspect(peer)}
          title="See Slide 05 matching breakdown"
        >
          Algorithm Breakdown
        </button>

        <div className="action-btn-group">
          <button
            className="btn btn-sm btn-outline-purple"
            onClick={handleStartChat}
            title="Chat with peer"
          >
            <MessageSquare size={14} />
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onPropose(peer)}
          >
            <Calendar size={14} /> Propose Swap
          </button>
        </div>
      </div>
    </div>
  );
}

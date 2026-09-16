import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { Star, Award, CheckCircle2, Flame, Heart, Sparkles, X } from 'lucide-react';

export default function RatingModal({ session, onClose, onFinish }) {
  const { completeSession, peers } = useSwap();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState(['Super Patient', 'Clear Explanations']);
  const [reviewText, setReviewText] = useState('');

  if (!session) return null;

  const peer = peers.find(p => p.id === session.peerId) || {
    name: session.peerName,
    id: session.peerId
  };

  const tagOptions = [
    'Super Patient',
    'Clear Explanations',
    'Great Live Demos',
    'Well Prepared',
    'Kind & Encouraging',
    'Practical & Hands-on',
    'Punctual & Reliable'
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeSession(session.id, {
      peerId: peer.id,
      rating,
      skillReviewed: session.peerOffering,
      tags: selectedTags,
      text: reviewText.trim() || `Incredible swap session! ${peer.name.split(' ')[0]} explained ${session.peerOffering} with great clarity.`
    });

    if (onFinish) onFinish();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container rating-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-icon-badge amber">
              <Award size={20} />
            </div>
            <div>
              <h2 className="modal-title">Rate Your Swap Session</h2>
              <p className="modal-subtitle">
                Build trust & reputation for <strong>{session.peerName}</strong>
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-form">
          {/* Karma Reward Announcement */}
          <div className="karma-reward-banner">
            <Flame size={20} className="reward-flame" />
            <div>
              <strong>+35 Karma Points & 45 Mins Exchanged</strong>
              <p>Completing swaps boosts your standing in the Smart Matching algorithm!</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="form-group text-center">
            <label>How was your learning experience?</label>
            <div className="star-rating-row">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  className="star-btn"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={32}
                    className={`star-icon ${(hoverRating || rating) >= star ? 'filled' : ''}`}
                  />
                </button>
              ))}
            </div>
            <span className="star-feedback-label">
              {rating === 5 ? 'Exceptional! (5.0 / 5.0)' : rating === 4 ? 'Very Good! (4.0 / 5.0)' : 'Good Swap Session'}
            </span>
          </div>

          {/* Endorsement Tags */}
          <div className="form-group">
            <label>Endorse {peer.name.split(' ')[0]}'s Teaching Qualities</label>
            <div className="endorsement-chips-grid">
              {tagOptions.map(tag => (
                <button
                  type="button"
                  key={tag}
                  className={`endorse-chip ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  <Sparkles size={12} />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="form-group">
            <label>Public Feedback & Review</label>
            <textarea
              className="textarea-field"
              rows={3}
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder={`Share what you learned from ${peer.name.split(' ')[0]} during this swap session...`}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Skip For Now
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} /> Submit Review & Claim +35 Karma
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

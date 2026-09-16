import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { X, ArrowRightLeft, Clock, Calendar, Send, Sparkles } from 'lucide-react';

export default function ProposalModal({ peer, onClose, onSuccess }) {
  const { currentUser, sendProposal, setActiveChatPeerId, setActiveView } = useSwap();

  const [userOffering, setUserOffering] = useState(currentUser.canTeach?.[0] || 'Python Programming');
  const [peerOffering, setPeerOffering] = useState(peer?.canTeach?.[0] || 'UI/UX Design');
  const [duration, setDuration] = useState('45 mins (22.5m each)');
  const [time, setTime] = useState('Tomorrow • 6:00 PM IST');
  const [notes, setNotes] = useState(
    `Excited to swap! Let's spend the first half on ${userOffering} and the second half on ${peerOffering}.`
  );

  if (!peer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sendProposal(peer.id, {
      userOffering,
      peerOffering,
      duration,
      time,
      notes,
      mode: peer.mode || 'Online Room'
    });

    if (onSuccess) onSuccess();
    onClose();

    // Automatically navigate to messages to see proposal
    setActiveChatPeerId(peer.id);
    setActiveView('messages');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container proposal-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-icon-badge">
              <ArrowRightLeft size={20} />
            </div>
            <div>
              <h2 className="modal-title">Propose Skill Swap Session</h2>
              <p className="modal-subtitle">
                Set up an equitable 2-way barter session with <strong>{peer.name}</strong>
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-form">
          {/* Swap Exchange Setup */}
          <div className="proposal-exchange-grid">
            <div className="form-group">
              <label className="badge-inline badge-teach">YOU WILL TEACH</label>
              <select
                className="select-field"
                value={userOffering}
                onChange={e => setUserOffering(e.target.value)}
              >
                {(currentUser.canTeach || []).map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            <div className="swap-icon-divider">
              <ArrowRightLeft size={18} />
            </div>

            <div className="form-group">
              <label className="badge-inline badge-learn">{peer.name.split(' ')[0].toUpperCase()} TEACHES</label>
              <select
                className="select-field"
                value={peerOffering}
                onChange={e => setPeerOffering(e.target.value)}
              >
                {(peer.canTeach || []).map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Session Duration (Slide 08: 45 min default) */}
          <div className="form-group">
            <label><Clock size={14} /> Session Format & Duration</label>
            <div className="duration-options-grid">
              {[
                { label: '30 mins', sub: '15m each', val: '30 mins (15m each)' },
                { label: '45 mins (Recommended)', sub: '22.5m each', val: '45 mins (22.5m each)' },
                { label: '60 mins', sub: '30m each', val: '60 mins (30m each)' }
              ].map(opt => (
                <button
                  type="button"
                  key={opt.val}
                  className={`duration-card ${duration === opt.val ? 'selected' : ''}`}
                  onClick={() => setDuration(opt.val)}
                >
                  <span className="dur-main">{opt.label}</span>
                  <span className="dur-sub">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Proposed Date / Time */}
          <div className="form-group">
            <label><Calendar size={14} /> Proposed Day & Time Slot</label>
            <input
              type="text"
              className="input-field"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="e.g. Tomorrow • 6:00 PM IST or Saturday Morning"
              required
            />
            <span className="field-hint">
              Partner is available: {(peer.availability || []).join(', ')}
            </span>
          </div>

          {/* Notes & Agenda */}
          <div className="form-group">
            <label>Session Agenda & Preparation Notes</label>
            <textarea
              className="textarea-field"
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Share what specific goals you want to tackle together..."
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={15} /> Send Swap Proposal to {peer.name.split(' ')[0]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

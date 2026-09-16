import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import ProposalModal from '../components/ProposalModal';
import {
  Calendar,
  Clock,
  Video,
  ArrowRightLeft,
  CheckCircle2,
  AlertCircle,
  Plus,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function SchedulerPage() {
  const {
    sessions,
    peers,
    setActiveRoomSessionId,
    setActiveView,
    currentUser
  } = useSwap();

  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed'
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [selectedBookingPeer, setSelectedBookingPeer] = useState(peers[0]);

  const upcomingSessions = sessions.filter(s => s.status !== 'completed');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  const displayed = activeTab === 'upcoming' ? upcomingSessions : completedSessions;

  const handleJoinRoom = (session) => {
    setActiveRoomSessionId(session.id);
    setActiveView('room');
  };

  return (
    <div className="scheduler-page-container container">
      {/* Top Banner */}
      <div className="scheduler-header-row">
        <div>
          <div className="badge-hackathon">04 SESSION SCHEDULER</div>
          <h1 className="page-title">Session Calendar & Time Slots</h1>
          <p className="page-subtitle">
            Manage your reciprocal knowledge swaps, time splits, and live meeting rooms.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsNewBookingModalOpen(true)}
        >
          <Plus size={16} /> Schedule New Swap
        </button>
      </div>

      {/* Tabs */}
      <div className="scheduler-tabs-row">
        <button
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Swaps ({upcomingSessions.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Archive ({completedSessions.length})
        </button>
      </div>

      {/* Sessions Grid */}
      {displayed.length > 0 ? (
        <div className="sessions-list-grid">
          {displayed.map(session => {
            const isCompleted = session.status === 'completed';

            return (
              <div key={session.id} className="session-card glass-card">
                {/* Header */}
                <div className="session-card-header">
                  <div className="session-partner-info">
                    <img
                      src={session.peerAvatar}
                      alt={session.peerName}
                      className="session-avatar"
                    />
                    <div>
                      <h3 className="session-partner-name">{session.peerName}</h3>
                      <span className="session-mode-badge">{session.mode}</span>
                    </div>
                  </div>

                  <div className="session-time-badge">
                    <Clock size={14} />
                    <span>{session.durationMinutes} min swap ({session.userTeachingMinutes}m each)</span>
                  </div>
                </div>

                {/* Reciprocal Split Details */}
                <div className="reciprocal-agenda-box">
                  <div className="agenda-half user-half">
                    <span className="agenda-label">FIRST {session.userTeachingMinutes} MINS</span>
                    <strong className="agenda-topic">You teach: {session.userOffering}</strong>
                  </div>

                  <div className="agenda-divider">
                    <ArrowRightLeft size={16} />
                  </div>

                  <div className="agenda-half peer-half">
                    <span className="agenda-label">SECOND {session.peerTeachingMinutes} MINS</span>
                    <strong className="agenda-topic">{session.peerName.split(' ')[0]} teaches: {session.peerOffering}</strong>
                  </div>
                </div>

                {/* Date, Time & Notes */}
                <div className="session-meta-row">
                  <div className="meta-time-item">
                    <Calendar size={15} className="cyan-text" />
                    <span>{session.date} • {session.time}</span>
                  </div>
                </div>

                {session.notes && (
                  <p className="session-notes-snippet">
                    <strong>Prep Agenda:</strong> {session.notes}
                  </p>
                )}

                {/* Card Actions */}
                <div className="session-card-actions">
                  {isCompleted ? (
                    <div className="completed-badge-pill">
                      <CheckCircle2 size={16} /> Completed & Verified (+35 Karma)
                    </div>
                  ) : (
                    <>
                      <div className="ready-indicator">
                        <span className="live-pulse-dot" />
                        Room Ready
                      </div>
                      <button
                        className="btn btn-cyan btn-join"
                        onClick={() => handleJoinRoom(session)}
                      >
                        <Video size={16} /> Enter Live Swap Room
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-matches-box glass-card">
          <Calendar size={48} className="empty-icon" />
          <h3>No {activeTab} swap sessions</h3>
          <p>Schedule your first complementary knowledge exchange from the Smart Match tab!</p>
          <button
            className="btn btn-primary"
            onClick={() => setActiveView('explore')}
          >
            Find a Swap Partner
          </button>
        </div>
      )}

      {/* New Booking Modal */}
      {isNewBookingModalOpen && (
        <ProposalModal
          peer={selectedBookingPeer}
          onClose={() => setIsNewBookingModalOpen(false)}
          onSuccess={() => setIsNewBookingModalOpen(false)}
        />
      )}
    </div>
  );
}

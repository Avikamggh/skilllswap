import React, { useState, useEffect } from 'react';
import { useSwap } from '../context/SwapContext';
import RatingModal from '../components/RatingModal';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Share2,
  PhoneOff,
  Play,
  Pause,
  RotateCcw,
  Clock,
  ArrowRightLeft,
  CheckCircle2,
  Sparkles,
  FileCode2,
  FileText,
  Send
} from 'lucide-react';

export default function SwapRoomPage() {
  const {
    sessions,
    activeRoomSessionId,
    currentUser,
    setActiveView
  } = useSwap();

  const currentSession = sessions.find(s => s.id === activeRoomSessionId) || sessions[0] || {
    id: 'demo-session',
    peerName: 'Ananya Rao',
    peerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    userOffering: 'Python Automation Scripts',
    peerOffering: 'Figma Auto-layout & Design Systems',
    durationMinutes: 45,
    userTeachingMinutes: 22.5,
    peerTeachingMinutes: 22.5,
    status: 'scheduled'
  };

  // Live media toggles
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Reciprocal Timer state
  // Phase: 'user_teaching' (Phase 1) | 'peer_teaching' (Phase 2)
  const [timerPhase, setTimerPhase] = useState('user_teaching');
  const [secondsRemaining, setSecondsRemaining] = useState(22 * 60 + 30); // 22m 30s
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Shared Scratchpad state
  const [scratchpadTab, setScratchpadTab] = useState('notes'); // 'notes' | 'code'
  const [sharedNotes, setSharedNotes] = useState(
    `# Swap Agenda: Python <-> UI/UX Design\n\n- Part 1 (First 22.5m): ${currentUser.name} walks through Python BeautifulSoup & automation.\n- Part 2 (Second 22.5m): ${currentSession.peerName} audits Figma design tokens and responsive constraints.\n\nKey takeaways:\n- Use auto-layout with min/max widths for scalable cards.\n- Clean async requests in Python prevent rate limiting.`
  );
  const [sharedCode, setSharedCode] = useState(
    `# Live Python Demo:\nimport requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_skill_topics(url):\n    response = requests.get(url)\n    soup = BeautifulSoup(response.text, 'html.parser')\n    return [h2.text for h2 in soup.find_all('h2')]\n\nprint("Script ready for execution!")`
  );

  // Rating Modal state
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  // Timer Tick
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      if (timerPhase === 'user_teaching') {
        // Switch to phase 2 automatically
        setTimerPhase('peer_teaching');
        setSecondsRemaining(22 * 60 + 30);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining, timerPhase]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const handleSwitchPhase = () => {
    if (timerPhase === 'user_teaching') {
      setTimerPhase('peer_teaching');
      setSecondsRemaining(22 * 60 + 30);
    } else {
      setTimerPhase('user_teaching');
      setSecondsRemaining(22 * 60 + 30);
    }
  };

  return (
    <div className="swap-room-container container">
      {/* Top Session Bar */}
      <div className="room-header-bar glass-card">
        <div className="room-title-group">
          <div className="live-pill">
            <span className="live-pulse-dot" /> LIVE SWAP ROOM
          </div>
          <div>
            <h2 className="room-session-name">
              {currentSession.userOffering} &harr; {currentSession.peerOffering}
            </h2>
            <span className="room-participants-sub">
              With <strong>{currentSession.peerName}</strong> • Equal 45 Min Reciprocal Exchange
            </span>
          </div>
        </div>

        {/* Central Reciprocal Split Timer */}
        <div className="reciprocal-timer-box">
          <div className="timer-phase-indicator">
            {timerPhase === 'user_teaching' ? (
              <span className="badge badge-teach">
                PHASE 1: You are teaching ({currentUser.name})
              </span>
            ) : (
              <span className="badge badge-learn">
                PHASE 2: {currentSession.peerName.split(' ')[0]} is teaching
              </span>
            )}
          </div>

          <div className="timer-clock-display">
            <Clock size={18} className="cyan-text" />
            <span className="timer-digits">{formatTime(secondsRemaining)}</span>
          </div>

          <div className="timer-controls">
            <button
              className="timer-ctrl-btn"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
            >
              {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              className="timer-ctrl-btn"
              onClick={handleSwitchPhase}
              title="Switch to next peer's turn"
            >
              <ArrowRightLeft size={14} />
            </button>
          </div>
        </div>

        {/* Finish & Rate CTA */}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsRatingModalOpen(true)}
        >
          <CheckCircle2 size={16} /> Complete & Rate Peer
        </button>
      </div>

      {/* Main Room Grid: Left Video Streams, Right Shared Workspace */}
      <div className="room-main-grid">
        {/* Left: Dual Video Feeds */}
        <div className="video-feeds-col">
          {/* Peer Stream */}
          <div className="video-card peer-video-card">
            <div className="video-inner">
              <img
                src={currentSession.peerAvatar}
                alt={currentSession.peerName}
                className="video-avatar-large"
              />
              <div className="video-audio-wave">
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
              </div>
            </div>
            <div className="video-overlay-bottom">
              <span className="video-label">{currentSession.peerName}</span>
              <span className="video-role-tag">
                {timerPhase === 'peer_teaching' ? '🎓 Currently Teaching' : '✍️ Taking Notes'}
              </span>
            </div>
          </div>

          {/* User Stream */}
          <div className="video-card user-video-card">
            <div className="video-inner">
              {cameraOn ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="video-avatar-large"
                />
              ) : (
                <div className="camera-off-placeholder">Camera Off</div>
              )}
            </div>
            <div className="video-overlay-bottom">
              <span className="video-label">{currentUser.name} (You)</span>
              <span className="video-role-tag">
                {timerPhase === 'user_teaching' ? '🎓 Currently Teaching' : '✍️ Taking Notes'}
              </span>
            </div>
          </div>

          {/* Media Controls Bar */}
          <div className="room-controls-bar glass-card">
            <button
              className={`ctrl-btn ${micOn ? 'active' : 'muted'}`}
              onClick={() => setMicOn(!micOn)}
              title={micOn ? 'Mute Mic' : 'Unmute Mic'}
            >
              {micOn ? <Mic size={18} /> : <MicOff size={18} />}
            </button>
            <button
              className={`ctrl-btn ${cameraOn ? 'active' : 'muted'}`}
              onClick={() => setCameraOn(!cameraOn)}
              title={cameraOn ? 'Stop Camera' : 'Start Camera'}
            >
              {cameraOn ? <VideoIcon size={18} /> : <VideoOff size={18} />}
            </button>
            <button
              className={`ctrl-btn ${isScreenSharing ? 'active-cyan' : ''}`}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              title="Share Screen"
            >
              <Share2 size={18} />
            </button>
            <button
              className="ctrl-btn btn-leave"
              onClick={() => setIsRatingModalOpen(true)}
              title="Finish Session"
            >
              <PhoneOff size={18} />
            </button>
          </div>
        </div>

        {/* Right: Collaborative Real-time Workspace */}
        <div className="workspace-col glass-card">
          <div className="workspace-header">
            <div className="workspace-tabs">
              <button
                className={`w-tab-btn ${scratchpadTab === 'notes' ? 'active' : ''}`}
                onClick={() => setScratchpadTab('notes')}
              >
                <FileText size={15} /> Shared Notes & Takeaways
              </button>
              <button
                className={`w-tab-btn ${scratchpadTab === 'code' ? 'active' : ''}`}
                onClick={() => setScratchpadTab('code')}
              >
                <FileCode2 size={15} /> Code & Wireframe Pad
              </button>
            </div>
            <span className="synced-badge">
              <span className="status-dot-active" /> Auto-syncing
            </span>
          </div>

          <div className="workspace-body">
            {scratchpadTab === 'notes' ? (
              <textarea
                className="shared-textarea"
                value={sharedNotes}
                onChange={e => setSharedNotes(e.target.value)}
                placeholder="Type mutual notes, links, or questions here in real-time..."
              />
            ) : (
              <textarea
                className="shared-textarea code-font"
                value={sharedCode}
                onChange={e => setSharedCode(e.target.value)}
                placeholder="Paste code snippets or prompt templates here..."
              />
            )}
          </div>

          <div className="workspace-footer">
            <span className="footer-hint">
              Both you and {currentSession.peerName.split(' ')[0]} have real-time collaborative write access.
            </span>
          </div>
        </div>
      </div>

      {/* Post-Session Rating & Reputation Modal */}
      {isRatingModalOpen && (
        <RatingModal
          session={currentSession}
          onClose={() => setIsRatingModalOpen(false)}
          onFinish={() => {
            setIsRatingModalOpen(false);
            setActiveView('dashboard');
          }}
        />
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useSwap } from '../context/SwapContext';
import ProposalModal from '../components/ProposalModal';
import {
  Send,
  Sparkles,
  Calendar,
  Clock,
  ArrowRightLeft,
  CheckCircle2,
  AlertCircle,
  Video,
  User
} from 'lucide-react';

export default function MessagesPage() {
  const {
    peers,
    conversations,
    activeChatPeerId,
    setActiveChatPeerId,
    sendMessage,
    acceptProposal,
    calculateMatchDetails,
    setActiveView,
    setActiveRoomSessionId
  } = useSwap();

  const [inputMessage, setInputMessage] = useState('');
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const currentPeer = peers.find(p => p.id === activeChatPeerId) || peers[0];
  const thread = conversations[currentPeer.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread, activeChatPeerId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(currentPeer.id, inputMessage);
    setInputMessage('');
  };

  const currentPeerMatch = calculateMatchDetails(currentPeer);

  return (
    <div className="messages-page-container container">
      <div className="messages-layout glass-card">
        {/* Left: Peers Conversation List */}
        <div className="conversations-sidebar">
          <div className="sidebar-header">
            <h3>Messages & Swaps</h3>
            <span className="badge badge-online">Real-time</span>
          </div>

          <div className="conversations-list">
            {peers.map(peer => {
              const peerThread = conversations[peer.id] || [];
              const lastMsg = peerThread[peerThread.length - 1];
              const match = calculateMatchDetails(peer);
              const isActive = peer.id === currentPeer.id;

              return (
                <div
                  key={peer.id}
                  className={`conversation-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveChatPeerId(peer.id)}
                >
                  <div className="avatar-wrapper">
                    <img src={peer.avatar} alt={peer.name} className="conv-avatar" />
                    <span className="online-indicator" />
                  </div>

                  <div className="conv-info">
                    <div className="conv-name-row">
                      <span className="conv-name">{peer.name}</span>
                      <span className="conv-match-tag">{match.totalScore}%</span>
                    </div>
                    <p className="conv-snippet">
                      {lastMsg ? (
                        lastMsg.isProposal
                          ? '📑 Swap Proposal: ' + lastMsg.proposalData.duration
                          : lastMsg.text
                      ) : (
                        `Start a swap conversation...`
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        <div className="chat-main-panel">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-peer-profile">
              <img src={currentPeer.avatar} alt={currentPeer.name} className="chat-avatar" />
              <div>
                <h3 className="chat-peer-name">{currentPeer.name}</h3>
                <div className="chat-peer-sub">
                  <span className="status-dot-active" /> Active now • {currentPeer.mode} •{' '}
                  <span className="cyan-text">{currentPeerMatch.totalScore}% Smart Match</span>
                </div>
              </div>
            </div>

            <div className="chat-header-actions">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setIsProposalModalOpen(true)}
              >
                <ArrowRightLeft size={14} /> Propose Swap
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="chat-messages-feed">
            {/* Mutual Match Banner */}
            <div className="chat-match-intro">
              <Sparkles size={16} className="cyan-text" />
              <span>
                You and {currentPeer.name.split(' ')[0]} are a <strong>{currentPeerMatch.totalScore}% reciprocal match</strong>! You can teach {currentPeerMatch.mutualGive.join(', ')} while they teach {currentPeerMatch.mutualGet.join(', ')}.
              </span>
            </div>

            {thread.map((msg, idx) => {
              const isMe = msg.sender === 'current_user';

              if (msg.isProposal) {
                const p = msg.proposalData;
                const isAccepted = p.status === 'accepted';

                return (
                  <div key={msg.id || idx} className={`message-bubble-wrapper ${isMe ? 'me' : 'them'}`}>
                    <div className="proposal-chat-card">
                      <div className="proposal-card-header">
                        <div className="prop-tag">
                          <ArrowRightLeft size={14} /> 2-WAY SWAP PROPOSAL
                        </div>
                        <span className={`status-pill ${isAccepted ? 'accepted' : 'pending'}`}>
                          {isAccepted ? '✓ LOCKED & SCHEDULED' : '⏳ PENDING REVIEW'}
                        </span>
                      </div>

                      <div className="prop-exchange-details">
                        <div className="prop-col">
                          <span className="prop-lbl">TEACHING</span>
                          <strong>{p.userOffering}</strong>
                        </div>
                        <span className="prop-sep">&harr;</span>
                        <div className="prop-col">
                          <span className="prop-lbl">RECEIVING</span>
                          <strong>{p.peerOffering}</strong>
                        </div>
                      </div>

                      <div className="prop-meta-row">
                        <span><Clock size={13} /> {p.duration}</span>
                        <span><Calendar size={13} /> {p.time}</span>
                      </div>

                      {p.notes && <p className="prop-notes">"{p.notes}"</p>}

                      <div className="prop-card-actions">
                        {isAccepted ? (
                          <button
                            className="btn btn-sm btn-cyan"
                            onClick={() => setActiveView('scheduler')}
                          >
                            <Calendar size={14} /> View in Scheduler
                          </button>
                        ) : !isMe ? (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => acceptProposal(currentPeer.id, p.id)}
                          >
                            <CheckCircle2 size={14} /> Accept & Lock Session
                          </button>
                        ) : (
                          <span className="pending-peer-note">
                            Waiting for {currentPeer.name.split(' ')[0]} to accept...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id || idx} className={`message-bubble-wrapper ${isMe ? 'me' : 'them'}`}>
                  <div className={`message-bubble ${isMe ? 'my-message' : 'their-message'}`}>
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="chat-input-bar">
            <input
              type="text"
              placeholder={`Message ${currentPeer.name.split(' ')[0]} to discuss goals or propose times...`}
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              className="chat-text-input"
            />
            <button type="submit" className="btn btn-primary btn-chat-send" disabled={!inputMessage.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Propose Swap Modal */}
      {isProposalModalOpen && (
        <ProposalModal
          peer={currentPeer}
          onClose={() => setIsProposalModalOpen(false)}
          onSuccess={() => setIsProposalModalOpen(false)}
        />
      )}
    </div>
  );
}

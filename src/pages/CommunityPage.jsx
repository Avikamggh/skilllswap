import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import {
  Users,
  MessageSquare,
  Heart,
  Plus,
  ArrowRightLeft,
  Flame,
  Sparkles,
  Share2,
  CheckCircle2,
  Send,
  X
} from 'lucide-react';

export default function CommunityPage() {
  const {
    communityPosts,
    addCommunityPost,
    likeCommunityPost,
    setActiveChatPeerId,
    setActiveView,
    peers
  } = useSwap();

  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [wantSkill, setWantSkill] = useState('');
  const [giveSkill, setGiveSkill] = useState('');
  const [commitment, setCommitment] = useState('45 min weekly');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!wantSkill || !giveSkill) return;
    addCommunityPost({
      title: postTitle.trim() || `Looking for ${wantSkill} • Offering ${giveSkill}`,
      wantSkill,
      giveSkill,
      timeCommitment: commitment,
      tags: [wantSkill, giveSkill]
    });
    setIsNewPostModalOpen(false);
    setPostTitle('');
    setWantSkill('');
    setGiveSkill('');
  };

  const handleConnectWithAuthor = (authorName) => {
    const peer = peers.find(p => p.name.toLowerCase().includes(authorName.toLowerCase())) || peers[0];
    setActiveChatPeerId(peer.id);
    setActiveView('messages');
  };

  return (
    <div className="community-page-container container">
      {/* Header */}
      <div className="community-header-row">
        <div>
          <div className="badge-hackathon">04 COMMUNITY & CHALLENGES</div>
          <h1 className="page-title">Community Swap Board & Circles</h1>
          <p className="page-subtitle">
            Browse open barter requests from learners worldwide or join active skill circles.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsNewPostModalOpen(true)}
        >
          <Plus size={16} /> Post a Swap Request
        </button>
      </div>

      <div className="community-layout-grid">
        {/* Main Feed: Public Swap Requests */}
        <div className="community-feed-col">
          <div className="feed-filter-tabs">
            <span className="feed-tab active">All Swap Requests</span>
            <span className="feed-tab">Trending</span>
            <span className="feed-tab">My Circles</span>
          </div>

          <div className="posts-list">
            {communityPosts.map(post => (
              <div key={post.id} className="post-card glass-card">
                <div className="post-author-row">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="post-author-avatar"
                  />
                  <div>
                    <strong className="post-author-name">{post.author}</strong>
                    <span className="post-time">{post.timeAgo} • {post.timeCommitment}</span>
                  </div>
                </div>

                <h3 className="post-title">{post.title}</h3>

                {/* Reciprocal Trade Pill */}
                <div className="post-trade-strip">
                  <div className="trade-half want">
                    <span className="trade-label">LOOKING FOR</span>
                    <strong>{post.wantSkill}</strong>
                  </div>
                  <div className="trade-icon">
                    <ArrowRightLeft size={16} />
                  </div>
                  <div className="trade-half give">
                    <span className="trade-label">CAN TEACH</span>
                    <strong>{post.giveSkill}</strong>
                  </div>
                </div>

                {/* Post Footer Actions */}
                <div className="post-footer-actions">
                  <div className="post-metrics">
                    <button
                      className="metric-btn"
                      onClick={() => likeCommunityPost(post.id)}
                    >
                      <Heart size={15} className="heart-icon" /> {post.likes}
                    </button>
                    <span className="metric-text">
                      <MessageSquare size={15} /> {post.responses} responses
                    </span>
                  </div>

                  <button
                    className="btn btn-sm btn-cyan"
                    onClick={() => handleConnectWithAuthor(post.author)}
                  >
                    Connect & Swap &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Active Circles & Hackathon Events */}
        <div className="community-sidebar-col">
          {/* Active Circles */}
          <div className="sidebar-box glass-card">
            <div className="sidebar-box-header">
              <Users size={18} className="violet-text" />
              <h4>Skill Circles</h4>
            </div>
            <p className="sidebar-box-sub">Join cohort study rooms for group swaps</p>

            <div className="circles-list">
              {[
                { name: 'Python & AI Builders', members: 142, icon: '🐍' },
                { name: 'Figma & UI/UX Guild', members: 98, icon: '🎨' },
                { name: 'Video Creators & Editors', members: 76, icon: '🎬' },
                { name: 'Polyglot Language Exchange', members: 110, icon: '🗣️' }
              ].map(circle => (
                <div key={circle.name} className="circle-item">
                  <div className="circle-left">
                    <span className="circle-emoji">{circle.icon}</span>
                    <div>
                      <strong className="circle-name">{circle.name}</strong>
                      <span className="circle-count">{circle.members} swappers</span>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-secondary">Join</button>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon Challenge */}
          <div className="sidebar-box glass-card challenge-box" style={{ marginTop: '20px' }}>
            <div className="challenge-tag">
              <Flame size={14} /> ACTIVE CHALLENGE
            </div>
            <h4>Hackathon Skill Sprint</h4>
            <p>
              Complete 2 reciprocal swaps this week to earn the exclusive <strong>Sprint Champion</strong> badge and +100 bonus karma!
            </p>
            <div className="challenge-progress-bar">
              <div className="bar-fill" style={{ width: '50%' }} />
            </div>
            <span className="challenge-status">1 of 2 swaps completed</span>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewPostModalOpen(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <div className="modal-icon-badge">
                  <Plus size={20} />
                </div>
                <div>
                  <h2 className="modal-title">Post a Community Swap Request</h2>
                  <p className="modal-subtitle">Share what you want to learn and what you can barter</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setIsNewPostModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="modal-body-form">
              <div className="form-group">
                <label>Summary Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Senior Frontend Dev looking to learn Figma auto-layout"
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="badge-inline badge-learn">SKILL YOU WANT</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. UI/UX Design, Guitar, Spanish..."
                    value={wantSkill}
                    onChange={e => setWantSkill(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="badge-inline badge-teach">SKILL YOU OFFER</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Python, Video Editing, React..."
                    value={giveSkill}
                    onChange={e => setGiveSkill(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Time Commitment Preference</label>
                <select
                  className="select-field"
                  value={commitment}
                  onChange={e => setCommitment(e.target.value)}
                >
                  <option value="45 min single session">45 min single session</option>
                  <option value="45 min weekly">45 min weekly</option>
                  <option value="1 hour bi-weekly">1 hour bi-weekly</option>
                  <option value="Flexible / As-needed">Flexible / As-needed</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsNewPostModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} /> Publish Swap Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

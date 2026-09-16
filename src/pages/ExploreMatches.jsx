import React, { useState, useMemo } from 'react';
import { useSwap } from '../context/SwapContext';
import MatchCard from '../components/MatchCard';
import ScoreBreakdownModal from '../components/ScoreBreakdownModal';
import ProposalModal from '../components/ProposalModal';
import { SKILL_CATEGORIES } from '../data/initialSkills';
import {
  Sparkles,
  Search,
  Filter,
  SlidersHorizontal,
  Compass,
  ArrowUpDown,
  CheckCircle2,
  RefreshCw,
  Zap
} from 'lucide-react';

export default function ExploreMatches({ initialQuery = '' }) {
  const { peers, currentUser, calculateMatchDetails, setIsProfileModalOpen } = useSwap();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all'); // 'all' | 'Online' | 'Hybrid' | 'In-Person'
  const [sortBy, setSortBy] = useState('score'); // 'score' | 'rating' | 'swaps'

  // Modals state
  const [inspectingPeer, setInspectingPeer] = useState(null);
  const [proposingPeer, setProposingPeer] = useState(null);

  // Filter & Score peers
  const scoredPeers = useMemo(() => {
    return peers.map(peer => {
      const details = calculateMatchDetails(peer);
      return {
        ...peer,
        matchDetails: details
      };
    });
  }, [peers, currentUser]);

  const filteredPeers = useMemo(() => {
    return scoredPeers.filter(peer => {
      // Query filter (check canTeach, wantsToLearn, name, title)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTeach = peer.canTeach.some(s => s.toLowerCase().includes(q));
        const matchesLearn = peer.wantsToLearn.some(s => s.toLowerCase().includes(q));
        const matchesName = peer.name.toLowerCase().includes(q);
        const matchesTitle = peer.title.toLowerCase().includes(q);
        if (!matchesTeach && !matchesLearn && !matchesName && !matchesTitle) {
          return false;
        }
      }

      // Mode filter
      if (selectedMode !== 'all') {
        if (selectedMode === 'Online' && peer.mode !== 'Online' && peer.mode !== 'Hybrid') return false;
        if (selectedMode === 'In-Person' && peer.mode !== 'In-Person' && peer.mode !== 'Hybrid') return false;
        if (selectedMode === 'Hybrid' && peer.mode !== 'Hybrid') return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const cat = SKILL_CATEGORIES.find(c => c.id === selectedCategory);
        if (cat) {
          const hasSkillInCat = peer.canTeach.some(s => cat.skills.includes(s)) ||
                                peer.wantsToLearn.some(s => cat.skills.includes(s));
          if (!hasSkillInCat) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'score') {
        return b.matchDetails.totalScore - a.matchDetails.totalScore;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'swaps') {
        return (b.swapsCompleted || 0) - (a.swapsCompleted || 0);
      }
      return 0;
    });
  }, [scoredPeers, searchQuery, selectedMode, selectedCategory, sortBy]);

  return (
    <div className="explore-page-container container">
      {/* Header Banner */}
      <div className="explore-header-panel">
        <div className="explore-title-row">
          <div>
            <div className="badge-hackathon">05 THE MATCHING ENGINE</div>
            <h1 className="explore-title">Smart Complementary Matches</h1>
            <p className="explore-subtitle">
              Algorithm pairing peers based on <strong>Fit (40%)</strong>, <strong>Availability (25%)</strong>, <strong>Goals (20%)</strong>, and <strong>Reputation (15%)</strong>.
            </p>
          </div>

          <button
            className="btn btn-outline-purple"
            onClick={() => setIsProfileModalOpen(true)}
          >
            Adjust My Skills & Goals
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="explore-filter-bar">
          <div className="search-filter-input">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by skill you want (e.g. UI/UX, Python, Video Editing)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                ×
              </button>
            )}
          </div>

          {/* Mode Selector */}
          <div className="filter-select-group">
            <select
              className="select-filter"
              value={selectedMode}
              onChange={e => setSelectedMode(e.target.value)}
            >
              <option value="all">All Modes (Online / In-Person)</option>
              <option value="Online">Online Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>

          {/* Category Selector */}
          <div className="filter-select-group">
            <select
              className="select-filter"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Skill Categories</option>
              {SKILL_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-select-group">
            <select
              className="select-filter"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="score">Sort: Highest Match Score</option>
              <option value="rating">Sort: Peer Rating (★)</option>
              <option value="swaps">Sort: Most Swaps Completed</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        <div className="active-matches-count">
          <span>Found <strong>{filteredPeers.length}</strong> complementary learning partners</span>
          {searchQuery && (
            <span className="badge badge-learn">Filtering for "{searchQuery}"</span>
          )}
        </div>
      </div>

      {/* Grid of Match Cards */}
      {filteredPeers.length > 0 ? (
        <div className="matches-grid">
          {filteredPeers.map(peer => (
            <MatchCard
              key={peer.id}
              peer={peer}
              onInspect={p => setInspectingPeer(p)}
              onPropose={p => setProposingPeer(p)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-matches-box glass-card">
          <Compass size={48} className="empty-icon" />
          <h3>No peers matched your exact filter criteria</h3>
          <p>Try searching for broader skills like "Design", "Python", or reset filters.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedMode('all');
            }}
          >
            <RefreshCw size={16} /> Reset All Filters
          </button>
        </div>
      )}

      {/* Slide 05 Matching Breakdown Modal */}
      {inspectingPeer && (
        <ScoreBreakdownModal
          peer={inspectingPeer}
          onClose={() => setInspectingPeer(null)}
          onPropose={p => {
            setInspectingPeer(null);
            setProposingPeer(p);
          }}
        />
      )}

      {/* Swap Proposal Modal */}
      {proposingPeer && (
        <ProposalModal
          peer={proposingPeer}
          onClose={() => setProposingPeer(null)}
          onSuccess={() => setProposingPeer(null)}
        />
      )}
    </div>
  );
}

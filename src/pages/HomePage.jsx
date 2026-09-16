import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { POPULAR_SEARCH_SKILLS } from '../data/initialSkills';
import {
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  DollarSign,
  Users,
  Clock,
  Compass,
  Repeat,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';

export default function HomePage({ onSelectSearchSkill }) {
  const { setActiveView, setPitchTourStep, currentUser } = useSwap();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSelectSearchSkill) {
      onSelectSearchSkill(searchQuery);
    }
    setActiveView('explore');
  };

  const handleQuickTagClick = (skill) => {
    if (onSelectSearchSkill) {
      onSelectSearchSkill(skill);
    }
    setActiveView('explore');
  };

  return (
    <div className="home-page-container">
      {/* Top Hero Section matching Slide 01 */}
      <section className="hero-section">
        {/* Accent Top Ribbon */}
        <div className="hero-cyan-bar" />

        <div className="hero-grid">
          {/* Left Column: Mission & Pitch */}
          <div className="hero-content">
            <div className="hackathon-tag-row">
              <span className="badge-hackathon">HACKATHON PITCH</span>
              <span className="badge-motto">Learn • Teach • Swap • Grow</span>
            </div>

            <h1 className="hero-main-title">
              SKILL <span className="brand-purple-text">SWAP</span>
            </h1>

            <p className="hero-tagline">
              Share skills • Learn skills • Grow together
            </p>

            <h2 className="hero-statement">
              A peer-to-peer platform where{' '}
              <span className="cyan-text">knowledge becomes the currency.</span>
            </h2>

            {/* Slide 08 Search Flow: "What do you want to learn?" */}
            <form onSubmit={handleSearch} className="hero-search-box">
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="What do you want to learn? (e.g. UI/UX, Python, Video Editing)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-cyan btn-search">
                Find Matches <ArrowRight size={16} />
              </button>
            </form>

            {/* Popular Skills Quick Tags */}
            <div className="quick-tags-row">
              <span className="quick-tags-label">Trending Swaps:</span>
              <div className="quick-tags-pills">
                {POPULAR_SEARCH_SKILLS.slice(0, 5).map(skill => (
                  <button
                    key={skill}
                    className="tag-pill-btn"
                    onClick={() => handleQuickTagClick(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-cta-group">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setActiveView('explore')}
              >
                <Compass size={18} /> Explore Smart Matches
              </button>
              <button
                className="btn btn-outline-purple btn-lg"
                onClick={() => setPitchTourStep(1)}
              >
                <Sparkles size={18} /> Launch Pitch Demo Tour
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic matching pitch deck slide 01 illustration */}
          <div className="hero-graphic-card">
            <div className="graphic-glass-panel">
              <div className="graphic-header-row">
                <span className="dot-status active" />
                <span className="graphic-title">Reciprocal Knowledge Exchange</span>
              </div>

              <div className="graphic-illustration-wrapper">
                <div className="peer-circle-node node-left">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                    alt="Rohit"
                    className="node-avatar"
                  />
                  <span className="node-skill-tag">Teaches Python</span>
                </div>

                <div className="exchange-arrows-center">
                  <div className="arrow-track top">
                    <span>Python Code & APIs &rarr;</span>
                  </div>
                  <div className="exchange-symbol">
                    <Repeat size={28} className="spin-slow" />
                  </div>
                  <div className="arrow-track bottom">
                    <span>&larr; Figma Design System</span>
                  </div>
                </div>

                <div className="peer-circle-node node-right">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                    alt="Ananya"
                    className="node-avatar"
                  />
                  <span className="node-skill-tag cyan">Teaches UI/UX</span>
                </div>
              </div>

              <div className="zero-cost-pill">
                <DollarSign size={16} /> Zero money required • 100% Peer Barter
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 02: The Problem */}
      <section className="section-pitch-problem">
        <div className="section-header-block">
          <div className="section-num-tag">01 The Problem</div>
          <h2 className="section-title">
            Great skills exist everywhere, but opportunities to learn don't.
          </h2>
        </div>

        <div className="problem-cards-grid">
          <div className="problem-card glass-card">
            <div className="problem-icon-box">💸</div>
            <h3 className="problem-card-title">Learning is expensive</h3>
            <p className="problem-card-desc">
              Quality 1-on-1 courses, bootcamps, and professional coaching can cost thousands.
            </p>
          </div>

          <div className="problem-card glass-card">
            <div className="problem-icon-box">🧩</div>
            <h3 className="problem-card-title">Talent is underused</h3>
            <p className="problem-card-desc">
              Millions of people have valuable skills to share, but no dedicated marketplace to barter them.
            </p>
          </div>

          <div className="problem-card glass-card">
            <div className="problem-icon-box">🔎</div>
            <h3 className="problem-card-title">Finding the right person</h3>
            <p className="problem-card-desc">
              Hard to find a compatible peer or mentor with reciprocal needs and aligned schedules.
            </p>
          </div>

          <div className="problem-card glass-card">
            <div className="problem-icon-box">⏱️</div>
            <h3 className="problem-card-title">One-size-fits-all</h3>
            <p className="problem-card-desc">
              Traditional courses rarely fit your personal goals, learning pace, and weekly availability.
            </p>
          </div>
        </div>

        <div className="problem-gap-callout">
          <h3>
            The gap:{' '}
            <span className="brand-purple-text">
              people who can teach are often the people who want to learn.
            </span>
          </h3>
        </div>
      </section>

      {/* Slide 03: Our Solution */}
      <section className="section-pitch-solution">
        <div className="section-header-block">
          <div className="section-num-tag">02 Our Solution</div>
          <h2 className="section-title">Turn skills into a two-way exchange.</h2>
          <p className="section-subtitle">
            Skill Swap connects people with complementary skills.
          </p>
        </div>

        <div className="solution-pillars-grid">
          <div className="solution-pillar glass-card">
            <div className="pillar-num">01</div>
            <h4>Teach what you know</h4>
            <p>Monetize your expertise not with currency, but by learning high-demand skills in return.</p>
          </div>
          <div className="solution-pillar glass-card">
            <div className="pillar-num">02</div>
            <h4>Learn what you need</h4>
            <p>1-on-1 targeted coaching customized to your exact project, questions, and learning speed.</p>
          </div>
          <div className="solution-pillar glass-card">
            <div className="pillar-num">03</div>
            <h4>Match on 4 signals</h4>
            <p>Smart Matching engine pairs users based on skills fit, availability, goals, and reputation.</p>
          </div>
          <div className="solution-pillar glass-card">
            <div className="pillar-num">04</div>
            <h4>Build reputation</h4>
            <p>Trust-based peer reviews, verified swap hours, and karma badges ensure safe exchanges.</p>
          </div>
        </div>
      </section>

      {/* Slide 04: How It Works */}
      <section className="section-how-it-works">
        <div className="section-header-block">
          <div className="section-num-tag">03 How It Works</div>
          <h2 className="section-title">Five simple steps from profile to progress.</h2>
        </div>

        <div className="steps-flow-row">
          {[
            { num: 1, title: 'Create Profile', desc: 'Add skills you teach, skills you want, & goals.' },
            { num: 2, title: 'Find a Match', desc: 'Discover complementary peers with smart score.' },
            { num: 3, title: 'Connect', desc: 'Chat and agree on session goals & time slot.' },
            { num: 4, title: 'Swap & Learn', desc: 'Meet in live room with reciprocal timers.' },
            { num: 5, title: 'Grow', desc: 'Track hours exchanged, earn karma & level up.' }
          ].map((s, idx) => (
            <div key={s.num} className="step-card glass-card">
              <div className="step-badge">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              {idx < 4 && <div className="step-arrow">&rarr;</div>}
            </div>
          ))}
        </div>

        <div className="how-it-works-motto">
          <span>Real people</span> &rarr; <span>Real skills</span> &rarr; <span>Real growth</span>
        </div>
      </section>

      {/* Slide 09: Impact */}
      <section className="section-impact">
        <div className="section-header-block">
          <div className="section-num-tag">09 Impact</div>
          <h2 className="section-title">Small exchanges. Big impact.</h2>
          <p className="section-subtitle">More skills. More opportunities. A stronger community.</p>
        </div>

        <div className="impact-grid">
          <div className="impact-card glass-card">
            <div className="impact-icon">🎓</div>
            <h4>Empowers individuals</h4>
            <p>Learn without financial barriers or expensive subscription gates.</p>
          </div>
          <div className="impact-card glass-card">
            <div className="impact-icon">🌐</div>
            <h4>Builds communities</h4>
            <p>Connect people through shared curiosity and meaningful collaborative mentorship.</p>
          </div>
          <div className="impact-card glass-card">
            <div className="impact-icon">💼</div>
            <h4>Boosts employability</h4>
            <p>Add practical, verified real-world skills and build a public swap portfolio.</p>
          </div>
          <div className="impact-card glass-card">
            <div className="impact-icon">🌱</div>
            <h4>Uses existing talent</h4>
            <p>Turn dormant knowledge and expertise into compounding community value.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

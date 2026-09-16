import React from 'react';
import { useSwap } from '../context/SwapContext';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Compass,
  MessageSquare,
  Calendar,
  Video,
  Award
} from 'lucide-react';

export default function PitchTourBanner() {
  const {
    pitchTourStep,
    setPitchTourStep,
    setActiveView,
    setIsProfileModalOpen,
    setActiveChatPeerId,
    setActiveRoomSessionId
  } = useSwap();

  if (!pitchTourStep || pitchTourStep === 0) return null;

  const steps = [
    {
      step: 1,
      title: 'Step 1: Skill Profiles & Onboarding',
      desc: 'Users set what they can teach (e.g., Python) vs. what they want to learn (e.g., UI/UX), plus availability and goals.',
      actionText: 'View My Skill Profile',
      onAction: () => setIsProfileModalOpen(true),
      navView: 'home'
    },
    {
      step: 2,
      title: 'Step 2: Smart Matching Engine (Slide 05)',
      desc: 'Algorithm scores reciprocal fit: Match Score = fit + availability + goals + reputation. Meet Ananya (98% match)!',
      actionText: 'Inspect Smart Matches',
      onAction: () => setActiveView('explore'),
      navView: 'explore'
    },
    {
      step: 3,
      title: 'Step 3: Connect & Swap Proposal (Slide 03 & 08)',
      desc: 'Direct negotiation with built-in swap proposal cards (e.g., 45 min: 22.5m Python for 22.5m Figma).',
      actionText: 'Open Chat with Ananya',
      onAction: () => {
        setActiveChatPeerId('user_ananya');
        setActiveView('messages');
      },
      navView: 'messages'
    },
    {
      step: 4,
      title: 'Step 4: Session Scheduler & Calendar (Slide 04 & 07)',
      desc: 'Confirmed swaps are automatically booked with split-agenda time, link, and preparation notes.',
      actionText: 'View Confirmed Sessions',
      onAction: () => setActiveView('scheduler'),
      navView: 'scheduler'
    },
    {
      step: 5,
      title: 'Step 5: Live Swap Room & Ratings (Slide 04 & 08)',
      desc: 'Virtual peer room with dual reciprocal timers (22.5m each), collaborative notes, and post-session karma review.',
      actionText: 'Enter Swap Room',
      onAction: () => {
        setActiveRoomSessionId('session-101');
        setActiveView('room');
      },
      navView: 'room'
    }
  ];

  const current = steps[pitchTourStep - 1] || steps[0];

  const handleNext = () => {
    if (pitchTourStep < steps.length) {
      const nextStep = pitchTourStep + 1;
      setPitchTourStep(nextStep);
      const nextConfig = steps[nextStep - 1];
      if (nextConfig) {
        nextConfig.onAction();
      }
    } else {
      setPitchTourStep(0);
    }
  };

  const handlePrev = () => {
    if (pitchTourStep > 1) {
      const prevStep = pitchTourStep - 1;
      setPitchTourStep(prevStep);
      const prevConfig = steps[prevStep - 1];
      if (prevConfig) {
        prevConfig.onAction();
      }
    }
  };

  return (
    <div className="pitch-tour-bar">
      <div className="pitch-tour-content">
        <div className="pitch-tour-badge">
          <Sparkles size={14} className="pitch-sparkle-anim" />
          <span>HACKATHON DEMO FLOW</span>
          <span className="pitch-step-pill">{current.step} / {steps.length}</span>
        </div>

        <div className="pitch-tour-text">
          <strong className="pitch-title">{current.title}</strong>
          <span className="pitch-desc">{current.desc}</span>
        </div>

        <div className="pitch-tour-actions">
          <button className="btn btn-sm btn-cyan" onClick={current.onAction}>
            {current.actionText}
          </button>

          <div className="pitch-nav-btns">
            <button
              className="btn btn-sm btn-secondary"
              onClick={handlePrev}
              disabled={pitchTourStep === 1}
              title="Previous Step"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={handleNext}
              title={pitchTourStep === steps.length ? 'Finish Tour' : 'Next Step'}
            >
              {pitchTourStep === steps.length ? (
                <>Finish <CheckCircle2 size={14} /></>
              ) : (
                <>Next <ArrowRight size={14} /></>
              )}
            </button>
          </div>

          <button
            className="pitch-close-btn"
            onClick={() => setPitchTourStep(0)}
            title="Close Pitch Tour"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

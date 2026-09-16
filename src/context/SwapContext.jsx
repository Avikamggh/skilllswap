import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MOCK_USERS } from '../data/mockUsers';
import {
  DEFAULT_CURRENT_USER,
  INITIAL_SCHEDULED_SESSIONS,
  INITIAL_CONVERSATIONS,
  INITIAL_COMMUNITY_POSTS
} from '../data/defaultState';

const SwapContext = createContext(null);

export function SwapProvider({ children }) {
  // 1. Current User
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('skillswap_user');
    return saved ? JSON.parse(saved) : DEFAULT_CURRENT_USER;
  });

  // 2. Peers Database
  const [peers, setPeers] = useState(() => {
    const saved = localStorage.getItem('skillswap_peers');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  // 3. Conversations
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('skillswap_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  // 4. Scheduled Sessions
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('skillswap_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULED_SESSIONS;
  });

  // 5. Community Posts
  const [communityPosts, setCommunityPosts] = useState(() => {
    const saved = localStorage.getItem('skillswap_posts');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_POSTS;
  });

  // Navigation & UI State
  const [activeView, setActiveView] = useState('home'); // 'home' | 'explore' | 'messages' | 'scheduler' | 'room' | 'dashboard' | 'community'
  const [activeChatPeerId, setActiveChatPeerId] = useState('user_ananya');
  const [activeRoomSessionId, setActiveRoomSessionId] = useState('session-101');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedPeerForModal, setSelectedPeerForModal] = useState(null);
  const [pitchTourStep, setPitchTourStep] = useState(0); // 0 = closed, 1..6 = step
  const [notification, setNotification] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('skillswap_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('skillswap_peers', JSON.stringify(peers));
  }, [peers]);

  useEffect(() => {
    localStorage.setItem('skillswap_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('skillswap_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('skillswap_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  // Toast Notification helper
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3800);
  };

  // 6. Pitch Deck Matching Engine Formula:
  // Match Score = Fit (40%) + Availability (25%) + Goals (20%) + Reputation (15%)
  const calculateMatchDetails = (peer) => {
    if (!peer || !currentUser) {
      return { totalScore: 70, fitScore: 30, availScore: 18, goalsScore: 14, repScore: 12, mutualGive: [], mutualGet: [] };
    }

    // 1. Skill Fit (Max 40 pts)
    // Skills peer teaches that user wants to learn
    const mutualGet = (peer.canTeach || []).filter(skill =>
      (currentUser.wantsToLearn || []).some(wanted =>
        wanted.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(wanted.toLowerCase())
      )
    );
    // Skills user teaches that peer wants to learn
    const mutualGive = (currentUser.canTeach || []).filter(skill =>
      (peer.wantsToLearn || []).some(wanted =>
        wanted.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(wanted.toLowerCase())
      )
    );

    let fitScore = 15; // baseline
    if (mutualGet.length > 0) fitScore += 13;
    if (mutualGive.length > 0) fitScore += 12;
    fitScore = Math.min(40, fitScore);

    // 2. Availability Overlap (Max 25 pts)
    const userAvail = currentUser.availability || [];
    const peerAvail = peer.availability || [];
    const availOverlap = userAvail.filter(slot => peerAvail.includes(slot));
    let availScore = 12;
    if (availOverlap.length > 0) availScore += Math.min(13, availOverlap.length * 7);

    // 3. Location / Mode & Goals (Max 20 pts)
    let goalsScore = 10;
    if (peer.mode === currentUser.mode || peer.mode === 'Online' || currentUser.mode === 'Online') {
      goalsScore += 5;
    }
    const sharedGoals = (currentUser.goals || []).filter(g => (peer.goals || []).includes(g));
    if (sharedGoals.length > 0) goalsScore += 5;

    // 4. Reputation & Trust (Max 15 pts)
    const ratingFraction = ((peer.rating || 4.5) - 4.0) / 1.0; // 0 to 1
    let repScore = Math.round(ratingFraction * 10) + Math.min(5, Math.floor((peer.swapsCompleted || 0) / 6));
    repScore = Math.max(8, Math.min(15, repScore));

    const totalScore = Math.min(99, fitScore + availScore + goalsScore + repScore);

    return {
      totalScore,
      fitScore,
      availScore,
      goalsScore,
      repScore,
      mutualGet: mutualGet.length > 0 ? mutualGet : [peer.canTeach?.[0] || 'Specialized Topic'],
      mutualGive: mutualGive.length > 0 ? mutualGive : [currentUser.canTeach?.[0] || 'Technical Skills']
    };
  };

  // 7. Update User Profile
  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
    showToast('Your Skill Profile has been updated successfully!');
  };

  // 8. Messaging & Simulated Responses
  const sendMessage = (peerId, text) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: 'm_' + Date.now(),
      sender: 'current_user',
      text,
      timestamp: `Today, ${timeStr}`
    };

    setConversations(prev => ({
      ...prev,
      [peerId]: [...(prev[peerId] || []), newMsg]
    }));

    // Automated smart simulation reply from the peer
    setTimeout(() => {
      const peer = peers.find(p => p.id === peerId);
      const peerName = peer ? peer.name.split(' ')[0] : 'Peer';
      const replies = [
        `Thanks for the note, ${currentUser.name}! I would love to do this swap. When are you free for our first 45-min session?`,
        `That sounds awesome! I'm especially eager to dive deeper into ${currentUser.canTeach?.[0] || 'your skill'}. Let's make it happen!`,
        `Perfect! I just checked my calendar for ${peer?.availability?.[0] || 'tomorrow'} and that works great for me. Send over a swap proposal whenever you're ready!`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const peerMsg = {
        id: 'reply_' + Date.now(),
        sender: peerId,
        text: randomReply,
        timestamp: `Today, ${timeStr}`
      };

      setConversations(prev => ({
        ...prev,
        [peerId]: [...(prev[peerId] || []), peerMsg]
      }));

      showToast(`New reply from ${peerName}!`, 'info');
    }, 1400);
  };

  // 9. Send Swap Proposal
  const sendProposal = (peerId, proposalData) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const proposalMsg = {
      id: 'prop_' + Date.now(),
      sender: 'current_user',
      isProposal: true,
      proposalData: {
        id: 'pdata_' + Date.now(),
        status: 'pending',
        peerOffering: proposalData.peerOffering,
        userOffering: proposalData.userOffering,
        duration: proposalData.duration || '45 mins (22.5m each)',
        time: proposalData.time || 'Tomorrow • 6:00 PM IST',
        mode: proposalData.mode || 'Online Room',
        notes: proposalData.notes || ''
      },
      timestamp: `Today, ${timeStr}`
    };

    setConversations(prev => ({
      ...prev,
      [peerId]: [...(prev[peerId] || []), proposalMsg]
    }));

    showToast('Swap Proposal sent! Peer notified.');

    // Simulate peer accepting proposal after short delay
    setTimeout(() => {
      const peer = peers.find(p => p.id === peerId);
      const peerName = peer ? peer.name.split(' ')[0] : 'Peer';

      setConversations(prev => {
        const thread = prev[peerId] || [];
        const updated = thread.map(msg => {
          if (msg.isProposal && msg.proposalData.status === 'pending') {
            return {
              ...msg,
              proposalData: { ...msg.proposalData, status: 'accepted' }
            };
          }
          return msg;
        });

        return {
          ...prev,
          [peerId]: [
            ...updated,
            {
              id: 'peer_accept_' + Date.now(),
              sender: peerId,
              text: `Proposal accepted! I’ve locked this into our scheduler. Let's do this! 🎉`,
              timestamp: `Today, ${timeStr}`
            }
          ]
        };
      });

      // Automatically add to scheduled sessions
      const newSession = {
        id: 'session_' + Date.now(),
        peerId: peer?.id || peerId,
        peerName: peer?.name || 'Swap Partner',
        peerAvatar: peer?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        userOffering: proposalData.userOffering,
        peerOffering: proposalData.peerOffering,
        durationMinutes: 45,
        userTeachingMinutes: 22.5,
        peerTeachingMinutes: 22.5,
        date: 'Scheduled',
        time: proposalData.time || 'Tomorrow • 6:00 PM',
        mode: 'Online Live Room',
        status: 'scheduled',
        notes: proposalData.notes || 'Equitable 2-way knowledge exchange'
      };

      setSessions(prev => [newSession, ...prev]);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      showToast(`${peerName} accepted your swap proposal! Added to Scheduler.`, 'success');
    }, 2200);
  };

  // 10. Accept an incoming proposal
  const acceptProposal = (peerId, proposalId) => {
    setConversations(prev => {
      const thread = prev[peerId] || [];
      return {
        ...prev,
        [peerId]: thread.map(m => {
          if (m.isProposal && m.proposalData?.id === proposalId) {
            return { ...m, proposalData: { ...m.proposalData, status: 'accepted' } };
          }
          return m;
        })
      };
    });

    const peer = peers.find(p => p.id === peerId);
    const newSession = {
      id: 'session_' + Date.now(),
      peerId,
      peerName: peer?.name || 'Swap Partner',
      peerAvatar: peer?.avatar,
      userOffering: currentUser.canTeach?.[0] || 'Technical Coaching',
      peerOffering: peer?.canTeach?.[0] || 'Design Review',
      durationMinutes: 45,
      userTeachingMinutes: 22.5,
      peerTeachingMinutes: 22.5,
      date: 'Today',
      time: '08:00 PM IST',
      mode: 'Online Live Room',
      status: 'scheduled',
      notes: 'Equal 2-way learning session confirmed.'
    };

    setSessions(prev => [newSession, ...prev]);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast('Swap session confirmed and scheduled!');
  };

  // 11. Complete Swap Session & Submit Review
  const completeSession = (sessionId, reviewData) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'completed' } : s))
    );

    // Increase user stats
    const hoursEarned = 0.75; // 45 min
    setCurrentUser(prev => ({
      ...prev,
      swapsCompleted: prev.swapsCompleted + 1,
      hoursExchanged: +(prev.hoursExchanged + hoursEarned).toFixed(1),
      karmaPoints: prev.karmaPoints + 35
    }));

    // Update peer rating & review count
    if (reviewData && reviewData.peerId) {
      setPeers(prev =>
        prev.map(p => {
          if (p.id === reviewData.peerId) {
            const newCount = (p.reviewCount || 0) + 1;
            const currentRating = p.rating || 5.0;
            const newRating = +((currentRating * (newCount - 1) + reviewData.rating) / newCount).toFixed(2);
            return {
              ...p,
              rating: newRating,
              reviewCount: newCount,
              swapsCompleted: (p.swapsCompleted || 0) + 1,
              reviews: [
                {
                  id: 'rev_' + Date.now(),
                  author: currentUser.name,
                  skill: reviewData.skillReviewed || 'Peer Exchange',
                  rating: reviewData.rating,
                  text: reviewData.text || 'Incredible swap! Super patient and insightful.'
                },
                ...(p.reviews || [])
              ]
            };
          }
          return p;
        })
      );
    }

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 }
    });

    showToast('Session completed! +35 Karma & Reputation gained. 🎉');
  };

  // 12. Add Community Post
  const addCommunityPost = (post) => {
    const newPost = {
      id: 'post_' + Date.now(),
      author: currentUser.name,
      authorAvatar: currentUser.avatar,
      title: post.title,
      tags: post.tags || ['Swap'],
      wantSkill: post.wantSkill,
      giveSkill: post.giveSkill,
      timeCommitment: post.timeCommitment || 'Flexible',
      likes: 1,
      responses: 0,
      timeAgo: 'Just now'
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    showToast('Your Swap Request is now live on the Community board!');
  };

  // 13. Like Community Post
  const likeCommunityPost = (postId) => {
    setCommunityPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  // 14. Reset to Clean Pitch Demo State
  const resetDemoData = () => {
    localStorage.removeItem('skillswap_user');
    localStorage.removeItem('skillswap_peers');
    localStorage.removeItem('skillswap_conversations');
    localStorage.removeItem('skillswap_sessions');
    localStorage.removeItem('skillswap_posts');

    setCurrentUser(DEFAULT_CURRENT_USER);
    setPeers(MOCK_USERS);
    setConversations(INITIAL_CONVERSATIONS);
    setSessions(INITIAL_SCHEDULED_SESSIONS);
    setCommunityPosts(INITIAL_COMMUNITY_POSTS);
    setActiveView('home');
    setActiveChatPeerId('user_ananya');
    setPitchTourStep(0);
    showToast('Demo data reset to pristine pitch deck state!', 'info');
  };

  return (
    <SwapContext.Provider
      value={{
        currentUser,
        updateProfile,
        peers,
        conversations,
        sessions,
        communityPosts,
        activeView,
        setActiveView,
        activeChatPeerId,
        setActiveChatPeerId,
        activeRoomSessionId,
        setActiveRoomSessionId,
        isProfileModalOpen,
        setIsProfileModalOpen,
        selectedPeerForModal,
        setSelectedPeerForModal,
        pitchTourStep,
        setPitchTourStep,
        notification,
        showToast,
        calculateMatchDetails,
        sendMessage,
        sendProposal,
        acceptProposal,
        completeSession,
        addCommunityPost,
        likeCommunityPost,
        resetDemoData
      }}
    >
      {children}
    </SwapContext.Provider>
  );
}

export function useSwap() {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error('useSwap must be used within a SwapProvider');
  }
  return context;
}

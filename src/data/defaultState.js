export const DEFAULT_CURRENT_USER = {
  id: 'current_user_you',
  name: 'Avikam Deol',
  title: 'Full Stack Developer & AI Builder',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  bio: 'Building web applications and AI tools. Strong with Python, React, and API integrations. Wanting to master UI/UX design, Figma autolayout, and video editing to level up product launches.',
  canTeach: ['Python', 'React', 'JavaScript', 'SQL & Databases'],
  wantsToLearn: ['UI/UX Design', 'Figma', 'Video Editing'],
  teachLevel: 'Advanced (3+ yrs)',
  learnPriority: 'High • For hackathon demo & products',
  availability: ['Weekday Evenings', 'Weekend Mornings'],
  mode: 'Online',
  goals: ['Career Growth', 'Personal Project'],
  rating: 4.92,
  reviewCount: 9,
  swapsCompleted: 8,
  hoursExchanged: 14,
  karmaPoints: 220,
  badges: ['Founding Swapper', 'Fast Responder', 'Curious Learner'],
  reviews: [
    {
      id: 'cr1',
      author: 'Ananya Rao',
      skill: 'Python Automation',
      rating: 5,
      text: 'Super clear session! Avikam broke down web scraping so cleanly. Excited for our next Figma swap.'
    }
  ]
};

export const INITIAL_SCHEDULED_SESSIONS = [
  {
    id: 'session-101',
    peerId: 'user_ananya',
    peerName: 'Ananya Rao',
    peerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    userOffering: 'Python Automation Scripts',
    peerOffering: 'Figma Auto-layout & Design Systems',
    durationMinutes: 45,
    userTeachingMinutes: 22.5,
    peerTeachingMinutes: 22.5,
    date: 'Today',
    time: '07:30 PM - 08:15 PM IST',
    mode: 'Online Live Room',
    status: 'scheduled', // 'scheduled' | 'in_progress' | 'completed'
    notes: 'Spend the first 22 mins writing a BeautifulSoup script, then 22 mins auditing the SkillSwap Figma wireframe.'
  },
  {
    id: 'session-102',
    peerId: 'user_rohit',
    peerName: 'Rohit Sharma',
    peerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    userOffering: 'React State & Hooks',
    peerOffering: 'FastAPI Backend Architecture',
    durationMinutes: 60,
    userTeachingMinutes: 30,
    peerTeachingMinutes: 30,
    date: 'Tomorrow',
    time: '05:00 PM - 06:00 PM IST',
    mode: 'Online Live Room',
    status: 'scheduled',
    notes: 'Exchange on building clean API contracts and state sync.'
  }
];

export const INITIAL_CONVERSATIONS = {
  user_ananya: [
    {
      id: 'm1',
      sender: 'user_ananya',
      text: 'Hey Avikam! Saw your profile on the matching board. Our skills are an exact reciprocal match (Python <-> UI/UX)! 🎨🐍',
      timestamp: 'Yesterday, 4:15 PM'
    },
    {
      id: 'm2',
      sender: 'current_user',
      text: 'Hi Ananya! Yes, totally! I really want to learn how to design scalable components in Figma, and I can walk you through automated Python scripts or data manipulation.',
      timestamp: 'Yesterday, 4:20 PM'
    },
    {
      id: 'm3',
      sender: 'user_ananya',
      text: 'That would be incredible. Can we do a 45-minute swap today? 22.5 min each!',
      timestamp: 'Today, 2:10 PM'
    },
    {
      id: 'm4',
      sender: 'user_ananya',
      isProposal: true,
      proposalData: {
        id: 'prop-ananya-1',
        status: 'accepted', // accepted
        peerOffering: 'Figma Auto-layout & Design Systems',
        userOffering: 'Python Automation Scripts',
        duration: '45 mins (22.5m each)',
        time: 'Today • 7:30 PM IST',
        mode: 'Online Room'
      },
      timestamp: 'Today, 2:12 PM'
    },
    {
      id: 'm5',
      sender: 'current_user',
      text: 'Accepted! Looking forward to our session at 7:30 PM.',
      timestamp: 'Today, 2:15 PM'
    },
    {
      id: 'm6',
      sender: 'user_ananya',
      text: 'Awesome! See you in the live room soon. 🚀',
      timestamp: 'Today, 2:16 PM'
    }
  ],
  user_rohit: [
    {
      id: 'mr1',
      sender: 'user_rohit',
      text: 'Hey! Loved your projects on GitHub. Up for exchanging some FastAPI backend patterns for React context/state advice?',
      timestamp: '2 days ago'
    },
    {
      id: 'mr2',
      sender: 'current_user',
      text: 'Hey Rohit! Absolutely. Let’s do 60 minutes tomorrow afternoon.',
      timestamp: 'Yesterday'
    }
  ]
};

export const INITIAL_COMMUNITY_POSTS = [
  {
    id: 'post-1',
    author: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    title: 'Looking for Python/Pandas mentor • Offering Fluent Spanish Conversation',
    tags: ['Spanish', 'Python', 'Data Analysis'],
    wantSkill: 'Python & Pandas',
    giveSkill: 'Conversational Spanish',
    timeCommitment: '1 hour weekly',
    likes: 14,
    responses: 6,
    timeAgo: '2 hours ago'
  },
  {
    id: 'post-2',
    author: 'Meera Nair',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    title: 'Commercial Video Editor ready to swap Premiere Pro tricks for React portfolio help!',
    tags: ['Video Editing', 'React', 'Web Dev'],
    wantSkill: 'React / Frontend',
    giveSkill: 'Premiere Pro & After Effects',
    timeCommitment: '45 min sessions',
    likes: 22,
    responses: 9,
    timeAgo: '5 hours ago'
  },
  {
    id: 'post-3',
    author: 'Jordan Lee',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    title: 'Acoustic fingerstyle guitar or audio mixdown for introductory UI/UX design',
    tags: ['Music', 'Guitar', 'Design'],
    wantSkill: 'UI/UX Design',
    giveSkill: 'Acoustic Guitar',
    timeCommitment: 'Weekend mornings',
    likes: 18,
    responses: 4,
    timeAgo: '1 day ago'
  }
];

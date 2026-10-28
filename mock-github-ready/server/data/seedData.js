import bcrypt from 'bcryptjs';

// Pre-hashed passwords for instant deterministic initialization
const salt = bcrypt.genSaltSync(10);
const adminPasswordHash = bcrypt.hashSync('Admin@12345', salt);
const candidatePasswordHash = bcrypt.hashSync('Candidate@12345', salt);

export const initialUsers = [
  {
    _id: 'usr_admin_001',
    name: 'Sarah Connor (Lead Admin)',
    email: 'admin@mockinterview.pro',
    password: adminPasswordHash,
    role: 'admin',
    title: 'Platform Director & Lead Architect',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 019-2834',
    targetCompany: 'System Administration',
    experienceLevel: 'Staff',
    createdAt: new Date('2026-01-10T08:00:00Z'),
  },
  {
    _id: 'usr_cand_001',
    name: 'Alex Chen',
    email: 'candidate@mockinterview.pro',
    password: candidatePasswordHash,
    role: 'user',
    title: 'Senior Software Engineer Candidate',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 432-8765',
    targetCompany: 'Google',
    experienceLevel: 'Senior L5',
    createdAt: new Date('2026-02-01T10:30:00Z'),
  },
  {
    _id: 'usr_cand_002',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    password: candidatePasswordHash,
    role: 'user',
    title: 'Frontend Specialist Candidate',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 789-1234',
    targetCompany: 'Meta',
    experienceLevel: 'Mid-Level L4',
    createdAt: new Date('2026-02-15T14:20:00Z'),
  },
  {
    _id: 'usr_cand_003',
    name: 'Rohit Sharma',
    email: 'dev.rohit@example.com',
    password: candidatePasswordHash,
    role: 'user',
    title: 'Backend & Cloud Systems Aspirant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 654-9871',
    targetCompany: 'Netflix',
    experienceLevel: 'Senior L5',
    createdAt: new Date('2026-02-20T16:45:00Z'),
  },
  {
    _id: 'usr_cand_004',
    name: 'Elena Rostova',
    email: 'elena.rostova@techgate.io',
    password: candidatePasswordHash,
    role: 'user',
    title: 'AI / LLM Infrastructure Engineer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 321-7654',
    targetCompany: 'OpenAI',
    experienceLevel: 'Staff L6',
    createdAt: new Date('2026-02-25T11:15:00Z'),
  }
];

export const initialBookings = [
  {
    _id: 'bkg_001',
    candidateId: 'usr_cand_001',
    candidateName: 'Alex Chen',
    candidateEmail: 'candidate@mockinterview.pro',
    interviewTrack: 'System Design & Architecture',
    targetCompany: 'Google',
    difficulty: 'Senior L5',
    date: '2026-11-05',
    timeSlot: '02:00 PM - 03:00 PM EST',
    interviewer: {
      name: 'Marcus Vance',
      title: 'Principal Systems Architect',
      company: 'Ex-Google / Stripe',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    meetingLink: 'https://meet.mockinterview.pro/room-google-l5-sd',
    status: 'Confirmed',
    resumeUrl: 'https://drive.google.com/file/d/alex-chen-senior-swe-resume.pdf',
    candidateNotes: 'Targeting Google Cloud storage & distributed caching system design questions. Need specific deep-dive on consensus protocols (Raft/Paxos).',
    scorecard: null,
    createdAt: new Date('2026-10-15T09:30:00Z'),
    updatedAt: new Date('2026-10-16T11:20:00Z'),
  },
  {
    _id: 'bkg_002',
    candidateId: 'usr_cand_001',
    candidateName: 'Alex Chen',
    candidateEmail: 'candidate@mockinterview.pro',
    interviewTrack: 'Data Structures & Algorithms',
    targetCompany: 'Amazon',
    difficulty: 'Senior L5',
    date: '2026-10-20',
    timeSlot: '10:00 AM - 11:00 AM EST',
    interviewer: {
      name: 'Priya Sundaram',
      title: 'Senior Engineering Manager',
      company: 'Amazon Web Services',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    },
    meetingLink: 'https://meet.mockinterview.pro/room-amazon-dsa-completed',
    status: 'Completed',
    resumeUrl: 'https://drive.google.com/file/d/alex-chen-senior-swe-resume.pdf',
    candidateNotes: 'Practiced Graph shortest path (Dijkstra) and Amazon 14 Leadership Principles (Customer Obsession, Bias for Action).',
    scorecard: {
      problemSolving: 9,
      systemArchitecture: 8,
      codingProficiency: 9,
      communication: 9,
      overallRating: 4.8,
      hireRecommendation: 'Strong Hire',
      strengths: [
        'Exceptional clarification of edge cases before writing code',
        'Clean, modular Python implementation with optimal O(V + E log V) complexity',
        'Articulate explanation of tradeoffs between Dijkstra and A* search'
      ],
      areasOfImprovement: [
        'Spend 30 seconds more structuring the STAR response for Behavioral questions to keep time tighter',
        'Mention concurrency locks when discussing shared state in production caches'
      ],
      interviewerSummary: 'Alex exhibited outstanding algorithmic rigour and strong engineering communication. Handled follow-up complexity constraints smoothly and wrote production-grade code on a shared whiteboard. Definitely ready for FAANG Senior L5 rounds.'
    },
    createdAt: new Date('2026-10-10T14:10:00Z'),
    updatedAt: new Date('2026-10-20T11:45:00Z'),
  },
  {
    _id: 'bkg_003',
    candidateId: 'usr_cand_002',
    candidateName: 'Sarah Jenkins',
    candidateEmail: 'sarah.j@example.com',
    interviewTrack: 'Frontend Engineering',
    targetCompany: 'Meta',
    difficulty: 'Mid-Level L4',
    date: '2026-11-08',
    timeSlot: '04:00 PM - 05:00 PM EST',
    interviewer: {
      name: 'David Zhao',
      title: 'Staff Frontend Engineer',
      company: 'Meta (Instagram Core)',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
    meetingLink: 'https://meet.mockinterview.pro/room-meta-l4-fe',
    status: 'Pending',
    resumeUrl: 'https://github.com/sarah-jenkins/portfolio',
    candidateNotes: 'Would like to focus on React performance optimization, virtualized scrolling, and building accessible UI component libraries from scratch.',
    scorecard: null,
    createdAt: new Date('2026-10-24T18:00:00Z'),
    updatedAt: new Date('2026-10-24T18:00:00Z'),
  },
  {
    _id: 'bkg_004',
    candidateId: 'usr_cand_003',
    candidateName: 'Rohit Sharma',
    candidateEmail: 'dev.rohit@example.com',
    interviewTrack: 'Full Stack Web (MERN)',
    targetCompany: 'Netflix',
    difficulty: 'Senior L5',
    date: '2026-11-12',
    timeSlot: '11:00 AM - 12:00 PM EST',
    interviewer: {
      name: 'Elena Rostova',
      title: 'Director of Platform Engineering',
      company: 'Netflix Tech',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    meetingLink: 'https://meet.mockinterview.pro/room-netflix-fs',
    status: 'Confirmed',
    resumeUrl: 'https://linkedin.com/in/rohit-sharma-backend',
    candidateNotes: 'Focus on high-throughput microservices, Redis caching hierarchies, JWT refresh token rotation, and MongoDB sharding.',
    scorecard: null,
    createdAt: new Date('2026-10-22T08:20:00Z'),
    updatedAt: new Date('2026-10-23T14:15:00Z'),
  },
  {
    _id: 'bkg_005',
    candidateId: 'usr_cand_004',
    candidateName: 'Elena Rostova',
    candidateEmail: 'elena.rostova@techgate.io',
    interviewTrack: 'Machine Learning & AI',
    targetCompany: 'OpenAI',
    difficulty: 'Staff L6',
    date: '2026-10-18',
    timeSlot: '01:00 PM - 02:00 PM EST',
    interviewer: {
      name: 'Dr. Katherine Wells',
      title: 'Lead AI Research Scientist',
      company: 'Ex-DeepMind',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    meetingLink: 'https://meet.mockinterview.pro/room-openai-staff-ml',
    status: 'Completed',
    resumeUrl: 'https://scholar.google.com/citations?user=elena-rostova',
    candidateNotes: 'Transformer inference scaling, speculative decoding, and vLLM architecture.',
    scorecard: {
      problemSolving: 10,
      systemArchitecture: 10,
      codingProficiency: 9,
      communication: 10,
      overallRating: 5.0,
      hireRecommendation: 'Strong Hire',
      strengths: [
        'Deep intuition on KV-cache memory bandwidth bottlenecks and paged attention',
        'Mastery of FlashAttention-3 kernels and distributed tensor parallelism',
        'Charismatic and crisp communication style'
      ],
      areasOfImprovement: [
        'None observed. Ready for top-tier Staff AI roles.'
      ],
      interviewerSummary: 'World-class performance on distributed model inference architectures. Unanimous Strong Hire recommendation.'
    },
    createdAt: new Date('2026-10-05T12:00:00Z'),
    updatedAt: new Date('2026-10-18T15:00:00Z'),
  }
];

export const interviewTracks = [
  'Data Structures & Algorithms',
  'System Design & Architecture',
  'Full Stack Web (MERN)',
  'Frontend Engineering',
  'Engineering Management & Behavioral',
  'Machine Learning & AI'
];

export const availableCompanies = [
  'Google',
  'Meta',
  'Amazon',
  'Apple',
  'Netflix',
  'Microsoft',
  'Uber',
  'OpenAI',
  'Stripe'
];

export const verifiedInterviewers = [
  {
    name: 'Marcus Vance',
    title: 'Principal Systems Architect',
    company: 'Ex-Google / Stripe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    specialty: 'System Design & Distributed Systems',
    sessionsConducted: 142,
    rating: 4.96
  },
  {
    name: 'Priya Sundaram',
    title: 'Senior Engineering Manager',
    company: 'Amazon Web Services',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    specialty: 'DSA & Behavioral / Leadership',
    sessionsConducted: 210,
    rating: 4.98
  },
  {
    name: 'David Zhao',
    title: 'Staff Frontend Engineer',
    company: 'Meta (Instagram Core)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    specialty: 'Frontend Architecture & React Internals',
    sessionsConducted: 98,
    rating: 4.92
  },
  {
    name: 'Dr. Katherine Wells',
    title: 'Lead AI Research Scientist',
    company: 'Ex-DeepMind',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    specialty: 'Machine Learning & Transformer Systems',
    sessionsConducted: 115,
    rating: 4.99
  }
];

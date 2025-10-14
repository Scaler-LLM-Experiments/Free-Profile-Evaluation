// Configuration for chatty quiz screens with grouped questions

// Tech Professional Path - Questions for users who selected 'tech' background
export const TECH_QUIZ_SCREENS = [
  // Screen 1: Profile Background
  {
    id: 'profile',
    initialChatText: "Tell us about your background",
    questions: [
      {
        id: 'currentBackground',
        question: 'What is your current role/background?',
        options: [
          { value: 'student-freshgrad', label: 'Student / Fresh Grad' },
          { value: 'swe-product', label: 'Working SWE (Product)' },
          { value: 'swe-service', label: 'Working SWE (Service)' }
        ]
      },
      {
        id: 'experience',
        question: 'How many years of professional experience do you have?',
        options: [
          { value: '0', label: '0 years (Student/Recent Graduate)' },
          { value: '0-2', label: '0-2 years' },
          { value: '3-5', label: '3-5 years' },
          { value: '5+', label: '5+ years' }
        ]
      }
    ],
    chatResponseMap: {
      currentBackground: {
        'student-freshgrad': "Great start! Let's build a strong foundation for your tech career",
        'swe-product': "Excellent! Let's accelerate your growth in product development",
        'swe-service': "Perfect! Let's help you level up and explore new opportunities"
      },
      experience: {
        '0': "Perfect timing! Let's build strong foundations from day one",
        '0-2': "Early days are crucial! Let's build rock-solid foundations together",
        '3-5': "Great experience base! Time to accelerate your growth exponentially",
        '5+': "Impressive journey! Let's optimize and maximize your market value"
      }
    }
  },

  // Screen 2: Motivation & Target Role
  {
    id: 'motivation',
    initialChatText: "What's driving your move?",
    questions: [
      {
        id: 'requirementType',
        question: 'What motivates your transition most?',
        options: [
          { value: 'salary-growth', label: 'Better salary growth' },
          { value: 'interest', label: 'Interest in software/technology' },
          { value: 'job-stability', label: 'Job stability / future-proofing' },
          { value: 'peer-influence', label: 'Peer influence / external push' }
        ]
      },
      {
        id: 'targetRole',
        question: 'What target role are you aiming for?',
        options: [
          { value: 'faang-product', label: 'FAANG / Product SDE' },
          { value: 'backend-fullstack', label: 'Backend / Full-Stack Engineer' },
          { value: 'data-ml', label: 'Data / ML Engineer' },
          { value: 'techlead-architect', label: 'Tech Lead / Architect' }
        ]
      }
    ],
    chatResponseMap: {
      requirementType: {
        'salary-growth': "Smart move! Tech careers offer excellent compensation growth potential",
        'interest': "Passion-driven learning is the best! Let's channel this into career growth",
        'job-stability': "Wise thinking! Tech skills are future-proof and always in demand",
        'peer-influence': "Great that you're taking action! Let's make this transition successful"
      },
      targetRole: {
        'faang-product': "Ambitious goal! Top product companies look for well-rounded engineers",
        'backend-fullstack': "Solid choice! Backend and full-stack roles are always in demand",
        'data-ml': "Exciting field! Data & ML skills are the future of tech",
        'techlead-architect': "Leadership path! Let's build the skills to guide technical teams"
      }
    }
  },

  // Screen 3: Technical Skills
  {
    id: 'technical-skills',
    initialChatText: "Let's assess your technical skills",
    questions: [
      {
        id: 'codingPractice',
        question: 'How active has your coding practice been in the last 3 months?',
        options: [
          { value: '0-10', label: '0–10 coding problems' },
          { value: '11-50', label: '11–50 coding problems' },
          { value: '51-100', label: '51–100 coding problems' },
          { value: '100+', label: '100+ coding problems' }
        ]
      },
      {
        id: 'systemDesign',
        question: 'What is your system design exposure level?',
        options: [
          { value: 'led-multiple', label: 'Led multiple design discussions' },
          { value: 'participated', label: 'Participated once or twice' },
          { value: 'learning', label: 'Not yet, but learning' }
        ]
      }
    ],
    chatResponseMap: {
      codingPractice: {
        '0-10': "Let's build a consistent coding practice routine together",
        '11-50': "Good start! Let's increase the intensity and consistency",
        '51-100': "Solid practice! You're building strong problem-solving muscles",
        '100+': "Excellent dedication! Your practice is paying off"
      },
      systemDesign: {
        'led-multiple': "Impressive! You have strong design leadership experience",
        'participated': "Good exposure! Let's deepen your system design skills",
        'learning': "Perfect timing! We'll help you build system design expertise"
      }
    }
  },

  // Screen 4: Portfolio & Interview Prep
  {
    id: 'preparation',
    initialChatText: "Share your preparation level",
    questions: [
      {
        id: 'portfolio',
        question: 'How strong is your portfolio/GitHub presence?',
        options: [
          { value: 'active-5plus', label: 'Active with 5+ maintained repos' },
          { value: 'limited-1to5', label: 'Limited with 1–5 repos' },
          { value: 'inactive', label: 'Inactive / Outdated' },
          { value: 'no-portfolio', label: 'No public portfolio yet' }
        ]
      },
      {
        id: 'interviewPractice',
        question: 'How often do you practice interviews?',
        options: [
          { value: 'weekly', label: 'Weekly or more' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'rarely', label: 'Rarely' },
          { value: 'never', label: 'Never' }
        ]
      }
    ],
    chatResponseMap: {
      portfolio: {
        'active-5plus': "Outstanding! Your portfolio showcases strong technical depth",
        'limited-1to5': "Good foundation! Let's expand and showcase more projects",
        'inactive': "Let's revitalize your portfolio with recent projects",
        'no-portfolio': "No worries! We'll help you build an impressive portfolio"
      },
      interviewPractice: {
        'weekly': "Excellent routine! Regular practice builds strong interview skills",
        'monthly': "Good consistency! Let's optimize your practice for better results",
        'rarely': "Let's build a structured interview preparation routine",
        'never': "Perfect time to start! Interview prep is crucial for success"
      }
    }
  },

  // Goals Screen
  {
    id: 'goals',
    initialChatText: "Last step! Which industries are you targeting?",
    isGoalsScreen: true,
    questions: [],
    chatResponseMap: {}
  }
];

// Non-Tech / Career Switcher Path - Questions for users who selected 'non-tech' background
export const NON_TECH_QUIZ_SCREENS = [
  // Screen 1: Profile Background
  {
    id: 'profile',
    initialChatText: "Tell us about your background",
    questions: [
      {
        id: 'currentBackground',
        question: 'What is your current role/background?',
        options: [
          { value: 'non-tech', label: 'Non-tech (Marketing, Sales, Finance, etc.)' },
          { value: 'it-services', label: 'IT Services (Support, QA, Project Management)' },
          { value: 'technical', label: 'Other Technical (Engineering, Design, etc.)' },
          { value: 'fresh-graduate', label: 'Fresh Graduate (Non-CS)' }
        ]
      },
      {
        id: 'experience',
        question: 'How many years of professional experience do you have?',
        options: [
          { value: '0', label: '0 years (Student/Recent Graduate)' },
          { value: '0-2', label: '0-2 years' },
          { value: '3-5', label: '3-5 years' },
          { value: '5+', label: '5+ years' }
        ]
      }
    ],
    chatResponseMap: {
      currentBackground: {
        'non-tech': "Great starting point! We'll help you build a strong tech foundation",
        'it-services': "Perfect! Let's accelerate your transition to core software development",
        'technical': "Excellent background! Time to sharpen those software engineering skills",
        'fresh-graduate': "Great time to start! Let's build your career from the ground up"
      },
      experience: {
        '0': "Perfect timing! Let's build strong foundations from day one",
        '0-2': "Early days are crucial! Let's build rock-solid foundations together",
        '3-5': "Great experience base! Time to accelerate your growth exponentially",
        '5+': "Impressive journey! Let's optimize and maximize your market value"
      }
    }
  },

  // Screen 2: Motivation
  {
    id: 'motivation',
    initialChatText: "What's driving your move?",
    questions: [
      {
        id: 'requirementType',
        question: 'What motivates your transition most?',
        options: [
          { value: 'salary-growth', label: 'Better salary growth' },
          { value: 'interest', label: 'Interest in software/technology' },
          { value: 'job-stability', label: 'Job stability / future-proofing' },
          { value: 'peer-influence', label: 'Peer influence / external push' }
        ]
      },
      {
        id: 'targetRole',
        question: 'What target role are you aiming for?',
        options: [
          { value: 'backend', label: 'Backend Developer' },
          { value: 'fullstack', label: 'Full-Stack Developer' },
          { value: 'data-ml', label: 'Data/ML Engineer' },
          { value: 'not-sure', label: 'Not sure yet' }
        ]
      }
    ],
    chatResponseMap: {
      requirementType: {
        'salary-growth': "Smart move! Tech careers offer excellent compensation growth potential",
        'interest': "Passion-driven learning is the best! Let's channel this into career growth",
        'job-stability': "Wise thinking! Tech skills are future-proof and always in demand",
        'peer-influence': "Great that you're taking action! Let's make this transition successful"
      },
      targetRole: {
        'backend': "Solid choice! Backend development is always in high demand",
        'fullstack': "Versatile skillset! Full-stack developers are highly valued in the market",
        'data-ml': "Exciting field! Data & ML skills are the future of tech",
        'not-sure': "No worries! We'll help you explore and find the right fit"
      }
    }
  },

  // Screen 3: Current Status
  {
    id: 'preparation',
    initialChatText: "Share your current preparation",
    questions: [
      {
        id: 'stepsTaken',
        question: 'What steps have you already taken?',
        options: [
          { value: 'completed-course', label: 'Completed a bootcamp/course' },
          { value: 'self-learning', label: 'Self-learning (online tutorials, books)' },
          { value: 'just-exploring', label: 'Just exploring and researching' }
        ]
      },
      {
        id: 'codeComfort',
        question: 'How comfortable are you today with writing basic code (loops, functions, arrays)?',
        options: [
          { value: 'havent-tried', label: "Haven't tried yet" },
          { value: 'follow-tutorials', label: 'Can follow tutorials' },
          { value: 'solve-problems', label: 'Can solve simple problems independently' }
        ]
      },
      {
        id: 'timePerWeek',
        question: 'How much time per week can you realistically dedicate to upskilling?',
        options: [
          { value: '0-2', label: '0-2 hours' },
          { value: '3-5', label: '3-5 hours' },
          { value: '6-10', label: '6-10 hours' },
          { value: '10+', label: '10+ hours' }
        ]
      }
    ],
    chatResponseMap: {
      stepsTaken: {
        'completed-course': "Great foundation! Let's build on what you've learned with real practice",
        'self-learning': "Love the initiative! Let's structure this into a clear learning path",
        'just-exploring': "Perfect timing to start! We'll guide you step-by-step on this journey"
      },
      codeComfort: {
        'havent-tried': "Everyone starts somewhere! We'll build your coding confidence from scratch",
        'follow-tutorials': "Good progress! Let's move from following to creating independently",
        'solve-problems': "Excellent! You have the foundation, now let's level up your skills"
      },
      timePerWeek: {
        '0-2': "Every hour counts! Let's make focused, high-impact learning sessions",
        '3-5': "Good weekly commitment! Consistency at this pace builds strong foundations",
        '6-10': "Excellent dedication! This investment will accelerate your learning significantly",
        '10+': "Impressive commitment! You're on track for rapid skill development"
      }
    }
  },

  // Goals Screen
  {
    id: 'goals',
    initialChatText: "Last step! Which industries are you targeting?",
    isGoalsScreen: true,
    questions: [],
    chatResponseMap: {}
  }
];

// Legacy export for backward compatibility - defaults to non-tech path
export const CHATTY_QUIZ_SCREENS = NON_TECH_QUIZ_SCREENS;

// Helper function to get all question IDs for validation
export const getAllQuestionIds = () => {
  return CHATTY_QUIZ_SCREENS.flatMap(screen =>
    screen.questions.map(q => q.id)
  );
};

// Helper to check if all questions in a screen are answered
export const isScreenComplete = (screenId, responses) => {
  const screen = CHATTY_QUIZ_SCREENS.find(s => s.id === screenId);
  if (!screen) return false;

  // Special handling for goals screen
  if (screen.isGoalsScreen) {
    return true; // Goals screen completion is handled separately
  }

  return screen.questions.every(q => responses[q.id]);
};

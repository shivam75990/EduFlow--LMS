const EduData = {
  user: {
    name: 'Shivam Kumar',
    email: 'shivam@example.com',
    bio: 'Passionate full-stack developer and lifelong learner. Currently exploring advanced machine learning concepts and cloud architecture.',
    avatar: 'SK',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'GraphQL'],
    goals: ['Complete AWS Certification', 'Build 3 full-stack projects', 'Contribute to open source'],
    joinDate: 'January 2024'
  },

  stats: {
    totalCourses: 12,
    completedCourses: 5,
    hoursLearned: 168,
    certificatesEarned: 3,
    currentStreak: 7,
    longestStreak: 14,
    weeklyActivity: [4, 6, 3, 7, 5, 8, 2],
    overallProgress: 42
  },

  courses: [
    {
      id: 1,
      title: 'Advanced JavaScript Mastery',
      instructor: 'Sarah Chen',
      category: 'Programming',
      difficulty: 'advanced',
      thumbnail: null,
      description: 'Deep dive into JavaScript closures, prototypes, async patterns, and modern ES6+ features. Build real-world applications with advanced patterns.',
      skills: ['Closures & Scope', 'Prototypes & Inheritance', 'Async/Await', 'Design Patterns', 'Testing'],
      lessons: [
        { id: 1, title: 'Understanding Closures', duration: '24:15', completed: true },
        { id: 2, title: 'Prototypal Inheritance Deep Dive', duration: '31:40', completed: true },
        { id: 3, title: 'Async Patterns & Promises', duration: '28:30', completed: true },
        { id: 4, title: 'Generators & Iterators', duration: '22:10', completed: true },
        { id: 5, title: 'Design Patterns in JS', duration: '35:20', completed: false },
        { id: 6, title: 'Testing with Jest', duration: '26:45', completed: false },
        { id: 7, title: 'Performance Optimization', duration: '29:30', completed: false },
        { id: 8, title: 'Building a Real-world App', duration: '42:00', completed: false }
      ],
      progress: 50,
      duration: '3h 40m',
      lessonsCount: 8,
      completedLessons: 4,
      enrolled: true
    },
    {
      id: 2,
      title: 'React & Modern Frontend Development',
      instructor: 'Marcus Johnson',
      category: 'Frontend',
      difficulty: 'intermediate',
      thumbnail: null,
      description: 'Master React 18 with hooks, context API, state management, and modern tooling. Build production-ready applications.',
      skills: ['React Hooks', 'Context API', 'Redux Toolkit', 'Next.js', 'Tailwind CSS'],
      lessons: [
        { id: 1, title: 'React Fundamentals', duration: '28:00', completed: true },
        { id: 2, title: 'Hooks in Depth', duration: '34:20', completed: true },
        { id: 3, title: 'State Management', duration: '30:15', completed: false },
        { id: 4, title: 'Routing & Navigation', duration: '25:40', completed: false },
        { id: 5, title: 'API Integration', duration: '32:10', completed: false },
        { id: 6, title: 'Testing React Apps', duration: '27:50', completed: false }
      ],
      progress: 33,
      duration: '2h 58m',
      lessonsCount: 6,
      completedLessons: 2,
      enrolled: true
    },
    {
      id: 3,
      title: 'Python for Data Science',
      instructor: 'Dr. Emily Watson',
      category: 'Data Science',
      difficulty: 'beginner',
      thumbnail: null,
      description: 'Learn Python programming from scratch with a focus on data analysis, visualization, and machine learning fundamentals.',
      skills: ['Python Basics', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
      lessons: [
        { id: 1, title: 'Python Basics', duration: '22:30', completed: true },
        { id: 2, title: 'Data Structures', duration: '26:15', completed: true },
        { id: 3, title: 'NumPy Fundamentals', duration: '29:40', completed: true },
        { id: 4, title: 'Pandas for Data Analysis', duration: '35:20', completed: true },
        { id: 5, title: 'Data Visualization', duration: '28:10', completed: true },
        { id: 6, title: 'Introduction to ML', duration: '33:45', completed: false }
      ],
      progress: 83,
      duration: '2h 55m',
      lessonsCount: 6,
      completedLessons: 5,
      enrolled: true
    },
    {
      id: 4,
      title: 'Cloud Architecture on AWS',
      instructor: 'Alex Rivera',
      category: 'Cloud',
      difficulty: 'advanced',
      thumbnail: null,
      description: 'Design scalable, resilient cloud architectures on AWS. Covering compute, storage, networking, and security best practices.',
      skills: ['EC2 & Lambda', 'S3 & RDS', 'VPC Design', 'Security Best Practices', 'Architecture Patterns'],
      lessons: [
        { id: 1, title: 'AWS Fundamentals', duration: '25:30', completed: true },
        { id: 2, title: 'Compute Services', duration: '30:20', completed: false },
        { id: 3, title: 'Storage Solutions', duration: '28:45', completed: false },
        { id: 4, title: 'Networking & VPC', duration: '34:10', completed: false },
        { id: 5, title: 'Security & IAM', duration: '27:50', completed: false },
        { id: 6, title: 'Architecture Patterns', duration: '36:25', completed: false },
        { id: 7, title: 'Cost Optimization', duration: '22:15', completed: false }
      ],
      progress: 14,
      duration: '3h 25m',
      lessonsCount: 7,
      completedLessons: 1,
      enrolled: true
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      instructor: 'Olivia Park',
      category: 'Design',
      difficulty: 'beginner',
      thumbnail: null,
      description: 'Learn the fundamentals of user interface and user experience design. Master Figma, design systems, and user research.',
      skills: ['Design Thinking', 'Figma', 'Wireframing', 'Prototyping', 'User Research'],
      lessons: [
        { id: 1, title: 'Design Thinking Process', duration: '20:15', completed: true },
        { id: 2, title: 'Color Theory', duration: '18:40', completed: true },
        { id: 3, title: 'Typography', duration: '22:30', completed: true },
        { id: 4, title: 'Layout & Composition', duration: '25:10', completed: false },
        { id: 5, title: 'Figma Fundamentals', duration: '32:20', completed: false }
      ],
      progress: 60,
      duration: '1h 58m',
      lessonsCount: 5,
      completedLessons: 3,
      enrolled: false
    },
    {
      id: 6,
      title: 'Node.js Backend Development',
      instructor: 'David Kim',
      category: 'Programming',
      difficulty: 'intermediate',
      thumbnail: null,
      description: 'Build scalable backend services with Node.js, Express, databases, and authentication.',
      skills: ['Express.js', 'MongoDB', 'Authentication', 'REST APIs', 'WebSockets'],
      lessons: [
        { id: 1, title: 'Node.js Runtime', duration: '24:30', completed: true },
        { id: 2, title: 'Express Framework', duration: '28:15', completed: true },
        { id: 3, title: 'Database Integration', duration: '32:40', completed: true },
        { id: 4, title: 'Authentication & Authorization', duration: '30:20', completed: false },
        { id: 5, title: 'RESTful API Design', duration: '26:50', completed: false },
        { id: 6, title: 'Real-time Features', duration: '34:10', completed: false }
      ],
      progress: 50,
      duration: '2h 56m',
      lessonsCount: 6,
      completedLessons: 3,
      enrolled: true
    },
    {
      id: 7,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Watson',
      category: 'Data Science',
      difficulty: 'intermediate',
      thumbnail: null,
      description: 'Understand core ML algorithms, model training, evaluation, and deployment pipelines.',
      skills: ['Supervised Learning', 'Neural Networks', 'Model Evaluation', 'Feature Engineering', 'Deployment'],
      lessons: [
        { id: 1, title: 'ML Overview', duration: '20:00', completed: true },
        { id: 2, title: 'Linear Regression', duration: '26:30', completed: false },
        { id: 3, title: 'Classification Models', duration: '32:15', completed: false },
        { id: 4, title: 'Neural Networks Intro', duration: '35:40', completed: false },
        { id: 5, title: 'Model Evaluation', duration: '28:20', completed: false },
        { id: 6, title: 'Deployment Strategies', duration: '24:10', completed: false }
      ],
      progress: 16,
      duration: '2h 47m',
      lessonsCount: 6,
      completedLessons: 1,
      enrolled: false
    },
    {
      id: 8,
      title: 'TypeScript Deep Dive',
      instructor: 'Sarah Chen',
      category: 'Programming',
      difficulty: 'advanced',
      thumbnail: null,
      description: 'Master TypeScript from advanced types to decorators, generics, and real-world patterns.',
      skills: ['Advanced Types', 'Generics', 'Decorators', 'TypeScript with React', 'Declaration Files'],
      lessons: [
        { id: 1, title: 'Type System Deep Dive', duration: '28:30', completed: true },
        { id: 2, title: 'Advanced Generics', duration: '32:20', completed: true },
        { id: 3, title: 'Decorators & Metaprogramming', duration: '26:45', completed: false },
        { id: 4, title: 'TypeScript with React', duration: '30:10', completed: false },
        { id: 5, title: 'Declaration Files & Modules', duration: '24:35', completed: false }
      ],
      progress: 40,
      duration: '2h 22m',
      lessonsCount: 5,
      completedLessons: 2,
      enrolled: true
    }
  ],

  certificates: [
    {
      id: 'CERT-2024-001',
      studentName: 'Shivam Kumar',
      courseName: 'Advanced JavaScript Mastery',
      date: 'March 15, 2024',
      completed: true
    },
    {
      id: 'CERT-2024-002',
      studentName: 'Shivam Kumar',
      courseName: 'React & Modern Frontend Development',
      date: 'May 22, 2024',
      completed: true
    },
    {
      id: 'CERT-2024-003',
      studentName: 'Shivam Kumar',
      courseName: 'Python for Data Science',
      date: 'June 10, 2024',
      completed: true
    }
  ],

  achievements: [
    { id: 1, title: 'Quick Starter', description: 'Complete your first course', icon: '🚀', unlocked: true },
    { id: 2, title: 'Code Warrior', description: 'Complete 5 courses', icon: '⚔️', unlocked: true },
    { id: 3, title: 'Knowledge Seeker', description: 'Spend 100 hours learning', icon: '📚', unlocked: true },
    { id: 4, title: 'Streak Master', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: true },
    { id: 5, title: 'Certified Pro', description: 'Earn 5 certificates', icon: '🎓', unlocked: false },
    { id: 6, title: 'Full Stack Hero', description: 'Complete both frontend & backend courses', icon: '🌟', unlocked: false }
  ],

  notifications: [
    { id: 1, title: 'New course available', message: 'TypeScript Deep Dive is now available in your courses.', time: '2 min ago', read: false },
    { id: 2, title: 'Certificate earned', message: 'Congratulations! You earned a certificate for Python for Data Science.', time: '2 days ago', read: false },
    { id: 3, title: 'Course update', message: 'Advanced JavaScript Mastery has new content added.', time: '1 week ago', read: true },
    { id: 4, title: 'Achievement unlocked', message: 'You unlocked the "Streak Master" achievement!', time: '2 weeks ago', read: true },
    { id: 5, title: 'Progress reminder', message: 'You\'re 83% through Python for Data Science. Keep going!', time: '3 weeks ago', read: true }
  ]
};

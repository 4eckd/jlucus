export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
  category: 'frontend' | 'backend' | 'blockchain' | 'ai' | 'devops' | 'tools' | 'languages';
  description: string;
  xp: number;
  maxXP: number;
  icon?: string;
  projects?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export const SKILLS: Skill[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    level: 'expert',
    category: 'frontend',
    description: 'Advanced React patterns, hooks, and performance optimization',
    xp: 8500,
    maxXP: 10000,
    projects: ['terminal-portfolio', 'ai-code-reviewer'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 'expert',
    category: 'languages',
    description: 'Type-safe JavaScript development with advanced type patterns',
    xp: 9000,
    maxXP: 10000,
    projects: ['terminal-portfolio', 'mobile-wallet'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    level: 'advanced',
    category: 'frontend',
    description: 'Full-stack React framework with SSR/SSG and API routes',
    xp: 7500,
    maxXP: 10000,
    projects: ['terminal-portfolio'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    level: 'expert',
    category: 'frontend',
    description: 'Utility-first CSS framework with custom design systems',
    xp: 9200,
    maxXP: 10000,
    projects: ['terminal-portfolio'],
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    level: 'expert',
    category: 'backend',
    description: 'Server-side JavaScript runtime with microservices architecture',
    xp: 8800,
    maxXP: 10000,
    projects: ['ai-code-reviewer'],
  },
  {
    id: 'python',
    name: 'Python',
    level: 'advanced',
    category: 'languages',
    description: 'Backend development with FastAPI and machine learning',
    xp: 7800,
    maxXP: 10000,
    projects: ['ai-code-reviewer', 'defi-automator'],
  },
  {
    id: 'go',
    name: 'Go',
    level: 'intermediate',
    category: 'backend',
    description: 'High-performance backend services and CLI tool development',
    xp: 6500,
    maxXP: 10000,
    projects: ['cli-tools', 'dev-ops-suite'],
  },
  {
    id: 'rust',
    name: 'Rust',
    level: 'intermediate',
    category: 'backend',
    description: 'Systems programming with memory safety and performance',
    xp: 6000,
    maxXP: 10000,
    projects: ['defi-automator', 'cli-tools'],
  },

  // Blockchain
  {
    id: 'solidity',
    name: 'Solidity',
    level: 'expert',
    category: 'blockchain',
    description: 'Smart contract development for Ethereum and EVM-compatible chains',
    xp: 9000,
    maxXP: 10000,
    projects: ['defi-automator', 'mobile-wallet'],
  },
  {
    id: 'web3',
    name: 'Web3.js/Ethers.js',
    level: 'advanced',
    category: 'blockchain',
    description: 'Blockchain integration and DApp development',
    xp: 7000,
    maxXP: 10000,
    projects: ['mobile-wallet', 'web3-education'],
  },
  {
    id: 'defi',
    name: 'DeFi Protocols',
    level: 'expert',
    category: 'blockchain',
    description: 'Decentralized finance protocol design and implementation',
    xp: 8500,
    maxXP: 10000,
    projects: ['defi-automator'],
  },

  // AI/ML
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    level: 'advanced',
    category: 'ai',
    description: 'TensorFlow, PyTorch, and custom ML model development',
    xp: 7200,
    maxXP: 10000,
    projects: ['ai-code-reviewer', 'defi-automator'],
  },
  {
    id: 'openai',
    name: 'OpenAI APIs',
    level: 'expert',
    category: 'ai',
    description: 'GPT integration for automated code analysis and generation',
    xp: 8000,
    maxXP: 10000,
    projects: ['ai-code-reviewer'],
  },

  // DevOps
  {
    id: 'docker',
    name: 'Docker',
    level: 'expert',
    category: 'devops',
    description: 'Containerization and microservices deployment',
    xp: 8700,
    maxXP: 10000,
    projects: ['dev-ops-suite'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    level: 'advanced',
    category: 'devops',
    description: 'Orchestration of containerized applications at scale',
    xp: 7600,
    maxXP: 10000,
    projects: ['dev-ops-suite'],
  },
  {
    id: 'ci-cd',
    name: 'CI/CD Pipeline',
    level: 'expert',
    category: 'devops',
    description: 'Automated testing, building, and deployment workflows',
    xp: 8800,
    maxXP: 10000,
    projects: ['dev-ops-suite', 'ai-code-reviewer'],
  },

  // Tools
  {
    id: 'git',
    name: 'Git',
    level: 'master',
    category: 'tools',
    description: 'Advanced Git workflows and team collaboration',
    xp: 9500,
    maxXP: 10000,
    projects: ['cli-tools'],
  },
  {
    id: 'npm',
    name: 'NPM/Yarn',
    level: 'expert',
    category: 'tools',
    description: 'Package management and build optimization',
    xp: 9000,
    maxXP: 10000,
    projects: ['terminal-portfolio'],
  },
  {
    id: 'shell',
    name: 'Shell Scripting',
    level: 'advanced',
    category: 'tools',
    description: 'Bash/Zsh scripting for automation and productivity',
    xp: 7800,
    maxXP: 10000,
    projects: ['cli-tools'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'User interface development and modern web technologies',
    icon: 'Monitor',
    skills: SKILLS.filter(skill => skill.category === 'frontend'),
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Server-side programming and API development',
    icon: 'Server',
    skills: SKILLS.filter(skill => skill.category === 'backend'),
  },
  {
    id: 'blockchain',
    name: 'Blockchain & Web3',
    description: 'Smart contracts and decentralized applications',
    icon: 'Network',
    skills: SKILLS.filter(skill => skill.category === 'blockchain'),
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Machine learning and AI-powered applications',
    icon: 'Cpu',
    skills: SKILLS.filter(skill => skill.category === 'ai'),
  },
  {
    id: 'devops',
    name: 'DevOps & Infrastructure',
    description: 'Deployment, monitoring, and system architecture',
    icon: 'Cloud',
    skills: SKILLS.filter(skill => skill.category === 'devops'),
  },
  {
    id: 'tools',
    name: 'Developer Tools',
    description: 'Productivity tools and development utilities',
    icon: 'Wrench',
    skills: SKILLS.filter(skill => skill.category === 'tools'),
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    description: 'Core programming and scripting languages',
    icon: 'Code',
    skills: SKILLS.filter(skill => skill.category === 'languages'),
  },
];

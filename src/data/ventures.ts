export interface Venture {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: 'building' | 'launching' | 'growing' | 'scaling';
  website?: string;
  github?: string;
  metrics?: {
    users?: string;
    revenue?: string;
    growth?: string;
  };
}

export const VENTURES: Venture[] = [
  {
    id: 'blockchain-infrastructure',
    title: 'Blockchain Infrastructure',
    description: 'Next-generation DeFi protocol with AI-powered automated trading strategies and yield optimization.',
    tech: ['Solidity', 'Rust', 'TypeScript', 'AI/ML', 'DeFi'],
    status: 'building',
    github: 'https://github.com/4eckd/defi-protocol',
    metrics: {
      users: '10K+',
      growth: '200% MoM',
    },
  },
  {
    id: 'ai-agents',
    title: 'AI Agent Platform',
    description: 'Autonomous AI agents for automated code review, testing, and deployment workflows.',
    tech: ['Python', 'React', 'Node.js', 'Machine Learning', 'Docker'],
    status: 'launching',
    website: 'https://aiagents.dev',
    metrics: {
      users: '500+',
      revenue: '$50K ARR',
    },
  },
  {
    id: 'dev-tools',
    title: 'Developer Tool Suite',
    description: 'Open-source developer tools for terminal productivity, Git workflows, and API development.',
    tech: ['Go', 'Rust', 'TypeScript', 'CLI'],
    status: 'growing',
    github: 'https://github.com/4eckd/dev-tools',
    metrics: {
      users: '50K+',
      growth: '150% YoY',
    },
  },
  {
    id: 'web3-education',
    title: 'Web3 Education Platform',
    description: 'Interactive learning platform for blockchain development with hands-on tutorials and gamification.',
    tech: ['Next.js', 'Web3.js', 'Smart Contracts', 'Gamification'],
    status: 'scaling',
    website: 'https://learnweb3.dev',
    metrics: {
      users: '100K+',
      revenue: '->$500K ARR',
    },
  },
];

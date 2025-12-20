export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  date: string;
  category: 'web' | 'mobile' | 'ai' | 'blockchain' | 'infrastructure' | 'tools';
  metrics?: {
    stars?: number;
    forks?: number;
    downloads?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'terminal-portfolio',
    title: 'Terminal Portfolio',
    description: 'Interactive terminal-style portfolio website with command-line interface.',
    content: 'A unique portfolio experience that simulates a terminal interface, showcasing technical skills through an immersive command-line experience. Built with Next.js, TypeScript, and custom CSS animations.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/4eckd/terminal-portfolio',
    demo: 'https://jlucus.dev',
    featured: true,
    date: '2024-12',
    category: 'web',
  },
  {
    id: 'defi-automator',
    title: 'DeFi Yield Automator',
    description: 'Automated DeFi yield farming strategy optimization system.',
    content: 'An advanced yield farming protocol that automatically optimizes trading strategies across multiple DeFi platforms using machine learning algorithms.',
    tech: ['Solidity', 'Rust', 'Python', 'TensorFlow'],
    github: 'https://github.com/4eckd/defi-automator',
    featured: true,
    date: '2024-11',
    category: 'blockchain',
    metrics: {
      stars: 234,
      forks: 89,
    },
  },
  {
    id: 'ai-code-reviewer',
    title: 'AI Code Review Bot',
    description: 'Intelligent code review assistant with automated feedback and suggestions.',
    content: 'AI-powered code review tool that provides real-time feedback, security analysis, and performance optimization for pull requests.',
    tech: ['Python', 'React', 'Node.js', 'OpenAI API', 'GitHub API'],
    github: 'https://github.com/4eckd/ai-reviewer',
    featured: false,
    date: '2024-10',
    category: 'ai',
    metrics: {
      stars: 567,
      forks: 123,
    },
  },
  {
    id: 'mobile-wallet',
    title: 'Web3 Mobile Wallet',
    description: 'Secure multi-chain cryptocurrency wallet with DeFi integration.',
    content: 'A comprehensive mobile wallet solution supporting multiple blockchain networks with built-in DeFi protocols and NFT management.',
    tech: ['React Native', 'TypeScript', 'Web3.js', 'Redux Toolkit'],
    github: 'https://github.com/4eckd/mobile-wallet',
    demo: 'https://apps.apple.com/crypto-wallet',
    featured: true,
    date: '2024-09',
    category: 'mobile',
    metrics: {
      stars: 890,
      forks: 234,
      downloads: '50K+',
    },
  },
  {
    id: 'dev-ops-suite',
    title: 'DevOps Automation Suite',
    description: 'Comprehensive CI/CD pipeline tools for automated deployment and monitoring.',
    content: 'A full-stack DevOps solution with automated testing, deployment, and monitoring capabilities for modern web applications.',
    tech: ['Go', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
    github: 'https://github.com/4eckd/devops-suite',
    featured: false,
    date: '2024-08',
    category: 'infrastructure',
    metrics: {
      stars: 445,
      forks: 178,
    },
  },
  {
    id: 'cli-tools',
    title: 'Developer CLI Tools',
    description: 'Productivity-enhancing command-line tools for developers.',
    content: 'A collection of essential CLI tools for Git workflows, API testing, and project management.',
    tech: ['Go', 'Rust', 'Cobra CLI'],
    github: 'https://github.com/4eckd/cli-tools',
    featured: false,
    date: '2024-07',
    category: 'tools',
    metrics: {
      stars: 1234,
      forks: 456,
      downloads: '100K+',
    },
  },
];

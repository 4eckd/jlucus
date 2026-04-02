export const SITE = {
  name: 'jlucus',
  title: 'jlucus - Engineer, Builder, Architect',
  description: 'Personal portfolio of jlucus - Engineer, Builder, Architect. Built with Next.js, TypeScript, and Tailwind CSS.',
  author: 'jlucus',
  url: 'https://jlucus.dev',
  github: 'https://github.com/4eckd',
  linkedin: 'https://linkedin.com/in/jlucus',
  email: 'contact@jlucus.dev',
};

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: SITE.github,
    icon: 'GitHub',
  },
  {
    name: 'LinkedIn',
    href: SITE.linkedin,
    icon: 'LinkedIn',
  },
  {
    name: 'Email',
    href: `mailto:${SITE.email}`,
    icon: 'Mail',
  },
];

export const NAVIGATION_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

export const TERMINAL_COMMANDS = [
  'whoami',
  'ls -la projects/',
  'cat skills.txt',
  'curl github.com/4eckd',
  'npm install success',
  './build_portfolio.sh',
] as const;

export const ANIMATION_DURATION = {
  fast: '0.15s',
  normal: '0.3s',
  slow: '0.5s',
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

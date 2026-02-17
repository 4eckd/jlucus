/**
 * Dashboard Data
 *
 * Data structures for project dashboard visualization
 * Includes development phases, user journeys, and performance goals
 */

export interface MilestoneItem {
  id: string;
  title: string;
  status: 'done' | 'in-progress' | 'todo';
  priority: 'critical' | 'high' | 'medium' | 'low';
  effort: string;
  impact: string;
}

export interface PhaseStatus {
  phase: number;
  name: string;
  description: string;
  completion: number;
  status: 'completed' | 'in-progress' | 'planned';
  items: MilestoneItem[];
}

export interface JourneyStep {
  name: string;
  status: 'done' | 'todo';
  component: string;
}

export interface Journey {
  id: string;
  title: string;
  steps: JourneyStep[];
}

export interface PerformanceMetric {
  name: string;
  target: number;
  current: number;
  unit: string;
  status: 'good' | 'in-progress' | 'todo';
}

export interface GoalCategory {
  category: string;
  metrics: PerformanceMetric[];
}

export const PHASES: PhaseStatus[] = [
  {
    phase: 1,
    name: 'Foundation',
    description: 'Core architecture and design system',
    completion: 100,
    status: 'completed',
    items: [
      { id: 'p1-1', title: 'Next.js 15 + TypeScript setup', status: 'done', priority: 'critical', effort: '2 days', impact: 'Foundation' },
      { id: 'p1-2', title: 'Tailwind CSS 4 + Design System', status: 'done', priority: 'critical', effort: '3 days', impact: 'Consistency' },
      { id: 'p1-3', title: 'Terminal Neon theme', status: 'done', priority: 'high', effort: '2 days', impact: 'Brand' },
      { id: 'p1-4', title: 'All sections (Hero, Ventures, Portfolio, Skills, Contact)', status: 'done', priority: 'critical', effort: '1 week', impact: 'Content' },
      { id: 'p1-5', title: 'Responsive layouts', status: 'done', priority: 'high', effort: '3 days', impact: 'Mobile UX' },
      { id: 'p1-6', title: 'Framer Motion animations', status: 'done', priority: 'medium', effort: '2 days', impact: 'Engagement' },
    ]
  },
  {
    phase: 2,
    name: 'Polish & Enhancement',
    description: 'Visual effects and interactive features',
    completion: 60,
    status: 'in-progress',
    items: [
      { id: 'p2-1', title: 'Command Palette (Cmd+K)', status: 'done', priority: 'high', effort: '4 hours', impact: 'UX' },
      { id: 'p2-2', title: 'Scanline effect overlay', status: 'done', priority: 'high', effort: '3 hours', impact: 'Aesthetic' },
      { id: 'p2-3', title: 'AnimatedGrid on all sections', status: 'done', priority: 'high', effort: '2 hours', impact: 'Consistency' },
      { id: 'p2-4', title: 'Custom Cursor with neon trail', status: 'done', priority: 'high', effort: '3 hours', impact: 'Interactive' },
      { id: 'p2-5', title: 'Sitemap.xml generation', status: 'done', priority: 'critical', effort: '1 hour', impact: 'SEO' },
      { id: 'p2-6', title: 'Smooth scroll behavior', status: 'done', priority: 'medium', effort: '30 mins', impact: 'UX' },
      { id: 'p2-7', title: 'JSON-LD structured data', status: 'todo', priority: 'high', effort: '2 hours', impact: 'SEO' },
      { id: 'p2-8', title: 'Easter eggs (Konami code)', status: 'todo', priority: 'medium', effort: '3 hours', impact: 'Engagement' },
      { id: 'p2-9', title: 'Loading screen', status: 'todo', priority: 'medium', effort: '4 hours', impact: 'Polish' },
      { id: 'p2-10', title: 'Performance optimization', status: 'in-progress', priority: 'high', effort: '1 week', impact: 'Speed' },
    ]
  },
  {
    phase: 3,
    name: 'Content & Features',
    description: 'Blog, GitHub integration, analytics',
    completion: 0,
    status: 'planned',
    items: [
      { id: 'p3-1', title: 'Blog system (MDX)', status: 'todo', priority: 'medium', effort: '1 week', impact: 'Content' },
      { id: 'p3-2', title: 'GitHub integration', status: 'todo', priority: 'high', effort: '3 days', impact: 'Live data' },
      { id: 'p3-3', title: 'Analytics dashboard', status: 'todo', priority: 'low', effort: '1 week', impact: 'Insights' },
      { id: 'p3-4', title: 'Contact form backend', status: 'todo', priority: 'high', effort: '2 days', impact: 'Functional' },
      { id: 'p3-5', title: 'Newsletter subscription', status: 'todo', priority: 'low', effort: '2 days', impact: 'Marketing' },
    ]
  },
];

export const JOURNEYS: Journey[] = [
  {
    id: 'user-discover',
    title: 'User Discovery Journey',
    steps: [
      { name: 'Land on homepage', status: 'done', component: 'Hero Terminal' },
      { name: 'See ventures showcase', status: 'done', component: 'Ventures Section' },
      { name: 'Browse portfolio projects', status: 'done', component: 'Portfolio Section' },
      { name: 'Explore skills', status: 'done', component: 'Skill Tree' },
      { name: 'Contact via form', status: 'done', component: 'Contact Section' },
    ]
  },
  {
    id: 'developer-explore',
    title: 'Developer Exploration Journey',
    steps: [
      { name: 'Open command palette (Cmd+K)', status: 'done', component: 'Command Palette' },
      { name: 'Quick navigate to sections', status: 'done', component: 'Smooth Scroll' },
      { name: 'View GitHub repos', status: 'todo', component: 'GitHub Integration' },
      { name: 'Read technical blog posts', status: 'todo', component: 'Blog System' },
      { name: 'Check source code', status: 'done', component: 'GitHub Link' },
    ]
  },
  {
    id: 'recruiter-assess',
    title: 'Recruiter Assessment Journey',
    steps: [
      { name: 'See key stats immediately', status: 'done', component: 'Hero Stats' },
      { name: 'Filter projects by category', status: 'done', component: 'Portfolio Filter' },
      { name: 'View skill levels', status: 'done', component: 'Skill Tree' },
      { name: 'Download resume/CV', status: 'todo', component: 'Resume Download' },
      { name: 'Schedule meeting', status: 'todo', component: 'Calendar Integration' },
    ]
  },
];

export const GOALS: GoalCategory[] = [
  {
    category: 'Performance',
    metrics: [
      { name: 'Lighthouse Score', target: 90, current: 85, unit: '/100', status: 'in-progress' },
      { name: 'First Contentful Paint', target: 1.5, current: 1.8, unit: 's', status: 'in-progress' },
      { name: 'Bundle Size (gzipped)', target: 200, current: 180, unit: 'KB', status: 'good' },
      { name: 'Time to Interactive', target: 3.0, current: 2.5, unit: 's', status: 'good' },
    ]
  },
  {
    category: 'SEO',
    metrics: [
      { name: 'Core Web Vitals', target: 100, current: 75, unit: '%', status: 'in-progress' },
      { name: 'Mobile-Friendly', target: 100, current: 100, unit: '%', status: 'good' },
      { name: 'Structured Data', target: 100, current: 0, unit: '%', status: 'todo' },
      { name: 'Meta Descriptions', target: 100, current: 100, unit: '%', status: 'good' },
    ]
  },
  {
    category: 'Engagement',
    metrics: [
      { name: 'Session Duration', target: 120, current: 0, unit: 's', status: 'todo' },
      { name: 'Pages per Session', target: 3, current: 0, unit: '', status: 'todo' },
      { name: 'Contact Form CVR', target: 5, current: 0, unit: '%', status: 'todo' },
      { name: 'GitHub Clicks', target: 20, current: 0, unit: '%', status: 'todo' },
    ]
  },
];

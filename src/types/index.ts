export interface Tech {
  name: string;
  icon?: string;
  level?: number;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface NavigationSection {
  id: string;
  label: string;
}

export interface TerminalCommand {
  command: string;
  output?: string;
  delay?: number;
}

export interface GitHubStats {
  stars: number;
  forks: number;
  repos: number;
  contributions: number;
  followers: number;
  following: number;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
export type ProjectCategory = 'web' | 'mobile' | 'ai' | 'blockchain' | 'infrastructure' | 'tools';
export type VentureStatus = 'building' | 'launching' | 'growing' | 'scaling';
export type AnimationType = 'fadeIn' | 'slideUp' | 'slideIn' | 'scaleIn' | 'typewriter';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface AnimationConfig {
  duration: string;
  easing: string;
  delay?: string;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends ComponentProps {
  id: string;
  title?: string;
  subtitle?: string;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

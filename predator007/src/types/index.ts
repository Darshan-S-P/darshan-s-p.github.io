export type SectionId = 
  | 'projects' 
  | 'experience' 
  | 'skills' 
  | 'about' 
  | 'education' 
  | 'contact';

export interface NavigationNode {
  id: SectionId;
  label: string;
  sublabel?: string;
  icon: string;
  color: 'cyan' | 'magenta' | 'purple' | 'green';
  topPercent: number;  // Screen Y coordinate position matching user's layout
  leftPercent: number; // Screen X coordinate position matching user's layout
  description: string;
}

export interface TerminalEntry {
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  summary: string;
  portfolio: string;
  linkedin: string;
  github: string;
}

export interface Education {
  id: string;
  school: string;
  degree: 'high' | 'associate' | 'bachelor' | 'master' | 'phd';
  major: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  achievements: string[];
  url?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credential?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  awards: Award[];
  certifications: Certification[];
  languages: Language[];
}

export type ThemeType = 'modern' | 'classic' | 'professional' | 'creative';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  layout: 'single-column' | 'two-column';
}

export interface ScoreResult {
  category: string;
  score: number;
  maxScore: number;
  feedback: string;
  suggestions: string[];
}

export interface AnalysisResult {
  overallScore: number;
  breakdown: ScoreResult[];
  jdMatch: number;
  keywords: string[];
  missingKeywords: string[];
}

export interface AIOptimization {
  original: string;
  optimized: string;
  explanation: string;
}

export interface JDInfo {
  title: string;
  company: string;
  industry: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  requirements: string[];
}
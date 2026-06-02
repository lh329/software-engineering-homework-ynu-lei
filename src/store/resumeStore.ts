import { create } from 'zustand';
import type { ResumeData, ThemeType, ThemeConfig, ScoreResult } from '../types/resume';
import { themes, defaultResumeData } from '../data/themes';
import { calculateResumeScore, calculateOverallScore, getScoreLevel } from '../lib/scoring';

interface ResumeStore {
  resumeData: ResumeData;
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  scores: ScoreResult[];
  overallScore: number;
  isAIProcessing: boolean;
  
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addEducation: () => void;
  updateEducation: (index: number, data: Partial<ResumeData['education'][0]>) => void;
  deleteEducation: (index: number) => void;
  
  addExperience: () => void;
  updateExperience: (index: number, data: Partial<ResumeData['experience'][0]>) => void;
  deleteExperience: (index: number) => void;
  
  addProject: () => void;
  updateProject: (index: number, data: Partial<ResumeData['projects'][0]>) => void;
  deleteProject: (index: number) => void;
  
  addSkill: () => void;
  updateSkill: (index: number, data: Partial<ResumeData['skills'][0]>) => void;
  deleteSkill: (index: number) => void;
  
  addAward: () => void;
  updateAward: (index: number, data: Partial<ResumeData['awards'][0]>) => void;
  deleteAward: (index: number) => void;
  
  addCertification: () => void;
  updateCertification: (index: number, data: Partial<ResumeData['certifications'][0]>) => void;
  deleteCertification: (index: number) => void;
  
  addLanguage: () => void;
  updateLanguage: (index: number, data: Partial<ResumeData['languages'][0]>) => void;
  deleteLanguage: (index: number) => void;
  
  setTheme: (theme: ThemeType) => void;
  recalculateScores: () => void;
  resetResume: () => void;
  setAIProcessing: (processing: boolean) => void;
  saveResume: () => void;
  loadResume: (data: ResumeData) => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumeData: { ...defaultResumeData },
  currentTheme: 'modern',
  themeConfig: themes['modern'],
  scores: [],
  overallScore: 0,
  isAIProcessing: false,

  updatePersonalInfo: (info) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo: { ...state.resumeData.personalInfo, ...info },
      },
    }));
    get().recalculateScores();
  },

  addEducation: () => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [
          ...state.resumeData.education,
          {
            id: Date.now().toString(),
            school: '',
            degree: 'bachelor',
            major: '',
            startDate: '',
            endDate: '',
            description: '',
          },
        ],
      },
    }));
    get().recalculateScores();
  },

  updateEducation: (index, data) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((edu, i) =>
          i === index ? { ...edu, ...data } : edu
        ),
      },
    }));
    get().recalculateScores();
  },

  deleteEducation: (index) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((_, i) => i !== index),
      },
    }));
    get().recalculateScores();
  },

  addExperience: () => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: [
          ...state.resumeData.experience,
          {
            id: Date.now().toString(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
            achievements: [],
          },
        ],
      },
    }));
    get().recalculateScores();
  },

  updateExperience: (index, data) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((exp, i) =>
          i === index ? { ...exp, ...data } : exp
        ),
      },
    }));
    get().recalculateScores();
  },

  deleteExperience: (index) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.filter((_, i) => i !== index),
      },
    }));
    get().recalculateScores();
  },

  addProject: () => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [
          ...state.resumeData.projects,
          {
            id: Date.now().toString(),
            name: '',
            role: '',
            startDate: '',
            endDate: '',
            description: '',
            technologies: [],
            achievements: [],
          },
        ],
      },
    }));
    get().recalculateScores();
  },

  updateProject: (index, data) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((proj, i) =>
          i === index ? { ...proj, ...data } : proj
        ),
      },
    }));
    get().recalculateScores();
  },

  deleteProject: (index) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((_, i) => i !== index),
      },
    }));
    get().recalculateScores();
  },

  addSkill: () => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [
          ...state.resumeData.skills,
          {
            id: Date.now().toString(),
            name: '',
            category: '技术技能',
            level: 'intermediate',
          },
        ],
      },
    }));
    get().recalculateScores();
  },

  updateSkill: (index, data) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.map((skill, i) =>
          i === index ? { ...skill, ...data } : skill
        ),
      },
    }));
    get().recalculateScores();
  },

  deleteSkill: (index) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter((_, i) => i !== index),
      },
    }));
    get().recalculateScores();
  },

  addAward: () => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        awards: [
          ...state.resumeData.awards,
          {
            id: Date.now().toString(),
            name: '',
            issuer: '',
            date: '',
            description: '',
          },
        ],
      },
    }));
    get().recalculateScores();
  },

  updateAward: (index, data) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        awards: state.resumeData.awards.map((award, i) =>
          i === index ? { ...award, ...data } : award
        ),
      },
    }));
    get().recalculateScores();
  },

  deleteAward: (index) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        awards: state.resumeData.awards.filter((_, i) => i !== index),
      },
    }));
    get().recalculateScores();
  },

  addCertification: () => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: [
          ...state.resumeData.certifications,
          {
            id: Date.now().toString(),
            name: '',
            issuer: '',
            date: '',
          },
        ],
      },
    }));
    get().recalculateScores();
  },

  updateCertification: (index, data) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: state.resumeData.certifications.map((cert, i) =>
          i === index ? { ...cert, ...data } : cert
        ),
      },
    }));
    get().recalculateScores();
  },

  deleteCertification: (index) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: state.resumeData.certifications.filter((_, i) => i !== index),
      },
    }));
    get().recalculateScores();
  },

  addLanguage: () => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        languages: [
          ...state.resumeData.languages,
          {
            id: Date.now().toString(),
            name: '',
            proficiency: 'conversational',
          },
        ],
      },
    }));
    get().recalculateScores();
  },

  updateLanguage: (index, data) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        languages: state.resumeData.languages.map((lang, i) =>
          i === index ? { ...lang, ...data } : lang
        ),
      },
    }));
    get().recalculateScores();
  },

  deleteLanguage: (index) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        languages: state.resumeData.languages.filter((_, i) => i !== index),
      },
    }));
    get().recalculateScores();
  },

  setTheme: (theme) => {
    set({
      currentTheme: theme,
      themeConfig: themes[theme],
    });
  },

  recalculateScores: () => {
    const scores = calculateResumeScore(get().resumeData);
    const overallScore = calculateOverallScore(scores);
    set({ scores, overallScore });
  },

  resetResume: () => {
    set({
      resumeData: { ...defaultResumeData },
      currentTheme: 'modern',
      themeConfig: themes['modern'],
    });
    get().recalculateScores();
  },

  setAIProcessing: (processing) => {
    set({ isAIProcessing: processing });
  },

  saveResume: () => {
    const data = JSON.stringify(get().resumeData);
    localStorage.setItem('ai-resume-data', data);
  },

  loadResume: (data) => {
    set({ resumeData: { ...data } });
    get().recalculateScores();
  },
}));

export { getScoreLevel };
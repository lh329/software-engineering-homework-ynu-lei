import type { ResumeData, ScoreResult } from '../types/resume';

export function calculateResumeScore(resume: ResumeData): ScoreResult[] {
  const results: ScoreResult[] = [];

  // 完整性评分
  let completenessScore = 0;
  let completenessMax = 100;
  let completenessSuggestions: string[] = [];

  if (resume.personalInfo.name) completenessScore += 10;
  else completenessSuggestions.push('请填写姓名');
  
  if (resume.personalInfo.title) completenessScore += 10;
  else completenessSuggestions.push('请填写职位目标');
  
  if (resume.personalInfo.email) completenessScore += 10;
  else completenessSuggestions.push('请填写邮箱');
  
  if (resume.personalInfo.phone) completenessScore += 10;
  else completenessSuggestions.push('请填写电话');
  
  if (resume.personalInfo.summary && resume.personalInfo.summary.length > 50) completenessScore += 20;
  else completenessSuggestions.push('请完善个人简介（建议50字以上）');
  
  if (resume.education.length > 0) completenessScore += 15;
  else completenessSuggestions.push('请添加教育背景');
  
  if (resume.experience.length > 0) completenessScore += 15;
  else completenessSuggestions.push('请添加工作经历');
  
  if (resume.skills.length >= 5) completenessScore += 10;
  else completenessSuggestions.push('建议至少添加5项技能');

  results.push({
    category: '完整性',
    score: Math.min(completenessScore, 100),
    maxScore: 100,
    feedback: completenessScore >= 80 ? '简历完整性优秀' : completenessScore >= 60 ? '简历较为完整' : '请完善简历内容',
    suggestions: completenessSuggestions.slice(0, 3),
  });

  // 工作经验评分
  let experienceScore = 0;
  let experienceMax = 100;
  let experienceSuggestions: string[] = [];

  const totalExpYears = resume.experience.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === '至今' ? new Date() : new Date(exp.endDate);
    return acc + (end.getFullYear() - start.getFullYear());
  }, 0);

  if (totalExpYears >= 5) experienceScore += 30;
  else if (totalExpYears >= 3) experienceScore += 20;
  else if (totalExpYears >= 1) experienceScore += 10;

  const hasAchievements = resume.experience.some(exp => exp.achievements.length > 0);
  if (hasAchievements) experienceScore += 40;
  else experienceSuggestions.push('建议为工作经历添加量化成就');

  const avgExpLength = resume.experience.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === '至今' ? new Date() : new Date(exp.endDate);
    return acc + (end.getFullYear() - start.getFullYear());
  }, 0) / Math.max(resume.experience.length, 1);
  
  if (avgExpLength >= 2) experienceScore += 30;
  else experienceSuggestions.push('建议每份工作至少持续2年以上');

  results.push({
    category: '工作经验',
    score: Math.min(experienceScore, 100),
    maxScore: 100,
    feedback: experienceScore >= 80 ? '工作经验丰富且质量高' : experienceScore >= 60 ? '工作经验良好' : '建议积累更多工作经验',
    suggestions: experienceSuggestions.slice(0, 3),
  });

  // 项目经验评分
  let projectScore = 0;
  let projectMax = 100;
  let projectSuggestions: string[] = [];

  if (resume.projects.length >= 3) projectScore += 30;
  else if (resume.projects.length >= 1) projectScore += 15;

  const projectWithTech = resume.projects.filter(p => p.technologies.length >= 3);
  if (projectWithTech.length >= 2) projectScore += 30;
  else projectSuggestions.push('建议为项目添加详细技术栈');

  const projectWithAchievements = resume.projects.filter(p => p.achievements.length > 0);
  if (projectWithAchievements.length >= 1) projectScore += 40;
  else projectSuggestions.push('建议为项目添加量化成果');

  results.push({
    category: '项目经验',
    score: Math.min(projectScore, 100),
    maxScore: 100,
    feedback: projectScore >= 80 ? '项目经验丰富' : projectScore >= 60 ? '有一定项目经验' : '建议增加项目经验',
    suggestions: projectSuggestions.slice(0, 3),
  });

  // 技能评分
  let skillScore = 0;
  let skillMax = 100;
  let skillSuggestions: string[] = [];

  const skillCategories = new Set(resume.skills.map(s => s.category));
  if (skillCategories.size >= 3) skillScore += 30;
  else skillSuggestions.push('建议覆盖多个技能类别');

  const advancedSkills = resume.skills.filter(s => s.level === 'advanced' || s.level === 'expert');
  if (advancedSkills.length >= 3) skillScore += 40;
  else skillSuggestions.push('建议深入掌握3项以上技能');

  if (resume.skills.length >= 8) skillScore += 30;
  else if (resume.skills.length >= 5) skillScore += 20;

  results.push({
    category: '技能水平',
    score: Math.min(skillScore, 100),
    maxScore: 100,
    feedback: skillScore >= 80 ? '技能全面且深入' : skillScore >= 60 ? '技能基础扎实' : '建议扩展技能广度和深度',
    suggestions: skillSuggestions.slice(0, 3),
  });

  // 教育背景评分
  let educationScore = 0;
  let educationMax = 100;
  
  const degrees = ['phd', 'master', 'bachelor', 'associate', 'high'];
  resume.education.forEach(edu => {
    const index = degrees.indexOf(edu.degree);
    if (index >= 0) educationScore += (5 - index) * 15;
  });

  const hasGPA = resume.education.some(e => e.gpa && parseFloat(e.gpa) >= 3.0);
  if (hasGPA) educationScore += 25;

  results.push({
    category: '教育背景',
    score: Math.min(educationScore, 100),
    maxScore: 100,
    feedback: educationScore >= 80 ? '教育背景优秀' : educationScore >= 60 ? '教育背景良好' : '教育背景可以进一步提升',
    suggestions: [],
  });

  return results;
}

export function calculateOverallScore(results: ScoreResult[]): number {
  const weights: Record<string, number> = {
    '完整性': 0.2,
    '工作经验': 0.25,
    '项目经验': 0.25,
    '技能水平': 0.2,
    '教育背景': 0.1,
  };

  return results.reduce((acc, result) => {
    const weight = weights[result.category] || 0.2;
    return acc + (result.score / result.maxScore) * 100 * weight;
  }, 0);
}

export function getScoreLevel(score: number): { level: string; color: string; message: string } {
  if (score >= 90) return { level: 'S', color: '#f59e0b', message: '卓越' };
  if (score >= 80) return { level: 'A', color: '#10b981', message: '优秀' };
  if (score >= 70) return { level: 'B', color: '#3b82f6', message: '良好' };
  if (score >= 60) return { level: 'C', color: '#f97316', message: '及格' };
  return { level: 'D', color: '#ef4444', message: '需改进' };
}
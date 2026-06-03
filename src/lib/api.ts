const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function optimizeResumeSection(
  content: string,
  section: string
): Promise<{ optimized: string; explanation: string }> {
  try {
    const response = await fetch(`${BASE_URL}/api/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, section }),
    });
    
    const data = await response.json();
    if (data.success) {
      return {
        optimized: data.optimized || content,
        explanation: data.explanation || '',
      };
    } else {
      return { optimized: content, explanation: data.explanation || '优化失败' };
    }
  } catch {
    return { optimized: content, explanation: '连接失败' };
  }
}

export async function analyzeJD(jdContent: string): Promise<{
  title: string;
  company: string;
  industry: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  requirements: string[];
}> {
  try {
    const response = await fetch(`${BASE_URL}/api/jd/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jd_text: jdContent }),
    });
    
    const data = await response.json();
    if (data.success) {
      const result = data.result;
      // 解析文本格式的结果
      return parseJDResult(result);
    }
  } catch {}
  
  return {
    title: '',
    company: '',
    industry: '',
    requiredSkills: [],
    preferredSkills: [],
    responsibilities: [],
    requirements: [],
  };
}

export async function matchResumeWithJD(
  resumeData: string,
  jdData: string
): Promise<{
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}> {
  try {
    const response = await fetch(`${BASE_URL}/api/jd/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resume_text: resumeData, jd_text: jdData }),
    });
    
    const data = await response.json();
    if (data.success) {
      const result = data.result;
      return parseMatchResult(result);
    }
  } catch {}
  
  return {
    matchScore: 0,
    matchedKeywords: [],
    missingKeywords: [],
    suggestions: [],
  };
}

export async function suggestCareerPath(
  experience: string,
  skills: string
): Promise<{
  currentLevel: string;
  nextLevel: string;
  recommendedSkills: string[];
  developmentPlan: string[];
}> {
  try {
    const resume_text = `工作经验：${experience}\n技能：${skills}`;
    const response = await fetch(`${BASE_URL}/api/career`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resume_text }),
    });
    
    const data = await response.json();
    if (data.success) {
      const result = data.result;
      return parseCareerResult(result);
    }
  } catch {}
  
  return {
    currentLevel: '',
    nextLevel: '',
    recommendedSkills: [],
    developmentPlan: [],
  };
}

export async function generateSummary(
  experience: string,
  skills: string
): Promise<string> {
  try {
    const resume_text = `工作经验：${experience}\n技能：${skills}`;
    const response = await fetch(`${BASE_URL}/api/summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resume_text }),
    });
    
    const data = await response.json();
    if (data.success) {
      return data.summary || '';
    }
  } catch {}
  
  return '';
}

function parseJDResult(result: string): {
  title: string;
  company: string;
  industry: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  requirements: string[];
} {
  const extractSection = (sectionName: string): string => {
    const regex = new RegExp(`【${sectionName}】[：:](.*?)(?=【|$)`, 's');
    const match = result.match(regex);
    return match ? match[1].trim() : '';
  };

  const extractList = (sectionName: string): string[] => {
    const content = extractSection(sectionName);
    return content.split(/[\n\-·*]/).map(s => s.trim()).filter(s => s);
  };

  return {
    title: extractSection('职位名称'),
    company: extractSection('公司名称') || extractSection('公司行业').split('·')[0] || '',
    industry: extractSection('公司行业') || '',
    requiredSkills: extractList('必备技能'),
    preferredSkills: extractList('加分技能'),
    responsibilities: extractList('岗位职责'),
    requirements: extractList('任职要求'),
  };
}

function parseMatchResult(result: string): {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
} {
  const extractSection = (sectionName: string): string => {
    const regex = new RegExp(`【${sectionName}】[：:](.*?)(?=【|$)`, 's');
    const match = result.match(regex);
    return match ? match[1].trim() : '';
  };

  const extractList = (sectionName: string): string[] => {
    const content = extractSection(sectionName);
    return content.split(/[\n\-·*,，]/).map(s => s.trim()).filter(s => s);
  };

  return {
    matchScore: parseInt(extractSection('匹配分数')) || 0,
    matchedKeywords: extractList('匹配关键词'),
    missingKeywords: extractList('缺失关键词'),
    suggestions: extractList('改进建议'),
  };
}

function parseCareerResult(result: string): {
  currentLevel: string;
  nextLevel: string;
  recommendedSkills: string[];
  developmentPlan: string[];
} {
  const extractSection = (sectionName: string): string => {
    const regex = new RegExp(`【${sectionName}】[：:](.*?)(?=【|$)`, 's');
    const match = result.match(regex);
    return match ? match[1].trim() : '';
  };

  const extractList = (sectionName: string): string[] => {
    const content = extractSection(sectionName);
    return content.split(/[\n\-·*,，]/).map(s => s.trim()).filter(s => s);
  };

  return {
    currentLevel: extractSection('当前水平评估'),
    nextLevel: extractSection('短期目标（1-2年）') || extractSection('中期目标（3-5年）') || '',
    recommendedSkills: extractList('推荐学习技能'),
    developmentPlan: extractList('发展路径建议'),
  };
}

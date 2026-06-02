import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.DOUBAO_API_KEY || 'ark-6ac1e945-7979-4ada-8cde-0ae1bf99e095-74b63',
  baseURL: process.env.DOUBAO_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3',
});

export async function optimizeResumeSection(
  content: string,
  section: string
): Promise<{ optimized: string; explanation: string }> {
  const prompt = `
    请优化以下简历${section}内容，使其更专业、更具吸引力：
    
    原始内容：
    ${content}
    
    要求：
    1. 使用专业术语，突出量化成果
    2. 使用主动语态和动词开头
    3. 保持原意，不添加虚假信息
    4. 适当使用行业关键词
    
    请返回：
    - 优化后的内容
    - 优化说明（简要说明优化点）
  `;

  const response = await openai.chat.completions.create({
    model: process.env.DOUBAO_MODEL || 'doubao-seed-2-0-mini-260428',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const result = response.choices[0].message.content || '';
  const parts = result.split('优化说明：');
  
  return {
    optimized: parts[0].replace('优化后的内容：', '').trim(),
    explanation: parts[1]?.trim() || '优化已完成',
  };
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
  const prompt = `
    请分析以下职位描述（JD），提取关键信息：
    
    JD内容：
    ${jdContent}
    
    请以JSON格式输出以下信息：
    {
      "title": "职位名称",
      "company": "公司名称",
      "industry": "行业",
      "requiredSkills": ["技能1", "技能2", ...],
      "preferredSkills": ["技能1", "技能2", ...],
      "responsibilities": ["职责1", "职责2", ...],
      "requirements": ["要求1", "要求2", ...]
    }
  `;

  const response = await openai.chat.completions.create({
    model: process.env.DOUBAO_MODEL || 'doubao-seed-2-0-mini-260428',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  const result = response.choices[0].message.content || '';
  try {
    return JSON.parse(result);
  } catch {
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
  const prompt = `
    请对比简历和职位描述，进行匹配分析：
    
    简历内容：
    ${resumeData}
    
    职位描述：
    ${jdData}
    
    请以JSON格式输出：
    {
      "matchScore": 0-100的匹配分数,
      "matchedKeywords": ["匹配的关键词"],
      "missingKeywords": ["缺失的关键要求"],
      "suggestions": ["改进建议"]
    }
  `;

  const response = await openai.chat.completions.create({
    model: process.env.DOUBAO_MODEL || 'doubao-seed-2-0-mini-260428',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  });

  const result = response.choices[0].message.content || '';
  try {
    return JSON.parse(result);
  } catch {
    return {
      matchScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: [],
    };
  }
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
  const prompt = `
    请根据以下工作经验和技能，提供职业发展建议：
    
    工作经验：
    ${experience}
    
    技能：
    ${skills}
    
    请以JSON格式输出：
    {
      "currentLevel": "当前职业水平描述",
      "nextLevel": "下一阶段目标",
      "recommendedSkills": ["推荐学习的技能"],
      "developmentPlan": ["具体发展建议"]
    }
  `;

  const response = await openai.chat.completions.create({
    model: process.env.DOUBAO_MODEL || 'doubao-seed-2-0-mini-260428',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const result = response.choices[0].message.content || '';
  try {
    return JSON.parse(result);
  } catch {
    return {
      currentLevel: '',
      nextLevel: '',
      recommendedSkills: [],
      developmentPlan: [],
    };
  }
}

export async function generateSummary(
  experience: string,
  skills: string
): Promise<string> {
  const prompt = `
    请根据以下工作经验和技能，撰写一段专业的个人简介：
    
    工作经验：
    ${experience}
    
    技能：
    ${skills}
    
    要求：
    1. 突出核心竞争力
    2. 不超过150字
    3. 专业但不生硬
  `;

  const response = await openai.chat.completions.create({
    model: process.env.DOUBAO_MODEL || 'doubao-seed-2-0-mini-260428',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content || '';
}
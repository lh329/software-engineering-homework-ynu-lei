'use client';

import { useState } from 'react';
import { Sparkles, FileText, Briefcase, Lightbulb, Loader2 } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AIPanel() {
  const { resumeData, updatePersonalInfo, isAIProcessing, setAIProcessing } = useResumeStore();
  const [activeTab, setActiveTab] = useState('optimize');
  const [optimizeSection, setOptimizeSection] = useState('summary');
  const [aiResult, setAiResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [jdContent, setJdContent] = useState('');
  const [jdAnalysis, setJdAnalysis] = useState<{
    title: string;
    company: string;
    requiredSkills: string[];
    matchScore: number;
  } | null>(null);
  const [careerSuggestion, setCareerSuggestion] = useState<{
    currentLevel: string;
    nextLevel: string;
    recommendedSkills: string[];
  } | null>(null);

  const handleOptimize = async () => {
    if (isAIProcessing) return;
    
    setAIProcessing(true);
    setAiResult('');
    setExplanation('');

    try {
      let content = '';
      switch (optimizeSection) {
        case 'summary':
          content = resumeData.personalInfo.summary;
          break;
        case 'experience':
          content = resumeData.experience.map(e => `${e.company} - ${e.position}: ${e.description}`).join('\n');
          break;
        case 'project':
          content = resumeData.projects.map(p => `${p.name}: ${p.description}`).join('\n');
          break;
      }

      if (!content.trim()) {
        alert('请先填写要优化的内容');
        return;
      }

      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, section: optimizeSection }),
      });

      const data = await response.json();
      if (data.success) {
        setAiResult(data.optimized);
        setExplanation(data.explanation);
        if (optimizeSection === 'summary') {
          updatePersonalInfo({ summary: data.optimized });
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('AI优化失败:', error);
      alert('AI优化失败，请检查API配置');
    } finally {
      setAIProcessing(false);
    }
  };

  const handleAnalyzeJD = async () => {
    if (!jdContent.trim()) {
      alert('请输入JD内容');
      return;
    }

    setAIProcessing(true);
    try {
      const response = await fetch('/api/jd/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jdContent, resumeData }),
      });

      const data = await response.json();
      if (data.success) {
        setJdAnalysis({
          title: data.analysis.title || '',
          company: data.analysis.company || '',
          requiredSkills: data.analysis.requiredSkills || [],
          matchScore: data.match?.matchScore || 0,
        });
      }
    } catch (error) {
      console.error('JD分析失败:', error);
      alert('JD分析失败');
    } finally {
      setAIProcessing(false);
    }
  };

  const handleCareerSuggestion = async () => {
    const experience = resumeData.experience.map(e => `${e.company} - ${e.position}`).join('\n');
    const skills = resumeData.skills.map(s => `${s.name}: ${s.level}`).join('\n');

    if (!experience && !skills) {
      alert('请先填写工作经历或技能');
      return;
    }

    setAIProcessing(true);
    try {
      const response = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experience, skills }),
      });

      const data = await response.json();
      if (data.success) {
        setCareerSuggestion({
          currentLevel: data.currentLevel || '',
          nextLevel: data.nextLevel || '',
          recommendedSkills: data.recommendedSkills || [],
        });
      }
    } catch (error) {
      console.error('职业建议失败:', error);
      alert('职业建议失败');
    } finally {
      setAIProcessing(false);
    }
  };

  const tabs = [
    { id: 'optimize', label: 'AI优化', icon: Sparkles },
    { id: 'jd', label: 'JD匹配', icon: FileText },
    { id: 'career', label: '职业规划', icon: Briefcase },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary-500" />
        <h3 className="font-semibold text-gray-800">AI助手</h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'optimize' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择优化内容</label>
            <select
              value={optimizeSection}
              onChange={(e) => setOptimizeSection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              <option value="summary">个人简介</option>
              <option value="experience">工作经历</option>
              <option value="project">项目经验</option>
            </select>
          </div>

          <button
            onClick={handleOptimize}
            disabled={isAIProcessing}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAIProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                AI优化中...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                智能优化
              </>
            )}
          </button>

          {aiResult && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">优化结果：</p>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {aiResult}
              </div>
              {explanation && (
                <div className="flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-700 mb-1">优化说明：</p>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-sm max-w-none">
                      {explanation}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'jd' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">粘贴职位描述（JD）</label>
            <textarea
              value={jdContent}
              onChange={(e) => setJdContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
              placeholder="请粘贴职位描述内容..."
            />
          </div>

          <button
            onClick={handleAnalyzeJD}
            disabled={isAIProcessing}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAIProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                分析JD并匹配
              </>
            )}
          </button>

          {jdAnalysis && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">职位：</span>
                <span className="text-sm text-gray-900 font-semibold">{jdAnalysis.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">公司：</span>
                <span className="text-sm text-gray-900">{jdAnalysis.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">匹配度：</span>
                <span className={`text-sm font-semibold ${
                  jdAnalysis.matchScore >= 80 ? 'text-green-500' :
                  jdAnalysis.matchScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {jdAnalysis.matchScore}%
                </span>
              </div>
              {jdAnalysis.requiredSkills.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-700">所需技能：</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {jdAnalysis.requiredSkills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'career' && (
        <div className="space-y-4">
          <button
            onClick={handleCareerSuggestion}
            disabled={isAIProcessing}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAIProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Briefcase className="w-4 h-4" />
                获取职业建议
              </>
            )}
          </button>

          {careerSuggestion && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="text-sm font-medium text-amber-800">当前水平</p>
                <p className="text-sm text-amber-600">{careerSuggestion.currentLevel}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">下一阶段目标</p>
                <p className="text-sm text-green-600">{careerSuggestion.nextLevel}</p>
              </div>
              {careerSuggestion.recommendedSkills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700">推荐学习技能</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {careerSuggestion.recommendedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
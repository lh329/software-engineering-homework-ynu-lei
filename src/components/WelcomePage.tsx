'use client';

import { useState } from 'react';
import { FileText, GraduationCap, Briefcase, Users, Settings, ArrowRight, Sparkles } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

interface TemplateOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: string[];
}

export default function WelcomePage({ onContinue }: { onContinue: () => void }) {
  const { loadResume } = useResumeStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: TemplateOption[] = [
    {
      id: 'study',
      title: '升学申请',
      description: '突出学术背景、研究经历和获奖情况，适合研究生申请、奖学金申请',
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['GPA成绩', '学术论文', '研究项目', '获奖证书', '推荐信'],
    },
    {
      id: 'job',
      title: '求职应聘',
      description: '突出工作经验、专业技能和项目成果，适合企业招聘、实习申请',
      icon: <Briefcase className="w-8 h-8 text-white" />,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-500',
      features: ['工作经历', '项目经验', '专业技能', '量化成就', '职业技能'],
    },
    {
      id: 'student',
      title: '学生组织',
      description: '突出组织能力、活动策划和团队协作，适合学生会、社团面试',
      icon: <Users className="w-8 h-8 text-white" />,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-pink-500',
      features: ['组织经历', '活动策划', '团队协作', '领导能力', '校园活动'],
    },
    {
      id: 'custom',
      title: '自定义',
      description: '灵活自由的模板，适合各种特殊场景和个性化需求',
      icon: <Settings className="w-8 h-8 text-white" />,
      color: 'bg-amber-500',
      gradient: 'from-amber-500 to-orange-500',
      features: ['灵活布局', '自定义模块', '多主题切换', '自由编辑', '个性设计'],
    },
  ];

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // 根据选择加载不同的默认简历数据
    const defaultResumes: Record<string, any> = {
      study: {
        personalInfo: {
          name: '张明',
          title: '研究生申请者',
          email: 'zhangming@email.com',
          phone: '138-0000-0000',
          location: '北京市',
          summary: '本科期间GPA 3.8/4.0，发表学术论文2篇，参与国家级科研项目1项。热爱学术研究，具备扎实的专业基础和良好的科研素养。',
          avatar: '',
        },
        education: [
          {
            id: '1',
            school: '北京大学',
            degree: '学士',
            major: '计算机科学与技术',
            startDate: '2020-09',
            endDate: '2024-06',
            gpa: '3.8/4.0',
            description: '主修课程：数据结构、算法设计、人工智能、机器学习',
          },
        ],
        experience: [],
        projects: [
          {
            id: '1',
            name: '基于深度学习的图像分类研究',
            role: '主要研究者',
            startDate: '2023-03',
            endDate: '2024-03',
            description: '提出了一种新的卷积神经网络架构，在CIFAR-10数据集上准确率达到96.8%',
            technologies: ['Python', 'PyTorch', '深度学习'],
          },
        ],
        skills: [
          { id: '1', name: 'Python', level: 'expert' },
          { id: '2', name: '机器学习', level: 'expert' },
          { id: '3', name: '深度学习', level: 'advanced' },
          { id: '4', name: '数据挖掘', level: 'advanced' },
        ],
        awards: [
          { id: '1', name: '国家奖学金', issuer: '教育部', date: '2023' },
          { id: '2', name: '校级优秀毕业生', issuer: '北京大学', date: '2024' },
        ],
        certifications: [],
        languages: [{ id: '1', name: '英语', proficiency: 'CET-6' }],
      },
      job: {
        personalInfo: {
          name: '李华',
          title: '前端开发工程师',
          email: 'lihua@email.com',
          phone: '139-0000-0000',
          location: '上海市',
          summary: '3年前端开发经验，精通React/Vue框架，参与过多个大型项目开发。具备良好的团队协作能力和沟通能力。',
          avatar: '',
        },
        education: [
          {
            id: '1',
            school: '复旦大学',
            degree: '学士',
            major: '软件工程',
            startDate: '2018-09',
            endDate: '2022-06',
            gpa: '',
            description: '',
          },
        ],
        experience: [
          {
            id: '1',
            company: '字节跳动',
            position: '前端开发工程师',
            startDate: '2022-07',
            endDate: '至今',
            description: '负责抖音Web端核心功能开发，优化页面加载性能提升40%',
          },
        ],
        projects: [
          {
            id: '1',
            name: '企业级后台管理系统',
            role: '技术负责人',
            startDate: '2023-01',
            endDate: '2023-06',
            description: '从零搭建后台管理系统，支持多租户和权限管理',
            technologies: ['React', 'TypeScript', 'Ant Design'],
          },
        ],
        skills: [
          { id: '1', name: 'React', level: 'expert' },
          { id: '2', name: 'Vue', level: 'expert' },
          { id: '3', name: 'TypeScript', level: 'advanced' },
          { id: '4', name: 'Node.js', level: 'intermediate' },
        ],
        awards: [],
        certifications: [],
        languages: [{ id: '1', name: '英语', proficiency: 'CET-6' }],
      },
      student: {
        personalInfo: {
          name: '王芳',
          title: '学生会主席候选人',
          email: 'wangfang@email.com',
          phone: '137-0000-0000',
          location: '广州市',
          summary: '现任校学生会外联部部长，组织过多次大型活动，具备优秀的组织协调能力和团队管理经验。',
          avatar: '',
        },
        education: [
          {
            id: '1',
            school: '中山大学',
            degree: '学士',
            major: '市场营销',
            startDate: '2022-09',
            endDate: '2026-06',
            gpa: '3.5/4.0',
            description: '',
          },
        ],
        experience: [
          {
            id: '1',
            company: '校学生会',
            position: '外联部部长',
            startDate: '2023-09',
            endDate: '至今',
            description: '负责学生会对外联络工作，成功拉取赞助50余万元，组织大型活动10余场',
          },
        ],
        projects: [
          {
            id: '1',
            name: '校园文化节',
            role: '总策划',
            startDate: '2024-03',
            endDate: '2024-04',
            description: '策划并执行校园文化节活动，参与人数超过3000人',
            technologies: ['活动策划', '团队管理', '资源协调'],
          },
        ],
        skills: [
          { id: '1', name: '活动策划', level: 'expert' },
          { id: '2', name: '团队管理', level: 'advanced' },
          { id: '3', name: '沟通谈判', level: 'expert' },
          { id: '4', name: '项目管理', level: 'advanced' },
        ],
        awards: [
          { id: '1', name: '优秀学生干部', issuer: '中山大学', date: '2023' },
        ],
        certifications: [],
        languages: [{ id: '1', name: '英语', proficiency: 'CET-4' }],
      },
      custom: {
        personalInfo: {
          name: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          summary: '',
          avatar: '',
        },
        education: [],
        experience: [],
        projects: [],
        skills: [],
        awards: [],
        certifications: [],
        languages: [],
      },
    };

    loadResume(defaultResumes[templateId] || defaultResumes.custom);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      onContinue();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">AI Resume Generator</h1>
              <p className="text-xs text-gray-500">智能简历生成器</p>
            </div>
          </div>
          {selectedTemplate && (
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              开始创建
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          AI 驱动的智能简历生成器
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          创建专业简历，开启职业新篇章
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          根据你的需求选择合适的简历模板，AI 助手将帮助你优化内容，让你的简历脱颖而出
        </p>
      </div>

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                selectedTemplate === template.id
                  ? 'border-primary-500 shadow-lg scale-105'
                  : 'border-transparent hover:border-gray-200 hover:shadow-md'
              }`}
            >
              {/* Gradient Header */}
              <div className={`h-24 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                {template.icon}
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1.5">
                  {template.features.slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selected Badge */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Continue Button (Mobile) */}
        {selectedTemplate && (
          <div className="mt-8 text-center lg:hidden">
            <button
              onClick={handleContinue}
              className="w-full max-w-xs flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              开始创建
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI智能优化</h4>
              <p className="text-sm text-gray-600">智能润色简历内容</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">多场景模板</h4>
              <p className="text-sm text-gray-600">适配不同需求</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">一键导出</h4>
              <p className="text-sm text-gray-600">支持PDF格式</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-amber-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">实时预览</h4>
              <p className="text-sm text-gray-600">所见即所得</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import EditorLayout from '@/components/Editor/EditorLayout';
import ResumePreview from '@/components/Resume/ResumePreview';
import ScorePanel from '@/components/ScorePanel';
import ThemeSelector from '@/components/ThemeSelector';
import AIPanel from '@/components/AIPanel';
import ResumeActions from '@/components/ResumeActions';
import WelcomePage from '@/components/WelcomePage';
import { FileText, Sparkles, BarChart3, Palette } from 'lucide-react';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeRightPanel, setActiveRightPanel] = useState<'preview' | 'ai' | 'score' | 'theme'>('preview');
  const [showRightPanel, setShowRightPanel] = useState(true);

  const rightPanelTabs = [
    { id: 'preview', label: '预览', icon: FileText },
    { id: 'score', label: '评分', icon: BarChart3 },
    { id: 'ai', label: 'AI助手', icon: Sparkles },
    { id: 'theme', label: '主题', icon: Palette },
  ];

  const renderRightPanel = () => {
    switch (activeRightPanel) {
      case 'preview':
        return <ResumePreview />;
      case 'score':
        return <ScorePanel />;
      case 'ai':
        return <AIPanel />;
      case 'theme':
        return <ThemeSelector />;
      default:
        return <ResumePreview />;
    }
  };

  // 显示欢迎页面
  if (showWelcome) {
    return <WelcomePage onContinue={() => setShowWelcome(false)} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">AI Resume Generator</h1>
            <p className="text-xs text-gray-500">智能简历生成器</p>
          </div>
        </div>
        <ResumeActions />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="flex-1 overflow-hidden">
          <EditorLayout />
        </div>

        {/* Right Panel Toggle (Mobile) */}
        <button
          onClick={() => setShowRightPanel(!showRightPanel)}
          className="lg:hidden fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-white border border-gray-300 rounded-l-lg px-2 py-4 shadow-md"
        >
          <span className="text-xs text-gray-600">{showRightPanel ? '←' : '→'}</span>
        </button>

        {/* Right Panel */}
        <aside
          className={`${showRightPanel ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 fixed lg:relative right-0 top-14 lg:top-auto bottom-0 w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col transition-transform duration-300 z-40`}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {rightPanelTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRightPanel(tab.id as typeof activeRightPanel)}
                className={`flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeRightPanel === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {renderRightPanel()}
          </div>
        </aside>
      </div>
    </div>
  );
}
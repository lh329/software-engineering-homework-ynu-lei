'use client';

import { useState } from 'react';
import { User, GraduationCap, Briefcase, FolderOpen, Wrench, Award, FileCheck, Globe, Menu, X } from 'lucide-react';
import PersonalInfoEditor from './PersonalInfoEditor';
import EducationEditor from './EducationEditor';
import ExperienceEditor from './ExperienceEditor';
import ProjectEditor from './ProjectEditor';
import SkillsEditor from './SkillsEditor';
import AwardsEditor from './AwardsEditor';
import CertificationsEditor from './CertificationsEditor';
import LanguagesEditor from './LanguagesEditor';

const sections = [
  { id: 'personal', label: '基本信息', icon: User },
  { id: 'education', label: '教育背景', icon: GraduationCap },
  { id: 'experience', label: '工作经历', icon: Briefcase },
  { id: 'projects', label: '项目经验', icon: FolderOpen },
  { id: 'skills', label: '技能特长', icon: Wrench },
  { id: 'awards', label: '奖项荣誉', icon: Award },
  { id: 'certifications', label: '证书认证', icon: FileCheck },
  { id: 'languages', label: '语言能力', icon: Globe },
];

export default function EditorLayout() {
  const [activeSection, setActiveSection] = useState('personal');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoEditor />;
      case 'education':
        return <EducationEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'projects':
        return <ProjectEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'awards':
        return <AwardsEditor />;
      case 'certifications':
        return <CertificationsEditor />;
      case 'languages':
        return <LanguagesEditor />;
      default:
        return <PersonalInfoEditor />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-56 bg-white border-r border-gray-200 p-4">
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="text-sm">{section.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <span className="font-semibold text-gray-800">编辑简历</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="text-sm">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
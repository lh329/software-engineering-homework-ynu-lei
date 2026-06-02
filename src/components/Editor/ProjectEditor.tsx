'use client';

import { FolderOpen, Plus, Trash2, Link } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

export default function ProjectEditor() {
  const { resumeData, addProject, updateProject, deleteProject } = useResumeStore();

  const updateTechnologies = (index: number, value: string) => {
    const technologies = value.split(',').map(t => t.trim()).filter(Boolean);
    updateProject(index, { technologies });
  };

  const addAchievement = (index: number) => {
    const achievements = [...resumeData.projects[index].achievements, ''];
    updateProject(index, { achievements });
  };

  const updateAchievement = (projIndex: number, achIndex: number, value: string) => {
    const achievements = resumeData.projects[projIndex].achievements.map((_, i) =>
      i === achIndex ? value : _
    );
    updateProject(projIndex, { achievements });
  };

  const removeAchievement = (projIndex: number, achIndex: number) => {
    const achievements = resumeData.projects[projIndex].achievements.filter((_, i) => i !== achIndex);
    updateProject(projIndex, { achievements });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-primary-500" />
          项目经验
        </h3>
        <button
          onClick={addProject}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无项目经验，点击上方按钮添加
          </div>
        ) : (
          resumeData.projects.map((project, index) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">项目 {index + 1}</span>
                <button
                  onClick={() => deleteProject(index)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目名称 *</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(index, { name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：企业级组件库"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">担任角色</label>
                  <input
                    type="text"
                    value={project.role}
                    onChange={(e) => updateProject(index, { role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：技术负责人"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始时间</label>
                  <input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(index, { startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
                  <input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => updateProject(index, { endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">项目描述</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, { description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                  placeholder="项目背景、技术难点、解决方案"
                />
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">技术栈</label>
                <div className="relative">
                  <input
                    type="text"
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateTechnologies(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="多个技术用逗号分隔，如：Vue3, TypeScript, Vite"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">项目成果</label>
                <div className="space-y-2">
                  {project.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">•</span>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        placeholder="量化成果，如：用户量增长200%"
                      />
                      <button
                        onClick={() => removeAchievement(index, achIndex)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {project.achievements.length === 0 && (
                    <button
                      onClick={() => addAchievement(index)}
                      className="text-sm text-primary-500 hover:text-primary-600"
                    >
                      + 添加成果
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">项目链接</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    value={project.url || ''}
                    onChange={(e) => updateProject(index, { url: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
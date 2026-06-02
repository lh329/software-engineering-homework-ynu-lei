'use client';

import { Briefcase, Plus, Trash2, Award } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

export default function ExperienceEditor() {
  const { resumeData, addExperience, updateExperience, deleteExperience } = useResumeStore();

  const addAchievement = (index: number) => {
    const achievements = [...resumeData.experience[index].achievements, ''];
    updateExperience(index, { achievements });
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const achievements = resumeData.experience[expIndex].achievements.map((_, i) =>
      i === achIndex ? value : _
    );
    updateExperience(expIndex, { achievements });
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const achievements = resumeData.experience[expIndex].achievements.filter((_, i) => i !== achIndex);
    updateExperience(expIndex, { achievements });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary-500" />
          工作经历
        </h3>
        <button
          onClick={addExperience}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.experience.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无工作经历，点击上方按钮添加
          </div>
        ) : (
          resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">工作经历 {index + 1}</span>
                <button
                  onClick={() => deleteExperience(index)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司 *</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, { company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：字节跳动"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(index, { position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：前端工程师"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始时间</label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, { startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, { endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">工作职责</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, { description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                  placeholder="主要职责和工作内容"
                />
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    工作成就
                  </label>
                  <button
                    onClick={() => addAchievement(index)}
                    className="text-xs text-primary-500 hover:text-primary-600"
                  >
                    + 添加成就
                  </button>
                </div>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">•</span>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        placeholder="量化的工作成果，如：优化性能提升40%"
                      />
                      <button
                        onClick={() => removeAchievement(index, achIndex)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {exp.achievements.length === 0 && (
                    <p className="text-sm text-gray-400">建议添加2-3项量化成就</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
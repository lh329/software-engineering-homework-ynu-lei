'use client';

import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

const degreeOptions = [
  { value: 'high', label: '高中' },
  { value: 'associate', label: '专科' },
  { value: 'bachelor', label: '本科' },
  { value: 'master', label: '硕士' },
  { value: 'phd', label: '博士' },
];

export default function EducationEditor() {
  const { resumeData, addEducation, updateEducation, deleteEducation } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary-500" />
          教育背景
        </h3>
        <button
          onClick={addEducation}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.education.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无教育背景，点击上方按钮添加
          </div>
        ) : (
          resumeData.education.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">教育经历 {index + 1}</span>
                <button
                  onClick={() => deleteEducation(index)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学校 *</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(index, { school: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：北京大学"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学历</label>
                  <select
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, { degree: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  >
                    {degreeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">专业</label>
                  <input
                    type="text"
                    value={edu.major}
                    onChange={(e) => updateEducation(index, { major: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：计算机科学与技术"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(index, { gpa: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：3.8/4.0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始时间</label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, { startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, { endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(index, { description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                  placeholder="主修课程、学术成果等"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
'use client';

import { Wrench, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

const levelOptions = [
  { value: 'beginner', label: '入门' },
  { value: 'intermediate', label: '熟练' },
  { value: 'advanced', label: '精通' },
  { value: 'expert', label: '专家' },
];

const categoryOptions = [
  '技术技能',
  '编程语言',
  '框架库',
  '工具软件',
  '软技能',
  '其他',
];

export default function SkillsEditor() {
  const { resumeData, addSkill, updateSkill, deleteSkill } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-primary-500" />
          技能特长
        </h3>
        <button
          onClick={addSkill}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {resumeData.skills.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">
            暂无技能，点击上方按钮添加
          </div>
        ) : (
          resumeData.skills.map((skill, index) => (
            <div key={skill.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, { name: e.target.value })}
                className="flex-1 px-2 py-1 text-sm border-none outline-none focus:ring-0"
                placeholder="技能名称"
              />
              <select
                value={skill.category}
                onChange={(e) => updateSkill(index, { category: e.target.value })}
                className="px-2 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-primary-500 outline-none"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={skill.level}
                onChange={(e) => updateSkill(index, { level: e.target.value as any })}
                className="px-2 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-primary-500 outline-none"
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => deleteSkill(index)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
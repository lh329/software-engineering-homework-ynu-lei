'use client';

import { Globe, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

const proficiencyOptions = [
  { value: 'basic', label: '基础' },
  { value: 'conversational', label: '会话' },
  { value: 'fluent', label: '流利' },
  { value: 'native', label: '母语' },
];

export default function LanguagesEditor() {
  const { resumeData, addLanguage, updateLanguage, deleteLanguage } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary-500" />
          语言能力
        </h3>
        <button
          onClick={addLanguage}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {resumeData.languages.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">
            暂无语言能力，点击上方按钮添加
          </div>
        ) : (
          resumeData.languages.map((lang, index) => (
            <div key={lang.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => updateLanguage(index, { name: e.target.value })}
                className="flex-1 px-2 py-1 text-sm border-none outline-none focus:ring-0"
                placeholder="语言名称"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => updateLanguage(index, { proficiency: e.target.value as any })}
                className="px-2 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-primary-500 outline-none"
              >
                {proficiencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => deleteLanguage(index)}
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
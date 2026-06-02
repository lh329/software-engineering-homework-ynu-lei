'use client';

import { Award, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

export default function AwardsEditor() {
  const { resumeData, addAward, updateAward, deleteAward } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary-500" />
          奖项荣誉
        </h3>
        <button
          onClick={addAward}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.awards.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无奖项，点击上方按钮添加
          </div>
        ) : (
          resumeData.awards.map((award, index) => (
            <div key={award.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">奖项 {index + 1}</span>
                <button
                  onClick={() => deleteAward(index)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">奖项名称</label>
                  <input
                    type="text"
                    value={award.name}
                    onChange={(e) => updateAward(index, { name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：优秀员工奖"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">颁发机构</label>
                  <input
                    type="text"
                    value={award.issuer}
                    onChange={(e) => updateAward(index, { issuer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：字节跳动"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">获得时间</label>
                <input
                  type="month"
                  value={award.date}
                  onChange={(e) => updateAward(index, { date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={award.description}
                  onChange={(e) => updateAward(index, { description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                  placeholder="奖项说明或获奖原因"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
'use client';

import { FileCheck, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

export default function CertificationsEditor() {
  const { resumeData, addCertification, updateCertification, deleteCertification } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary-500" />
          证书认证
        </h3>
        <button
          onClick={addCertification}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加
        </button>
      </div>

      <div className="space-y-4">
        {resumeData.certifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无证书，点击上方按钮添加
          </div>
        ) : (
          resumeData.certifications.map((cert, index) => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">证书 {index + 1}</span>
                <button
                  onClick={() => deleteCertification(index)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">证书名称</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(index, { name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：AWS Solutions Architect"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">颁发机构</label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(index, { issuer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：Amazon Web Services"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">获得时间</label>
                  <input
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(index, { date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">证书编号</label>
                  <input
                    type="text"
                    value={cert.credential || ''}
                    onChange={(e) => updateCertification(index, { credential: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="如：SAA-C03"
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
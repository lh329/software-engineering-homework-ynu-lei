'use client';

import { Palette } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { themes } from '@/data/themes';

export default function ThemeSelector() {
  const { currentTheme, setTheme } = useResumeStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-primary-500" />
        <h3 className="font-semibold text-gray-800">主题选择</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.values(themes).map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`relative p-3 rounded-lg border-2 transition-all ${
              currentTheme === theme.id
                ? 'border-primary-500 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.accentColor }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">{theme.name}</span>
            </div>
            <p className="text-xs text-gray-500">
              {theme.layout === 'single-column' ? '单栏' : '双栏'}布局
            </p>
            {currentTheme === theme.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
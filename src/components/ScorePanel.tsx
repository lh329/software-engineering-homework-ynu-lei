'use client';

import { BarChart3, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useResumeStore, getScoreLevel } from '@/store/resumeStore';

export default function ScorePanel() {
  const { scores, overallScore } = useResumeStore();
  const scoreLevel = getScoreLevel(overallScore);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-primary-500" />
        <h3 className="font-semibold text-gray-800">简历评分</h3>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full text-white text-3xl font-bold"
          style={{ backgroundColor: scoreLevel.color }}
        >
          {overallScore.toFixed(1)}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-lg font-semibold" style={{ color: scoreLevel.color }}>
            {scoreLevel.level}级
          </span>
          <span className="text-sm text-gray-500">· {scoreLevel.message}</span>
        </div>
      </div>

      {/* Category Scores */}
      <div className="space-y-4">
        {scores.map((result) => {
          const percentage = (result.score / result.maxScore) * 100;
          const isGood = percentage >= 70;

          return (
            <div key={result.category}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{result.category}</span>
                <span className="text-sm font-semibold" style={{ color: isGood ? '#10b981' : '#f59e0b' }}>
                  {result.score.toFixed(0)} / {result.maxScore}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: isGood ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444',
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{result.feedback}</p>
              {result.suggestions.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center gap-1 text-xs text-gray-600">
                      <AlertCircle className="w-3 h-3 text-yellow-500" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-700">提升建议</span>
        </div>
        <ul className="space-y-1">
          {overallScore < 60 && (
            <li className="text-xs text-blue-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              建议完善基本信息和工作经历
            </li>
          )}
          {(scores.find(s => s.category === '工作经验')?.score ?? 0) < 70 && (
            <li className="text-xs text-blue-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              为工作经历添加量化成就可以显著提升评分
            </li>
          )}
          {(scores.find(s => s.category === '项目经验')?.score ?? 0) < 70 && (
            <li className="text-xs text-blue-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              添加详细的项目描述和技术栈
            </li>
          )}
          {overallScore >= 80 && (
            <li className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              简历质量优秀！可以尝试AI优化进一步提升
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
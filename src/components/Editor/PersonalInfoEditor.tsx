'use client';

import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Upload, X } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { useState } from 'react';

export default function PersonalInfoEditor() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;
  const [showAvatar, setShowAvatar] = useState(true);

  const handleChange = (field: keyof typeof personalInfo, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updatePersonalInfo({ avatar: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    updatePersonalInfo({ avatar: '' });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <User className="w-5 h-5 text-primary-500" />
        基本信息
      </h3>

      {/* 头像上传 */}
      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={showAvatar}
              onChange={(e) => {
                setShowAvatar(e.target.checked);
                if (!e.target.checked) {
                  updatePersonalInfo({ avatar: '' });
                }
              }}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">显示头像</span>
          </label>
          
          {showAvatar && (
            <div className="space-y-2">
              {personalInfo.avatar ? (
                <div className="relative inline-block">
                  <img
                    src={personalInfo.avatar}
                    alt="头像"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  <button
                    onClick={removeAvatar}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">上传</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
          <input
            type="text"
            value={personalInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            placeholder="请输入姓名"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">职位目标 *</label>
          <input
            type="text"
            value={personalInfo.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            placeholder="如：高级前端工程师"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              placeholder="example@email.com"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              placeholder="138-0000-0000"
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">所在地</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            placeholder="如：北京市朝阳区"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">个人网站</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              value={personalInfo.portfolio}
              onChange={(e) => handleChange('portfolio', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              value={personalInfo.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              placeholder="https://linkedin.com/..."
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              value={personalInfo.github}
              onChange={(e) => handleChange('github', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
          placeholder="简要介绍自己的核心优势和职业目标（建议50-150字）"
        />
      </div>
    </div>
  );
}
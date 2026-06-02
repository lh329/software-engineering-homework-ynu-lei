'use client';

import { useState } from 'react';
import { Download, Save, Upload, Eye, EyeOff, Printer } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ResumeActions() {
  const { resumeData, saveResume, loadResume, resetResume } = useResumeStore();
  const [showPreview, setShowPreview] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const resumeElement = document.querySelector('.resume-preview') as HTMLElement | null;
      if (!resumeElement) {
        alert('未找到简历预览元素');
        return;
      }

      const cloneElement = resumeElement.cloneNode(true) as HTMLElement;
      cloneElement.style.cssText = `
        position: fixed;
        top: -10000px;
        left: -10000px;
        width: 210mm !important;
        max-width: none !important;
        transform: none !important;
        z-index: 9999;
        box-shadow: none;
        margin: 0;
      `;
      document.body.appendChild(cloneElement);

      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(cloneElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: cloneElement.scrollWidth,
        height: cloneElement.scrollHeight,
      });

      document.body.removeChild(cloneElement);

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width / 2;
      const imgHeight = canvas.height / 2;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      const imgX = (pdfWidth - finalWidth) / 2;
      const imgY = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imgData, 'PNG', imgX, imgY, finalWidth, finalHeight);
      pdf.save(`${resumeData.personalInfo.name || 'resume'}_${Date.now()}.pdf`);
    } catch (error) {
      console.error('导出PDF失败:', error);
      alert('导出PDF失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo.name || 'resume'}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          loadResume(data);
          alert('导入成功！');
        } catch (error) {
          alert('导入失败，请确保文件格式正确');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleSave = () => {
    saveResume();
    alert('简历已保存到本地！');
  };

  const handleReset = () => {
    if (confirm('确定要重置简历吗？所有数据将丢失！')) {
      resetResume();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {showPreview ? '隐藏预览' : '显示预览'}
      </button>

      <button
        onClick={handleSave}
        className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Save className="w-4 h-4" />
        保存
      </button>

      <button
        onClick={handleImportJSON}
        className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Upload className="w-4 h-4" />
        导入
      </button>

      <button
        onClick={handleExportJSON}
        className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Download className="w-4 h-4" />
        导出JSON
      </button>

      <button
        onClick={handleExportPDF}
        disabled={isExporting}
        className="flex items-center gap-1 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        <Printer className="w-4 h-4" />
        {isExporting ? '生成中...' : '导出PDF'}
      </button>

      <button
        onClick={handleReset}
        className="flex items-center gap-1 px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
      >
        重置
      </button>
    </div>
  );
}
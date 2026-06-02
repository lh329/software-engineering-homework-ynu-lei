import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Resume Generator - 智能简历生成器',
  description: '使用AI驱动的智能简历生成器，创建专业、优化的简历',
  keywords: '简历生成器, AI简历, 简历优化, 职业规划, JD匹配',
  authors: [{ name: 'AI Resume Generator Team' }],
  viewport: 'width=device-width, initial-scale=1.0',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
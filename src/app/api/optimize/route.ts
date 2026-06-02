import { NextResponse } from 'next/server';
import { optimizeResumeSection, generateSummary } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, section } = body;

    if (!content || !section) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    const result = await optimizeResumeSection(content, section);
    
    return NextResponse.json({
      success: true,
      optimized: result.optimized,
      explanation: result.explanation,
    });
  } catch (error) {
    console.error('AI优化失败:', error);
    return NextResponse.json(
      { error: 'AI优化失败，请稍后重试', success: false },
      { status: 500 }
    );
  }
}
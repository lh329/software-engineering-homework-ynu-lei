import { NextResponse } from 'next/server';
import { generateSummary } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { experience, skills } = body;

    if (!experience || !skills) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    const summary = await generateSummary(experience, skills);
    
    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error('生成简介失败:', error);
    return NextResponse.json(
      { error: '生成简介失败，请稍后重试', success: false },
      { status: 500 }
    );
  }
}
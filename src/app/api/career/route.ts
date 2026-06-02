import { NextResponse } from 'next/server';
import { suggestCareerPath } from '@/lib/openai';

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

    const result = await suggestCareerPath(experience, skills);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('职业建议失败:', error);
    return NextResponse.json(
      { error: '职业建议失败，请稍后重试', success: false },
      { status: 500 }
    );
  }
}
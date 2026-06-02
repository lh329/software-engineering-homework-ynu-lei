import { NextResponse } from 'next/server';
import { analyzeJD, matchResumeWithJD } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jdContent, resumeData } = body;

    if (!jdContent) {
      return NextResponse.json(
        { error: '缺少JD内容' },
        { status: 400 }
      );
    }

    const analysis = await analyzeJD(jdContent);
    
    let matchResult = null;
    if (resumeData) {
      matchResult = await matchResumeWithJD(JSON.stringify(resumeData), jdContent);
    }
    
    return NextResponse.json({
      success: true,
      analysis,
      match: matchResult,
    });
  } catch (error) {
    console.error('JD分析失败:', error);
    return NextResponse.json(
      { error: 'JD分析失败，请稍后重试', success: false },
      { status: 500 }
    );
  }
}
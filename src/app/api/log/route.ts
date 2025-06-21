import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import logger from '@/utils/logger';

/**
 * 로그 기록 API 핸들러
 *
 * @description
 * - 미들웨어로부터 받은 로그 데이터를 Winston을 사용해 파일에 기록합니다.
 * @param {NextRequest} request - Next.js 요청 객체
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 로그 데이터를 파싱합니다.
    const logData = await request.json();
    const { level, message, meta } = logData;

    // Winston 로거를 사용하여 로그를 기록합니다.
    logger.log(level, message, { meta });

    // 성공 응답을 반환합니다.
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    // 에러 발생 시 콘솔에 에러를 기록하고, 500 상태 코드로 응답합니다.
    console.error('Error logging request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

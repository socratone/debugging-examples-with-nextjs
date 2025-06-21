import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 미들웨어 함수
 *
 * @description
 * - 모든 수신 요청을 가로채 로깅 API로 관련 정보를 전송합니다.
 * - 로깅 작업이 응답을 지연시키지 않도록 비동기적으로 처리됩니다.
 * @param {NextRequest} request - Next.js 요청 객체
 */
export function middleware(request: NextRequest) {
  const { method, url } = request;
  const headers: { [key: string]: string } = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // 로깅 API로 보낼 데이터
  const logData = {
    level: 'info',
    message: `Request: ${method} ${url}`,
    meta: {
      method,
      url,
      headers,
    },
  };

  // 로깅 API 엔드포인트 URL
  const logApiUrl = new URL('/api/log', request.url).toString();

  fetch(logApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  }).catch(console.error);

  // 다음 미들웨어 또는 페이지로 요청을 전달합니다.
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

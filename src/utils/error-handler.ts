import logger from '../lib/logger';
import fs from 'fs';
import path from 'path';
import { JSX } from 'react';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 서버 사이드 에러를 Winston으로 로깅하는 유틸리티 함수들
 */

/**
 * logs 디렉토리가 없으면 생성
 */
function ensureLogDirectory() {
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

/**
 * 에러를 Winston logger로 기록하고 다시 throw하는 함수
 * @param error - 기록할 에러 객체
 * @param context - 추가 컨텍스트 정보
 */
export function logAndThrowError(error: Error, context?: Record<string, any>) {
  ensureLogDirectory();

  logger.error('Server-side error occurred', {
    message: error.message,
    stack: error.stack,
    name: error.name,
    timestamp: new Date().toISOString(),
    ...context,
  });

  throw error;
}

/**
 * 비동기 함수를 래핑하여 에러 발생 시 자동으로 로깅하는 함수
 * @param fn - 래핑할 비동기 함수
 * @param context - 추가 컨텍스트 정보
 */
export function withErrorLogging<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: Record<string, any>
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      ensureLogDirectory();

      logger.error('Async function error', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
        functionName: fn.name,
        ...context,
      });

      throw error;
    }
  }) as T;
}

/**
 * 단순히 에러만 로깅하고 throw하지 않는 함수
 * @param error - 기록할 에러 객체
 * @param context - 추가 컨텍스트 정보
 */
export function logError(error: Error, context?: Record<string, any>) {
  ensureLogDirectory();

  logger.error('Error logged', {
    message: error.message,
    stack: error.stack,
    name: error.name,
    timestamp: new Date().toISOString(),
    ...context,
  });
}

/**
 * 서버 컴포넌트를 래핑하여 에러 발생 시 자동으로 로깅하는 함수
 * @param component - 래핑할 서버 컴포넌트 함수
 * @param componentName - 컴포넌트 이름 (로깅용)
 * @param context - 추가 컨텍스트 정보
 */
export function withServerComponentErrorLogging<
  T extends (...args: any[]) => Promise<JSX.Element>
>(component: T, componentName: string, context?: Record<string, any>): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await component(...args);
    } catch (error) {
      ensureLogDirectory();

      logger.error('Server component error', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
        componentName,
        ...context,
      });

      // 에러 페이지를 보여주기 위해 다시 throw
      throw error;
    }
  }) as T;
}

/**
 * API 라우트를 래핑하여 에러 발생 시 자동으로 로깅하고 적절한 에러 응답을 반환하는 함수
 * @param handler - 래핑할 API 라우트 핸들러 함수
 * @param routeName - 라우트 이름 (로깅용)
 * @param context - 추가 컨텍스트 정보
 */
export function withApiRouteErrorLogging<
  T extends (request: NextRequest, ...args: any[]) => Promise<NextResponse>
>(handler: T, routeName: string, context?: Record<string, any>): T {
  return (async (request: NextRequest, ...args: Parameters<T>) => {
    try {
      return await handler(request, ...args);
    } catch (error) {
      ensureLogDirectory();

      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      logger.error('API route error', {
        message: errorMessage,
        stack: errorStack,
        timestamp: new Date().toISOString(),
        routeName,
        method: request.method,
        url: request.url,
        userAgent: request.headers.get('user-agent'),
        ...context,
      });

      // 클라이언트에게 적절한 에러 응답 반환
      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: process.env.NODE_ENV === 'development' ? errorMessage : 'Something went wrong',
        },
        { status: 500 }
      );
    }
  }) as T;
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스명을 조건부로 결합하는 유틸리티 함수
 * clsx로 클래스명을 결합하고 tailwind-merge로 중복된 Tailwind 클래스를 병합합니다.
 * 
 * @param inputs - 결합할 클래스명들 (문자열, 객체, 배열 등)
 * @returns 결합된 클래스명 문자열
 * 
 * @example
 * // 기본 사용법
 * cn('px-4 py-2', 'bg-blue-500')
 * // 결과: 'px-4 py-2 bg-blue-500'
 * 
 * @example
 * // 조건부 클래스 적용
 * cn('px-4 py-2', { 'bg-blue-500': isPrimary, 'bg-gray-500': !isPrimary })
 * 
 * @example
 * // 중복 클래스 병합
 * cn('px-4 py-2', 'px-8')
 * // 결과: 'py-2 px-8' (px-8이 px-4를 덮어씀)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

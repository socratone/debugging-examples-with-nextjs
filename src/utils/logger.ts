import { createLogger, format, transports, Logger } from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize, json } = format;

// 로그 포맷을 정의합니다.
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// 개발 환경에서 HMR(Hot Module Replacement) 시 로거가 중복 생성되는 것을 방지하기 위해
// 전역(global) 객체에 로거 인스턴스를 캐싱합니다.
declare global {
  // eslint-disable-next-line no-var
  var logger: Logger | undefined;
}

// 로그 파일을 저장할 디렉토리 경로를 설정합니다.
const logDir = path.join(process.cwd(), 'logs');

const loggerInstance =
  global.logger ||
  createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      // 프로덕션 환경에서는 JSON 포맷을, 그 외 환경에서는 색상이 포함된 포맷을 사용합니다.
      process.env.NODE_ENV === 'production'
        ? json()
        : combine(colorize(), logFormat)
    ),
    transports: [
      // 모든 로그를 콘솔로 출력합니다.
      new transports.Console(),

      // 'error' 레벨 이상의 로그를 'error.log' 파일에 기록합니다.
      new transports.File({
        level: 'error',
        filename: path.join(logDir, 'error.log'),
      }),
      // 모든 레벨의 로그를 'combined.log' 파일에 기록합니다.
      new transports.File({
        filename: path.join(logDir, 'combined.log'),
      }),
    ],
  });

// 개발 환경에서는 생성된 로거를 전역 객체에 할당합니다.
if (process.env.NODE_ENV !== 'production') {
  global.logger = loggerInstance;
}

export default loggerInstance;

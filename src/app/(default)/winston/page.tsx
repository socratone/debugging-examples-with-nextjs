import { withServerComponentErrorLogging } from '@/utils/error-handler';

// 원본 페이지 컴포넌트 (에러 로깅 래퍼 적용 전)
const PageComponent = async () => {
  // 에러 핸들러를 사용하여 Winston으로 로깅하고 에러 throw
  throw new Error('hello');

  return (
    <div>
      <p>build시에 .log 파일이 생성되고</p>
      <p>페이지 접속시 로그가 기록된다.</p>
    </div>
  );
};

// 에러 로깅 래퍼로 감싼 페이지 컴포넌트
const Page = withServerComponentErrorLogging(PageComponent, 'WinstonPage', {
  route: '/winston',
  description: 'Winston 로깅 테스트 페이지',
});

export default Page;

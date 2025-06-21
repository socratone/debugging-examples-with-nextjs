'use client';

import PrimaryButton from '@/components/atom/PrimaryButton';
import SecondaryButton from '@/components/atom/SecondaryButton';
import { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    // window 객체가 존재하고, eruda가 아직 초기화되지 않았을 때만 실행
    if (typeof window !== 'undefined' && !document.getElementById('eruda')) {
      import('eruda').then((erudaModule) => {
        erudaModule.default.init();
      });
    }
  }, []);

  return (
    <>
      <p>모바일에서 브라우저 콘솔을 확인할 수 있다.</p>
      <div>
        <PrimaryButton onClick={() => console.log('clicked!')}>
          콘솔 로그
        </PrimaryButton>
      </div>
      <div>
        <SecondaryButton
          onClick={() => fetch('https://jsonplaceholder.typicode.com/posts')}
        >
          네트워크 요청
        </SecondaryButton>
      </div>
    </>
  );
};

export default Page;

'use client';

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
    <div className="p-8 flex flex-col items-center justify-center gap-2">
      <p>모바일에서 브라우저 콘솔을 확인할 수 있다.</p>
      <div>
        <button
          onClick={() => console.log('clicked!')}
          className="px-4 py-2 border bg-blue-400 font-bold text-white rounded cursor-pointer "
        >
          콘솔 로그
        </button>
      </div>
      <div>
        <button
          onClick={() => fetch('https://jsonplaceholder.typicode.com/posts')}
          className="px-4 py-2 border bg-purple-400 font-bold text-white rounded cursor-pointer "
        >
          네트워크 요청
        </button>
      </div>
    </div>
  );
};

export default Page;

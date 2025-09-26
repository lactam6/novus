// app/auth/signin/page.tsx (修正案)

import { CardDemo } from "@/components/login/page";
import Image from "next/image";
import { Suspense } from 'react'; // 💡 Suspense をインポート

// ロード中に表示するコンポーネントを定義（簡潔なHTML要素でOK）
const LoadingFallback = () => (
  <div className="h-full w-full justify-items-center items-center grid">
    <p>Loading login form...</p>
  </div>
);

export default function Home() {
  return (
    <div className="grid grid-rows-[150_500] md:grid-rows-none md:grid-cols-2 h-screen w-screen">
      {/* 画面左側のUI (ロゴなど) */}
      <div className="h-full w-full bg-red-900 justify-items-center items-center grid">
        <Image src="/nobackicon.svg" alt="novus logo" width={256} height={60} priority />
      </div>

      {/* 💡 問題の CardDemo を Suspense でラップ */}
      <Suspense fallback={<LoadingFallback />}>
        <div className="h-full w-full justify-items-center items-center grid">
          {/* useSearchParams() の実行がクライアントサイドまで遅延される */}
          <CardDemo authtype="Sign Up" /> 
        </div>
      </Suspense>
    </div>
  );
}
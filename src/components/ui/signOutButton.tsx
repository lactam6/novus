// components/SignOutButton.tsx

'use client';

import { useFormStatus } from 'react-dom'; // 💡 フォームの状態を取得するフック
import { Button } from "@/components/ui/button";

// Note: このコンポーネントは form action を持つ <form> の子である必要があります
export function SignOutButton() {
  // 💡 フォームの送信状態を取得
  const { pending } = useFormStatus(); 

  return (
    <Button 
      variant="outline" 
      className="w-full hover:cursor-pointer" 
      type="submit" 
      // 💡 送信中はボタンを無効化
      disabled={pending} 
    >
      {/* 💡 送信中はテキストを切り替え */}
      {pending ? 'サインアウト処理中...' : 'Sign Out'}
    </Button>
  );
}
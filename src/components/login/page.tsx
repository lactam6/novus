"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { FormEvent } from 'react'; // フォームイベントの型
import { signIn } from "next-auth/react"; 
import { useSearchParams } from 'next/navigation'; // Next.jsからインポート
export default function CardDemo() {
  const searchParams = useSearchParams();
  // 💡 URLから callbackUrl を取得し、なければ '/user/home' をデフォルトに
  const callbackUrl = searchParams.get('callbackUrl') || '/user/home'; 

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault(); 
    
    // 💡 取得した callbackUrl を signIn 関数に渡す
    signIn("google", { callbackUrl: callbackUrl }); 
    // ※ next-auth/react の signIn は 'redirectTo' ではなく 'callbackUrl' をオプションとして受け付けます
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="justify-items-center">
        <CardTitle>Login to your account</CardTitle>
        </div>
        <CardDescription>
          Use Google Authentication to access to your account
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="justify-items-center">
        <Image
                                        className=""
                                        src="/N.svg"
                                        alt="novus logo"
                                        width={200}
                                        height={200}
                                        priority
                                      />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <form className="w-full" onSubmit={handleSignIn}>
          <Button type="submit" variant="outline" className="w-full" >Signin, or Login with Google</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

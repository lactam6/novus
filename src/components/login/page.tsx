"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card" // ⚠️ CardAction は削除
import Image from "next/image";
import { FormEvent } from 'react';
import { signIn } from "next-auth/react"; 
import { useSearchParams } from 'next/navigation';

interface CardDemoProps {
  authtype: string; 
}

// propsを分割代入
export function CardDemo({ authtype }: CardDemoProps) { 
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/user/home'; 

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault(); 
    signIn("google", { callbackUrl }); // callbackUrl: callbackUrl の省略形
  };
  
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        {/* CardTitle を中央寄せ */}
        <div className="text-center"> 
          <CardTitle>{authtype} your account</CardTitle>
        </div>
        <CardDescription className="text-center">
          Use Google Authentication to access to your account
        </CardDescription>
        {/* ⚠️ CardAction は削除 */}
      </CardHeader>
      <CardContent>
        {/* Image を flex で中央寄せ */}
        <div className="flex justify-center">
          <Image
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
          <Button type="submit" variant="outline" className="w-full" >
            {authtype} with Google
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
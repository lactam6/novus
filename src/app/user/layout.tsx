// app/user/layout.tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    // 現在アクセスしているパスを取得
    const pathname = "/user" // Fallback（SSRでは usePathname 使えないので別処理）
    // Next.js App Router では request.url が取得できる
    // 例: middleware を使うか、下記のように headers() から取得

    const { headers } = await import("next/headers")
    const currentUrl = headers().get("x-url") || pathname

    // ログインページにリダイレクトし、callbackUrl に現在のURLを渡す
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(currentUrl)}`)
  }

  return <>{children}</>
}

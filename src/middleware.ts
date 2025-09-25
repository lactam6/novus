import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

export async function middleware(req: NextRequest) {
  const session = await auth()
  const { pathname } = req.nextUrl

  // 1. 公開ページ（例外）
  if (
    pathname === "/" ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/error") ||
    pathname.startsWith("/api/auth") // OAuth 用
  ) {
    return NextResponse.next()
  }

  // 2. /app直下のページは全て禁止
  if (pathname.split("/").length === 2) {
    return NextResponse.redirect(new URL("/error", req.url))
  }

  // 3. /user/** はサインイン必須
  if (pathname.startsWith("/user")) {
    if (!session) {
      const loginUrl = new URL("/auth/login", req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // 4. /api/** の認可
  if (pathname.startsWith("/api")) {
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.next()
  }

  // 5. マスター専用ページ
  if (pathname.startsWith("/master")) {
    if (!session || session.user?.role !== "master") {
      return NextResponse.redirect(new URL("/error", req.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

// matcher: 全ページ監視（Next.jsの静的ファイルは除外）
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

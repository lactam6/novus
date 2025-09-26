import { auth } from "@/auth"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth()
  const { pathname } = req.nextUrl

  // 1. 公開ページ（例外）
  if (
    pathname === "/" ||
    pathname.startsWith("/error") ||
    pathname.startsWith("/api/auth")){
      return NextResponse.next()
    }
    // /auth/signin, /auth/signupでサインインされている場合はhomeに移動
  if ( pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup")) {
    if (session) return NextResponse.redirect(new URL("/user/home", req.url));
    else return NextResponse.next();
  }

  // 2. /app直下のページは全て禁止
  if (pathname.split("/").length === 2) {
    return NextResponse.redirect(new URL("/error", req.url))
  }

  // 3. /user/** はサインイン必須
  if (pathname.startsWith("/user")) {
    if (!session) {
      const loginUrl = new URL("/auth/signin", req.url)
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

  // 5. admin専用ページ
  if (pathname.startsWith("/admin")) {
    if (!session || session.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/error", req.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

// matcher: 全ページ監視（Next.jsの静的ファイルは除外）

export const config = {
  matcher: [
    // すべてのリクエストを対象にするけど
    // _next, favicon.ico, 画像拡張子などは除外したい
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|ico|txt|json)).*)",
  ],
}
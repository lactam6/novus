import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
    // DBアダプターは含めない

    // セッション戦略はJWTを指定（ミドルウェアがDBに問い合わせなくて済むように）
    session: { strategy: "jwt" }, 

    // 必要なプロバイダーのみを記述
    providers: [
        Google
    ],

    // ミドルウェアで使用する authorized コールバックを含む
    callbacks: {
        authorized: async ({ auth }) => {
             return !!auth;
        },
        // JWTやSessionコールバックは、ここに定義するか、auth.tsに定義しても良い
        // ミドルウェアは authorized の結果のみを使用するため、一旦これで十分
    },
    
    // その他共通設定
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig; 

export default authConfig;
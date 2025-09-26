// auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
// データベースアダプターを使用している場合は、ここでインポート
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "./prisma" // あなたのPrismaクライアント

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma), // アダプターの使用例
  providers: [Google],
  callbacks: {
    // 1. サインイン時、userからidとroleをtokenにコピー
    jwt({token, user}){
      if(user){
        // userはサインイン時などに存在。データベースから取得した
        // 拡張された型（user.id, user.role）が含まれている想定
        token.id = String(user.id)
        // user.roleがnullまたはundefinedの場合に備えてオプショナルアクセス(?)や
        // デフォルト値を設定するなどの配慮も検討してもよいでしょう。
        if (user.role) {
            token.role = user.role
        }
      }
      return token
    },
    // 2. tokenからidとroleをsessionにコピー
    session({session, token}){
      // トークンからセッションのuserオブジェクトに情報を移動
      session.user.id = String(token.id)
      session.user.role = token.role // token.roleはJWTコールバックで設定されている
      return session
    },
    authorized: async ({ auth }) => {
      // ログイン済みユーザーは認証済み、そうでなければログインページへリダイレクト
      return !!auth
    },
  },
})
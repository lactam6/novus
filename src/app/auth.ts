// app/auth.ts (修正)

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/app/auth.config"; // 👈 軽量設定をインポート

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig, // 👈 軽量設定を適用
    adapter: PrismaAdapter(prisma), // 👈 DBアダプターを追加
    // 他のコールバック（jwt, session）もここで上書き・追加できる
    callbacks: {
    // 1. サインイン時、userからidとroleをtokenにコピー
    jwt({token, user, account, profile}){
      if(user){
        // userはサインイン時などに存在。データベースから取得した
        // 拡張された型（user.id, user.role）が含まれている想定
        token.userId = user.id;
        // user.roleがnullまたはundefinedの場合に備えてオプショナルアクセス(?)や
        // デフォルト値を設定するなどの配慮も検討してもよいでしょう。
        token.role = user.role; 
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
  }
});
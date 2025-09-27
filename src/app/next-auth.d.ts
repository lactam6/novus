// next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// 1. next-authのUser型を拡張
declare module "next-auth" {
  interface User extends DefaultUser {
    // データベースから取得したユーザーデータにあるroleを追加
    role?: "admin" | "user"; // 例: ロールに応じて型を定義
    id: string; // User型には元々idがありますが、念のため明示
  }

  // 3. next-authのSession型を拡張
  interface Session extends DefaultSession {
    user: {
      id: string; // セッションのuserオブジェクトにidを追加
      role?: "admin" | "user"; // セッションのuserオブジェクトにroleを追加
    } & DefaultSession["user"]; // 既存のDefaultSessionのuserプロパティを保持
  }
}

// 2. next-auth/jwtのJWT型を拡張
declare module "next-auth/jwt" {
  interface JWT {
    id: string; // JWTトークンにidを追加
    role?: string; // JWTトークンにroleを追加
  }
}
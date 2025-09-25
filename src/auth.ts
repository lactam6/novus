import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import type {Provider} from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials"

export const { auth } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // ← role をセッションに含める
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role as string
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
  },
})

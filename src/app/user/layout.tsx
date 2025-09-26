import { auth } from "@/app/auth"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>

  return (
    <div>
      {children}
    </div>
  )
}
export const metadata: Metadata = {
  title: "Novus",
  description: "Home",
  icons: {
    icon: '/icon.png', 
    shortcut: '/icon.png',
    apple: '/icon.png',
  }
};
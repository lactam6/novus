import { auth } from "@/auth"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>

  return (
    <div>
      {children}
    </div>
  )
}
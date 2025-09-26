import { auth } from "@/app/auth"
import  Image  from "next/image"
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
      <Image
                                              className=""
                                              src={session.user.image || "/N.svg"}
                                              alt="user avatar"
                                              width={200}
                                              height={200}
                                              priority
                                            />
    </div>
  )
}
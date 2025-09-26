import { auth } from "@/app/auth"
import Image from "next/image"
export default async function UserAvatar() {
  const session = await auth()
  if(!session || !session.user || !session.user.image) return <div>Not authenticated</div>;
  else{
    const userImage = session.user.image;
    const altText = "User Avatar";
    return (
      <div>
        {/* 💡 null または undefined のチェックを行ったため、エラーが解消する */}
        <Image
                                                      className=""
                                                      src={userImage || "/N.svg"}
                                                      alt={altText}
                                                      width={200}
                                                      height={200}
                                                      priority
                                                    />
      </div>
    );
  }
}
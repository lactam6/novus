import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";

import { signIn, signOut } from "@/auth"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="justify-items-center">
        <CardTitle>Login to your account</CardTitle>
        </div>
        <CardDescription>
          Use Google Authentication to access to your account
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="justify-items-center">
        <Image
                                        className=""
                                        src="/N.svg"
                                        alt="novus logo"
                                        width={200}
                                        height={200}
                                        priority
                                      />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <form className="w-full"
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/" })
          }}
        >
          <Button type="submit" variant="outline" className="w-full" >Signin, or Login with Google</Button>
        </form>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <Button variant="outline" className="w-full" type="submit">Sign Out</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

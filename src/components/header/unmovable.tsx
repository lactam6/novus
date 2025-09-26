'use client'
import Image from "next/image";
import Link from 'next/link'
import {FaKey} from "react-icons/fa6"
import {Button} from "@/components/ui/button"
export function UnmovableHeader() {
  return (
    <div className="h-20 w-screen grid grid-cols-[200px_1fr_200px] bg-gradient-to-b from-red-950 to-red-900 items-center justify-items-center">
        <div>
                      <Image
                                className=""
                                src="/nobackicon.svg"
                                alt="novus logo"
                                width={160}
                                height={30}
                                priority
                              />
        </div>
        <div className="col-start-3">
            <Link href="/auth/signin">
                <Button variant="outline" className=" bg-neutral-100 hover:cursor-pointer" ><FaKey /> Sign in</Button>
            </Link>
        </div>
    </div>
  )
}

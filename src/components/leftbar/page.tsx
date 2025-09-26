'use client'
import Image from "next/image";
import Link from 'next/link'
import {FaSearch, FaHome, FaBell} from "react-icons/fa"
import {FaGear} from "react-icons/fa6"
import {Button} from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useState } from 'react';
import { SignOutButton } from '@/components/ui/signOutButton'; 

export function LeftBar() {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen(prev => {
      const newState = !prev;
      console.log(newState);
      return newState;
    });
  }
  return (
    <div>
      <div className="flex md:hidden w-screen h-20 fixed bg-red-900 items-center justify-items-center z-20">
        <div className='h-16 w-screen relative grid grid-cols-[200px_1fr_100px] items-center justify-items-center'>
          <Image
                    className=""
                    src="/nobackicon.svg"
                    alt="novus logo"
                    width={128}
                    height={30}
                    priority
                  />
          <div className="col-start-3 w-12 grid grid-rows-3 gap-2" onClick={handleToggle}>
            <div className="w-8 h-0.5 bg-neutral-50 block"></div>
            <div className="w-8 h-0.5 bg-neutral-50 block"></div>
            <div className="w-8 h-0.5 bg-neutral-50 block"></div>
          </div>
        </div>
      </div>
      <div
  className={`
    transition-all duration-300 transform flex md:hidden h-screen w-screen bg-neutral-400 fixed z-10
    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  ` } onClick={handleToggle}
>
  <div
    className={`
      transition-all duration-300 transform w-screen bg-neutral-50 rounded-t-3xl fixed z-20 
      ${isOpen ? 'bottom-0 h-3/5' : '-bottom-full h-5/8'}
    `}
  >
          <form
            action={async () => {
              await signOut()
            }}
          ><SignOutButton /> 
          </form>
  </div>
</div>
      <div className="hidden md:block w-52 h-screen fixed bg-red-900 items-center justify-items-center">
        <div className='h-160 w-32 grid grid-rows-8 items-center'>
          <Image
                    className=""
                    src="/nobackicon.svg"
                    alt="novus logo"
                    width={128}
                    height={30}
                    priority
                  />
          <Link href="/" className=' text-neutral-50 flex gap-2 items-center'><FaHome/>Home</Link>
          <Link href="/" className=' text-neutral-50 flex gap-2 items-center'><FaSearch/> Search</Link>
          <Link href="/" className=' text-neutral-50 flex gap-2 items-center'><FaBell/>Notifs</Link>
          <Link href="/" className=' text-neutral-50 flex gap-2 items-center'><FaGear/>Settings</Link>
          <form
            action={async () => {
              await signOut()
            }}
          >
            <SignOutButton />
          </form>
        </div>
      </div>
    </div>
  );
}

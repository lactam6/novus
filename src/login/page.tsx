import CardDemo from "@/components/login/page";
import Image from "next/image";
export default function Home() {
  return (
    <div className="grid grid-rows-[150_500] md:grid-rows-none md:grid-cols-2 h-screen w-screen">
        <div className="h-full w-full bg-red-900 justify-items-center items-center grid">
            <Image
                                className=""
                                src="/nobackicon.svg"
                                alt="novus logo"
                                width={256}
                                height={60}
                                priority
                              />
        </div>
        <div className="h-full w-full justify-items-center items-center grid">
            <CardDemo />
        </div>
    </div>
  );
}

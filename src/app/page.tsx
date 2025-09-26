import { UnmovableHeader } from '@/components/header/unmovable';
import {Button} from "@/components/ui/button"
import "./patterns.css"
export const dynamic = 'force-dynamic';
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <UnmovableHeader />
      <div className="pattern1 h-150 bg-red-900 shadow-md ">
        <div className="h-100 w-full mx-auto px-4 sm:px-6 lg:px-8 py-24  p-0 space-y-8">
          <div className="flex justify-center">
            <a className="group inline-flex items-center bg-white/10 hover:bg-white/10 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-hidden focus:bg-white/10" href="/error">
              <p className="me-2 text-white text-sm">
                See what you can do with Novus
              </p>
              <span className="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="block font-medium text-neutral-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Something new, something fun
            </h1>
          </div>

          <div className="max-w-3xl text-center mx-auto">
            <p className="text-lg text-neutral-50">currency, notes and... explosion!</p>
          </div>
          <div className="text-center">
            <Button className="shadow-md  text-neutral-100"> Sign up for free </Button>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-red-900 to-red-500 h-100">
      </div>
    </div>
  );
}

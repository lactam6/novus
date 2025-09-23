import Link from 'next/link'
import {FaSearch, FaHome, FaBell} from "react-icons/fa"
import {FaGear} from "react-icons/fa6"
export function LeftBar() {
  return (
    <div className="w-52 h-screen bg-gray-50 items-center justify-items-center">
      <div className='h-96 w-32 grid grid-rows-5 items-center'>
        <Link href="/" className='row-start-2 flex gap-2 items-center'><FaHome/>Home</Link>
        <Link href="/" className='row-start-3 flex gap-2 items-center'><FaSearch/> Search</Link>
        <Link href="/" className='row-start-4 flex gap-2 items-center'><FaBell/>Notifs</Link>
        <Link href="/" className='row-start-5 flex gap-2 items-center'><FaGear/>Settings</Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { IoBagAddOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

export default function Navbar() {
    return (
        <nav className="flex justify-between px-20 py-3 items-center bg-white">
            {/* <h1 className="text-xl text-red-600 font-bold">LEVIS</h1> */}
            <img
                src="https://levi.co.id/cdn/shop/files/levis-logo-new-colour.svg?v=1701845829&width=160"
                alt="Logo"
                className="w-20 h-10"
            />
            <div className="flex items-center">
                <ul className="flex items-center space-x-6">
                    <Link href="/" className="font-semibold text-gray-700">
                        Home
                    </Link>
                    <Link href="" className="font-semibold text-gray-700">
                        Pria
                    </Link>
                    <Link href="" className="font-semibold text-gray-700">
                        Wanita
                    </Link>
                    <Link href="" className="font-semibold text-gray-700">
                        Aksesoris
                    </Link>
                    <li>
                        <IoBagAddOutline />
                    </li>
                    <Link href="/wishlist">
                        <CiHeart />
                    </Link>
                </ul>
            </div>
        </nav>
    );
}

"use client";
import Link from "next/link";
import { IoBagAddOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function NavbarAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = cookies().get("Authorization");
        if (loggedIn) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        cookies().delete("Authorization");
        setIsLoggedIn(false);
        Swal.fire("Logged Out", "", "success");
    };

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
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="font-semibold text-gray-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="font-semibold text-gray-700"
                        >
                            Login
                        </Link>
                    )}
                </ul>
            </div>
        </nav>
    );
}

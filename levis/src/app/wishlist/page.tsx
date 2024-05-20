"use client";
import CardWish from "@/components/CardWish";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavbarAuth from "@/components/NavbarAuth";
import { Wishlist } from "@/models/types";
import { useEffect, useState } from "react";

export default function WishlistsPage() {
    const [wishlist, setWishlist] = useState<Wishlist[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist`,
                {
                    method: "GET",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch wishlist items");
            }

            const data = await response.json();

            setWishlist(data);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {/* navbar */}
            <Navbar />

            {/* list item */}
            <main className="my-8 py-16">
                <div className="container mx-auto px-6">
                    <h3 className="text-gray-700 text-2xl font-medium flex justify-center">
                        WISHLIST PRODUCTS
                    </h3>

                    {wishlist.length === 0 ? (
                        <p className=" mt-24 text-2xl font-sans flex justify-center text-black">
                            Your Wishlist is Still Empty..
                        </p>
                    ) : (
                        <div>
                            {wishlist.map((item, key) => (
                                <CardWish
                                    key={key}
                                    product={item.productDetails}
                                    id={item._id.toString()}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* footer */}
            <Footer />
        </>
    );
}

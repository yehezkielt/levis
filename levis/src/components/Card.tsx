"use client";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { Product } from "@/models/types";
import { useState } from "react";
import Link from "next/link";

export default function Card({ product }: { product: Product }) {
    const [addedToWishlist, setAddedToWishlist] = useState(false);

    const handleAddToWishlist = async () => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productId: product._id }),
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
            }
            if (!response.ok) {
                throw new Error("Failed to add item to wishlist");
            }

            const result = await response.json();
            Swal.fire({
                icon: "success",
                text: result.message,
            });
            setAddedToWishlist(true);
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                    error.message ||
                    "An error occurred while adding item to wishlist",
            });
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden flex flex-col">
            <Link href={`/products/${product.slug}`}>
                <div
                    className="flex items-start justify-end h-56 w-full bg-cover"
                    style={{
                        backgroundImage: `url(${product.thumbnail})`,
                    }}
                >
                    <button onClick={handleAddToWishlist}>
                        {addedToWishlist ? (
                            <FaHeart className="text-red-500 text-xl mx-3 my-5" />
                        ) : (
                            <FaRegHeart className="text-black text-xl mx-3 my-5" />
                        )}
                    </button>
                </div>
                <div className="px-5 py-3  flex-1 flex flex-col justify-between">
                    <h3 className="text-gray-700 uppercase">{product.name}</h3>
                    <span className="text-gray-500 mt-2 mb-2">
                        Rp.{product.price}
                    </span>
                </div>
            </Link>
        </div>
    );
}

"use cient";
import { Product } from "@/models/types";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CardWish({
    product,
    id,
}: {
    product: Product;
    id: string;
}) {
    const [isDeleted, setIsDeleted] = useState(false);
    const handleDeleteWishlist = async () => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist`,
                {
                    method: "DELETE",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ _id: id }),
                }
            );
            console.log(response, "<<<>>>> RES");

            if (!response.ok) {
                throw new Error("Failed to delete item from wishlist");
            }

            Swal.fire({
                icon: "success",
                text: "Item removed from wishlist",
            });
            setIsDeleted(true);
        } catch (error) {
            console.error("Error deleting item from wishlist:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while deleting item from wishlist",
            });
        }
    };

    if (isDeleted) {
        return null;
    }

    return (
        <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden flex flex-col">
                    <Link href={`/products/${product.slug}`}>
                        <div
                            className="flex items-start justify-end h-56 w-full bg-cover"
                            style={{
                                backgroundImage: `url(${product.thumbnail})`,
                            }}
                        ></div>
                    </Link>
                    <div className="px-5 py-3  flex-1 flex flex-col justify-between">
                        <h3 className="text-gray-700 uppercase">
                            {product.name}
                        </h3>
                        <span className="text-gray-500 mt-2 mb-2">
                            Rp.{product.price}
                        </span>
                    </div>
                    <div className="px-5 py-3 gap-2 flex-1 flex flex-row justify-between">
                        <button className="btn btn-success w-1/2">Buy</button>
                        <button
                            className="btn btn-error w-1/2"
                            onClick={handleDeleteWishlist}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

import { Product } from "@/models/types";
import Link from "next/link";

export default function CardHome({ product }: { product: Product }) {
    return (
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden flex flex-col">
            {/* <Link href={`/products/${product.slug}`}> */}
            <div
                className="flex items-start justify-end h-56 w-full bg-cover"
                style={{
                    backgroundImage: `url(${product.thumbnail})`,
                }}
            ></div>
            {/* </Link> */}
            <div className="px-5 py-3  flex-1 flex flex-col justify-between">
                <h3 className="text-gray-700 uppercase">{product.name}</h3>
                <span className="text-gray-500 mt-2 mb-2">
                    Rp.{product.price}
                </span>
            </div>
        </div>
    );
}

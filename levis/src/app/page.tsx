import { Product } from "../models/types";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import DetailInfo from "@/components/DetailInfo";
import Link from "next/link";
import CardHome from "@/components/CardHome";
// export const dynamic = "force-dynamic";

export default async function Home() {
    async function getData(): Promise<Product[] | undefined> {
        try {
            // process.env.NEXT_PUBLIC_BASE_URL;
            const data = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + "/api/home",
                {
                    cache: "no-store",
                }
            );
            const coba = await data.json();
            return coba.data;
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(await getData());
    const products = await getData();

    return (
        <>
            {/* navbar */}
            <Navbar />

            {/* banner */}
            <Banner />

            {/* detail info */}
            <DetailInfo />

            {/* produk fav */}

            <main className="my-8 py-16">
                <div className="container mx-auto px-6">
                    <h3 className="text-gray-700 text-2xl font-medium flex justify-center">
                        FAVOURITE NEWEST PRODUCTS
                    </h3>
                    <Link
                        href="/products"
                        className="relative flex justify-end w-full max-w mt-5"
                    >
                        See All Products
                    </Link>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                        {products?.map((product, index) => {
                            return <CardHome product={product} key={index} />;
                        })}
                    </div>
                </div>
            </main>

            {/* footer */}
            <Footer />
        </>
    );
}

"use client";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { Product } from "../../models/types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NavbarAuth from "@/components/NavbarAuth";
import Navbar from "@/components/Navbar";
// export const dynamic = "force-dynamic";

interface ArrayOfProduct {
    data: Product[];
}

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState<string>("");
    const [searchProduct, setSearchProduct] = useState<Product[]>([]);
    let query = search.replaceAll(" ", "%20");

    console.log(products, "iiiiiiiiiiiiii");

    async function searchData(query: string) {
        try {
            console.log("masuk search dataaaa");

            let data = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                    `/api/products/search?search=` +
                    query,
                {
                    method: "get",
                    cache: "no-store",
                }
            );

            setSearchProduct(((await data.json()) as ArrayOfProduct).data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async (pageNumber: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                    `/api/products?page=${pageNumber}&search=${search}`,
                {
                    cache: "no-store",
                }
            );
            const newData = await response.json();

            console.log(newData.data, "INI RES NEW DATA <<<>>>>");

            if (!response.ok) throw new Error();

            setProducts(products.concat(newData.data));
            setHasMore(newData.data.length > 0);
            setLoading(false);
        } catch (error: any) {
            console.log(error, "<< ERR DI PRODUCTS");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle infinite scroll
    function handleScroll() {
        if (
            !loading &&
            hasMore &&
            window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100
        ) {
            setLoading(true);
            setPage(page + 1);
        }
    }
    useEffect(() => {
        fetchData(page);
    }, [page]);

    useEffect(() => {
        if (search) {
            searchData(search);
        } else {
            setSearchProduct(products);
        }
    }, [search, products]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    console.log(products, "<<< INI PRODUCTSS");

    return (
        <>
            {/* navbar */}
            <Navbar />

            {/* search */}
            <>
                <div className="relative flex justify-end  h-10 w-full max-w mt-5">
                    <>
                        <form>
                            <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] mr-10">
                                <button
                                    className="!absolute right-1 top-1 z-10 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                                    type="button"
                                    data-ripple-light="true"
                                >
                                    Search
                                </button>
                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    type="text"
                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Name...
                                </label>
                            </div>
                        </form>
                    </>
                </div>
            </>

            {/* list product */}
            <main className="my-8 py-16">
                <div className="container mx-auto px-6">
                    <h3 className="text-gray-700 text-2xl font-medium flex justify-center">
                        LIST PRODUCTS
                    </h3>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                        {search
                            ? searchProduct.map((product, index) => (
                                  <Card key={index} product={product} />
                              ))
                            : products.map((product, index) => (
                                  <Card key={index} product={product} />
                              ))}
                    </div>
                </div>
            </main>

            <div className="flex justify-end m-10">
                Infinite scroll for more item...
            </div>

            {/* footer */}
            <Footer />
        </>
    );
}

import Link from "next/link";

export default function Banner() {
    return (
        <>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img
                        src="https://levi.co.id/cdn/shop/files/Levis_PC_Desktop_2000x750-CTA.gif?v=1714725544"
                        className="w-full"
                    />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img
                        src="https://levi.co.id/cdn/shop/files/H124-SEA-Western-HP-Banner-Desktop-2000x750.webp?v=1713498063"
                        className="w-full"
                    />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img
                        src="https://levi.co.id/cdn/shop/files/Levis_LIL_TFIY_Primary_Desktop_2000x750_1.jpg?v=1711077059"
                        className="w-full"
                    />
                </div>
            </div>
            <div className="flex justify-center w-full py-1 gap-4">
                <Link href="#item1">
                    <button className="btn btn-active p-1 min-h-0 h-1 btn btn-xs "></button>
                </Link>
                <Link href="#item2">
                    <button className="btn btn-active p-1 min-h-0 h-1 btn btn-xs "></button>
                </Link>
                <Link href="#item3">
                    <button className="btn btn-active p-1 min-h-0 h-1 btn btn-xs "></button>
                </Link>
            </div>
        </>
    );
}

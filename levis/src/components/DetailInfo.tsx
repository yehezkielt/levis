export default function DetailInfo() {
    return (
        <div className="py-16 bg-gray">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="https://cdn.shopify.com/s/files/1/0850/3246/8789/files/00_Header_ID_1936_COWBOYS_TYPE_I_JACKETS_DARK.jpg"
                            alt="image"
                            loading="lazy"
                            width=""
                            height=""
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-red-900 font-bold md:text-4xl">
                            LEVI’S® VINTAGE CLOTHING
                        </h2>
                        <p className="mt-6 text-gray-600">
                            Kami telah menyempurnakan bentuk, bahan dan fitur
                            dari Levi’s® 501® Jeans dan Trucker Jacket selama
                            lebih dari 100 tahun. Reproduksi jahitan demi
                            jahitan kami membantu menceritakan kisah Amerika.
                        </p>
                        <p className="mt-4 text-gray-600">
                            {" "}
                            Tersedia online dan hanya di toko Levi’s® Grand
                            Indonesia.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

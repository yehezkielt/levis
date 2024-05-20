import ProductModel from "@/models/products";

export async function GET(request: Request) {
    try {
        const products = await ProductModel.getFeaturedProducts();

        return Response.json(
            {
                data: products,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
    }
}

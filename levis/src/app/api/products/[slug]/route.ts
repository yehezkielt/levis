import ProductModel from "@/models/products";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const products = await ProductModel.getProductBySlug(params.slug);

    return Response.json(
        {
            data: products,
        },
        {
            status: 200,
        }
    );
}

import ProductModel from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    let data;
    try {
        const pageQueryParam = request.nextUrl.searchParams.get("page");
        const page = pageQueryParam ? parseInt(pageQueryParam) : 1;

        data = await ProductModel.findAndSortAll(page);

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}

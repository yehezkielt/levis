import WishlistModel from "@/models/wishlist";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const userId = request.headers.get("x-user-id");
        const body = await request.json();

        if (!userId) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        const { productId } = body;
        const wishlistItem = await WishlistModel.createWishlist(
            userId,
            productId
        );

        return NextResponse.json(
            {
                message: "Wishlist added",
            },
            {
                status: 201,
            }
        );
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

export async function GET(request: Request) {
    try {
        const userId = request.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        const getWishlist = await WishlistModel.showWishlist(userId);

        return new Response(JSON.stringify(getWishlist), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
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

export async function DELETE(request: Request) {
    try {
        const userId = request.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        const body = await request.json();
        const { _id } = body;
        await WishlistModel.deleteWishlist(_id);

        return NextResponse.json(
            {
                message: "Wishlist deleted",
            },
            {
                status: 200,
            }
        );
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

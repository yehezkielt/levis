import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { readPayloadJose } from "./app/helpers/jwt";

export async function middleware(request: NextRequest) {
    console.log("masu wishist");
    if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
        let cookie = cookies().get("Authorization")?.value;

        if (!cookie) {
            return NextResponse.json(
                {
                    message: "Invalid Login",
                },
                {
                    status: 401,
                }
            );
        }

        const [type, token] = cookie.split(" ");

        if (type !== "Bearer") {
            return NextResponse.json(
                {
                    message: "Invalid Token",
                },
                {
                    status: 401,
                }
            );
        }

        console.log(token, " ini decoded dddddd");
        const decoded = await readPayloadJose<{
            _id: string;
            email: string;
        }>(token);

        console.log(decoded, " ini decoded dddddd");

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", decoded._id);
        requestHeaders.set("x-user-email", decoded.email);

        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

        return response;
    }

    if (request.nextUrl.pathname.startsWith("/wishlist")) {
        const cookie = cookies().get("Authorization")?.value;

        if (!cookie) {
            request.nextUrl.pathname = "/login";
            return NextResponse.redirect(request.nextUrl);
        }
    }

    if (request.nextUrl.pathname.startsWith("/login")) {
        const cookie = cookies().get("Authorization")?.value;

        if (cookie) {
            request.nextUrl.pathname = "/";
            return NextResponse.redirect(request.nextUrl);
        }
    }
}

export const config = {
    matcher: ["/api/wishlist", "/wishlist", "/login"],
};

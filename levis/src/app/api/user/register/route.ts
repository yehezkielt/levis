import UserModel, { UserValidation } from "@/models/user";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const parsedData = UserValidation.safeParse(body);

        if (parsedData.success === false) {
            throw parsedData.error;
        }

        const newUser = await UserModel.createUser(body);

        return Response.json(
            {
                data: newUser,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return Response.json(
                { message: error.issues[0].message },
                { status: 400 }
            );
        } else if (error instanceof Error) {
            return Response.json({ message: error.message }, { status: 400 });
        }
        return Response.json(
            { error: error, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

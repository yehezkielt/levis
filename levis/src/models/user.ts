import { database } from "@/app/config/mongodb";
import { hashPassword } from "@/app/helpers/bcrypt";
import { User } from "@/models/types";
import { z } from "zod";

export const UserValidation = z.object({
    username: z.string({
        required_error: "Username is required",
    }),
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Format Email is required",
        }),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(5, {
            message: "Password must be over 5 characters",
        }),
});

export default class UserModel {
    static userCollection() {
        return database.collection<User>("User");
    }

    static async findUserByUsername(username: string) {
        const user = await this.userCollection().findOne({ username });
        return user;
    }

    static async findUserByEmail(email: string) {
        const user = await this.userCollection().findOne({ email });
        return user;
    }

    static async createUser(userData: User): Promise<User> {
        try {
            const collection = this.userCollection();

            const checkUsername = await this.findUserByEmail(userData.username);
            if (checkUsername) throw new Error("Username already exist");

            const checkEmail = await this.findUserByEmail(userData.email);
            if (checkEmail) throw new Error("Email already exist");

            userData.password = hashPassword(userData.password);
            const result = await collection.insertOne(userData);

            return {
                ...userData,
                _id: result.insertedId,
            };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

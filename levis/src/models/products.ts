import { database } from "@/app/config/mongodb";
import { Product } from "@/models/types";
import { z } from "zod";

export const productValidation = z.object({
    name: z.string({
        required_error: "Name is required",
    }),

    slug: z.string({
        required_error: "slug is required",
    }),
});

export default class ProductModel {
    static productCollection() {
        return database.collection<Product>("Products");
    }

    static async getAllProducts() {
        const data = await this.productCollection().find().toArray();
        return data;
    }

    static async getProductBySlug(slug: string) {
        const data = await this.productCollection().findOne({ slug });
        return data;
    }

    static async findAndSortAll(
        page: number,
        pageSize: number = 8
    ): Promise<Product[]> {
        try {
            const skipValue = (page - 1) * pageSize;

            const result = await this.productCollection()
                .find()
                .skip(skipValue)
                .limit(pageSize)
                .toArray();

            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getFeaturedProducts() {
        const data = await this.getAllProducts();
        const featured = data.slice(0, 4);
        return featured;
    }
}

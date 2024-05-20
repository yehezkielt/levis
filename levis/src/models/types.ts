import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    name: string;
    username: string; // validation: required, unique
    email: string; // validation: required, unique, email format
    password: string; // validation: required, length min 5
}

export interface Product {
    _id: ObjectId;
    name: string; // validation: required
    slug: string; // validation: required, unique
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Wishlist {
    _id: ObjectId;
    userId: ObjectId; // validation: required
    productId: ObjectId; // validation: required
    productDetails: Product;
    createdAt: Date;
    updatedAt: Date;
}

export interface Payload {
    _id: string;
    email: string;
    iat: string;
}

import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

const secret = "rahasia";
// process.env.JWT_SECRET as string;

export const signToken = (payload: JwtPayload) => {
    return jwt.sign(payload, secret);
};

export const readPayload = (token: string) => jwt.verify(token, secret);

export const readPayloadJose = async <T>(token: string) => {
    const secretJose = new TextEncoder().encode(secret);
    const result = await jose.jwtVerify<T>(token, secretJose);
    return result.payload;
};

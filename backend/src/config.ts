import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment");
}
if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in environment");
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGODB_URL = process.env.MONGODB_URL;
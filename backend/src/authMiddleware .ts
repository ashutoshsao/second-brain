import { type NextFunction, type Request, type Response, } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Access denied!"
        });
    }
    const token = authHeaders?.split(' ')[1];
    try {
        const decoded = jwt.verify(token as string, JWT_SECRET);

        req.userId = (decoded as JwtPayload).userId;

        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            message: "Access denied!"
        });
    }
}
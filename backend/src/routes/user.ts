import { Router } from "express";
import jwt from "jsonwebtoken";
import { signinZodSchema, signupZodSchema } from "../types.js";
import { User } from "../db.js";
import { JWT_SECRET } from "../config.js";
const userRouter = Router()

userRouter.post("/signup", async (req, res) => {
    try {
        const body = req.body;
        const { success } = signupZodSchema.safeParse(body);
        if (!success) {
            return res.status(411).json({
                message: "Error in inputs"
            })
        }
        const existingUser = await User.findOne({ username: body.username });
        if (existingUser) {
            return res.status(403).json({
                message: "User already exists with this username"
            })
        }
        const password_hash = await User.createHash(body.password);

        const user = await User.create({
            username: body.username,
            password_hash: password_hash
        });

        res.status(200).json({
            message: "Signed up "
        })

    }
    catch (e) {
        res.status(500).json({
            message: "Server error"
        })
        console.log(e)
    }
})

userRouter.post("/signin", async (req, res) => {

    try {
        const body = req.body;
        const { success } = signinZodSchema.safeParse(body);
        if (!success) {
            return res.status(411).json({
                message: "Error in inputs"
            })
        }

        const existingUser = await User.findOne({ username: body.username });
        if (!existingUser) {
            return res.status(403).json({
                message: "Wrong email password"
            })
        }

        const validPassword = await existingUser.validatePassword(body.password);

        if (!validPassword) {
            return res.status(403).json({
                message: "Wrong email password"
            })
        }

        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_SECRET)

        res.status(200).json({
            message: "User signed in successfully",
            token: token
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

userRouter.post("/content", (req, res) => {

})

userRouter.get("/content", (req, res) => {

})

userRouter.delete("/content", (req, res) => {

})

userRouter.post("/brain/share", (req, res) => {

})

userRouter.get("/brain/:shareLink", (req, res) => {

})
export { userRouter }
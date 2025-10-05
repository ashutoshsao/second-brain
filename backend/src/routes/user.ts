import { Router } from "express";
import jwt from "jsonwebtoken";
import { contentZodSchema, signinZodSchema, signupZodSchema } from "../types.js";
import { Content, Tag, User } from "../db.js";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../authMiddleware .js";
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

userRouter.post("/content", authMiddleware, async (req, res) => {
    try {
        const content = req.body;
        const userId = req.userId
        const { success } = contentZodSchema.safeParse(content);
        if (!success) {
            return res.status(411).json({
                message: "Error in inputs"
            })
        }

        const tagDocs = await Promise.all(
            content.tags.map(async (tagTitle: string) => {
                let tag = await Tag.findOne({ title: tagTitle })
                if (!tag) {
                    tag = await Tag.create({ title: tagTitle })
                }
                return tag._id
            })
        )
        const data = await Content.create({
            link: content.link,
            type: content.type,
            title: content.title,
            tags: tagDocs,
            userId: userId
        })

        return res.status(200).json({
            mesage: "Content uploaded!"
        })
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({
            message: "Error in inputs"
        })
    }
})

userRouter.get("/content", authMiddleware, async (req, res) => {
    try {
        const content = await Content.find({ userId: req.userId })
            .populate("tags", "title")     // array of refs
            .populate("userId", "username") // single ref

        return res.status(200).json({
            content
        })
    }
    catch (e) {
        console.log(e)
        return res.status(403).json({
            message: "Error in inputs"
        })
    }
})

userRouter.delete("/content", authMiddleware, async (req, res) => {
    const contentId = req.body.contentId
    const userId = req.userId
    await Content.deleteMany({
        contentId: contentId,
        userId: userId
    })

    res.status(200).json({
        message: "Deleted!"
    })
})

userRouter.post("/brain/share", (req, res) => {

})

userRouter.get("/brain/:shareLink", (req, res) => {

})
export { userRouter }
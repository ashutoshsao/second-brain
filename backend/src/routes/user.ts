import { Router } from "express";
import jwt from "jsonwebtoken";
import { contentZodSchema, signinZodSchema, signupZodSchema } from "../types.js";
import { ContentModel, LinkModel, TagModel, UserModel } from "../db.js";
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
        const existingUser = await UserModel.findOne({ username: body.username });
        if (existingUser) {
            return res.status(403).json({
                message: "User already exists with this username"
            })
        }
        const password_hash = await UserModel.createHash(body.password);

        const user = await UserModel.create({
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

        const existingUser = await UserModel.findOne({ username: body.username });
        if (!existingUser) {
            return res.status(403).json({
                message: "Wrong username password"
            })
        }

        const validPassword = await existingUser.validatePassword(body.password);

        if (!validPassword) {
            return res.status(403).json({
                message: "Wrong username password"
            })
        }

        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_SECRET)

        res.status(200).json({
            message: "UserModel signed in successfully",
            token: `Bearer ${token}`
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
        console.log(content)
        const { success } = contentZodSchema.safeParse(content);
        if (!success) {
            return res.status(411).json({
                message: "Error in inputs"
            })
        }

        const tagDocs = await Promise.all(
            (content.tags ?? []).map(async (tagTitle: string) => {
                let tag = await TagModel.findOne({ title: tagTitle })
                if (!tag) {
                    tag = await TagModel.create({ title: tagTitle })
                }
                return tag._id
            })
        )
        const data = await ContentModel.create({
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
        const contents = await ContentModel.find({ userId: req.userId })
            .populate("tags", "title")     // array of refs
            .populate("userId", "username") // single ref
            .sort({ _id: -1 }) // 👈 newest first

        return res.status(200).json({
            contents
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
    try {
        const contentId = req.body.contentId
        const userId = req.userId
        await ContentModel.deleteMany({
            contentId: contentId,
            userId: userId
        })

        res.status(200).json({
            message: "Deleted!"
        })
    }
    catch (e) {
        console.log(e)
        return res.status(403).json({
            message: "Error in inputs"
        })
    }
})

userRouter.post("/brain/share", authMiddleware, async (req, res) => {
    try {
        const { share } = req.body;
        if (share) {
            const ExistingLink = await LinkModel.findOne({
                userId: req.userId
            })
            if (ExistingLink) {
                return res.status(200).json({
                    "link": `${ExistingLink.hash}`
                })
            }
            const link = await LinkModel.create({
                userId: req.userId
            })
            return res.status(200).json({
                "link": `${link.hash}`
            })
        }
        else {
            await LinkModel.deleteOne({
                userId: req.userId
            })
            return res.status(200).json({
                message: "Deleted!"
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(403).json({
            message: "Error in inputs"
        })
    }
})

userRouter.get("/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink

    const linkHash = await LinkModel.findOne({
        hash: hash
    })

    if (!linkHash) {
        return res.status(404).json({
            message: "Sorry incorrect Input!"
        })
    }

    const content = await ContentModel.find({
        userId: linkHash.userId
    })
        .populate("tags", "title")

    const user = await UserModel.findOne({
        _id: linkHash.userId
    })

    if (!user) {
        return res.status(411).json({
            message: "user does not exist of the content!"
        })
    }

    res.status(200).json({
        username: user.username,
        content: content
    })
})
export { userRouter }
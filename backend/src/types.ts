import z from "zod";

const signupZodSchema = z.object({

    username: z.string()
        .min(3, "Password must be at least 3 characters long")
        .max(10, "Password must be at most 10 characters long"),

    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})

const signinZodSchema = signupZodSchema.pick({
    username: true,
    password: true,
});

const contentTypes = ['twitter', 'youtube', 'document'] as const;

const contentZodSchema = z.object({
    link: z.url(), // must be a valid URL
    type: z.enum(contentTypes), // restrict to allowed types
    title: z.string().min(1, "Title is required"),
    tags: z.array(z.string().optional()).optional(),
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional()
});

export { signupZodSchema, signinZodSchema, contentZodSchema }
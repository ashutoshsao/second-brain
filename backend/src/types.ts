import z from "zod";

const signupZodSchema = z.object({

    username: z.string().min(3, "Password must be at least 3 characters long").max(10, "Password must be at most 10 characters long"),

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

export { signupZodSchema, signinZodSchema }
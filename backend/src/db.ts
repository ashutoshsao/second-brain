import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { MONGODB_URL } from "./config.js";
console.log(MONGODB_URL)
import crypto from "crypto";

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}
connectDB()

// --- Interfaces ---
interface IUser {
    username: string;
    password_hash: string;
}

// Instance methods (for documents)
interface IUserMethods {
    validatePassword(candidatePassword: string): Promise<boolean>;
}

// Static methods (for model)
interface UserModel extends mongoose.Model<IUser, {}, IUserMethods> {
    createHash(plainTextPassword: string): Promise<string>;
}

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, require: true }
})

userSchema.statics.createHash = async function (plainTextPassword) {
    // Hashing user's salt and password with 10 iterations,
    const saltRounds = 10;
    // First method to generate a salt and then create hash 
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
};

userSchema.methods.validatePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password_hash);
};

const tagSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
})

interface ILink {
    userId: mongoose.Types.ObjectId;
    hash?: string; // <-- optional at creation time
}

function generateShareHash(length = 20) {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
}

const linkSchema = new mongoose.Schema<ILink>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
        unique: true,
        default: () => generateShareHash(20)
    }
});

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const UserModel = mongoose.model<IUser, UserModel>("User", userSchema);
const TagModel = mongoose.model("Tag", tagSchema);
const LinkModel = mongoose.model("Link", linkSchema);
const ContentModel = mongoose.model("Content", contentSchema);

export { UserModel, TagModel, LinkModel, ContentModel }
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { MONGODB_URL } from "./config.js";
console.log(MONGODB_URL)
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

userSchema.statics.createHash = async function (plainTextPassword): Promise<string> {
    // Hashing user's salt and password with 10 iterations,
    const saltRounds = 10;
    // First method to generate a salt and then create hash 
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
};

userSchema.methods.validatePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password_hash);
};

const tagSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
})


const linkSchema = new mongoose.Schema({
    hash: { type: String, require: true },
    userId: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
})

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const User = mongoose.model<IUser, UserModel>("User", userSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Link = mongoose.model("Link", linkSchema);
const Content = mongoose.model("Content", contentSchema);

export { User, Tag, Link, Content }
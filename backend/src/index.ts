import "./config.js";
import "./db.js";
import express from "express";
import cors from "cors"
import { userRouter } from "./routes/user.js"
const app = express();
app.use(cors())
app.use(express.json());

//routes
app.use("/api/v1", userRouter);

app.listen(3000, () => {
    console.log("Listening to port 3000")
})
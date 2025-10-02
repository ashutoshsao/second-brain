import "./config.js";
import express from "express";
import { userRouter } from "./routes/user.js"
const app = express();
app.use(express.json());

//routes
app.use("/api/v1", userRouter);

app.listen(3000, () => {
    console.log("Listening to port 3000")
})
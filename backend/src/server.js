import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

import authRoutes from "./routes/auth.js"
import messageRoutes from "./routes/message.js"

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    console.log(`Hello Server Running on http://localhost:${PORT}`);
});
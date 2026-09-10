import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL?.replace(/\/$/, ""),
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalizedOrigin = origin.replace(/\/$/, "");
      const isAllowed = allowedOrigins.some((o) => o.replace(/\/$/, "") === normalizedOrigin);
      if (isAllowed || process.env.NODE_ENV === "development") {
        return callback(null, true);
      }
      return callback(null, true); // fallback allow for smooth client deployment
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const possibleDistPaths = [
  path.resolve(__dirname, "../dist"), // deployed where dist is in backend/dist
  path.resolve(__dirname, "../../frontend/dist"), // full repo structure
  path.resolve(process.cwd(), "dist"),
  path.resolve(process.cwd(), "frontend/dist"),
];

const frontendDistPath = possibleDistPaths.find((p) => fs.existsSync(p));

if (frontendDistPath) {
  app.use(express.static(frontendDistPath));

  app.get("/{*splat}", (req, res) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ message: "API route not found" });
    }
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Chat App Backend API is running successfully!",
      endpoints: {
        auth: "/api/auth",
        messages: "/api/messages",
      },
      timestamp: new Date().toISOString(),
    });
  });
}

server.listen(PORT, () => {
    console.log(`Hello Server Running on http://localhost:${PORT}`);
    connectDB();
});
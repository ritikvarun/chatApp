import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  ENV.CLIENT_URL,
  ENV.CLIENT_URL?.replace(/\/$/, ""),
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalizedOrigin = origin.replace(/\/$/, "");
      const isAllowed = allowedOrigins.some((o) => o.replace(/\/$/, "") === normalizedOrigin);
      if (isAllowed || process.env.NODE_ENV === "development") {
        return callback(null, true);
      }
      return callback(null, true); // permit connection or return callback(null, origin)
    },
    credentials: true,
  },
});

// online users map: { userId: socketId }
const userSocketMap = {};

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id, socket.userId);
  const userId = socket.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id, socket.userId);
    if (userId) delete userSocketMap[userId];
    io.emit("getUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
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
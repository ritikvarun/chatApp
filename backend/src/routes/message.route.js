import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  getAllContacts,
  getChatPartners,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(arcjetProtection);

router.get("/contacts", protectRoute, getAllContacts);
router.get("/chats", protectRoute, getChatPartners);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;

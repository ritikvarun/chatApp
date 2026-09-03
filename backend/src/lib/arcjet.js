import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // Shield protects your app from common attacks (SQLi, XSS, etc.)
    shield({ mode: "LIVE" }),

    // Detect bots and allow search engines
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc.
      ],
    }),

    // Rate limiting rule: max 100 requests per 60 seconds
    slidingWindow({
      mode: "LIVE",
      interval: "1m",
      max: 100,
    }),
  ],
});

export default aj;

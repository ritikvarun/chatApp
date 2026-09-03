import { aj } from "../lib/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied." });
            }
            return res.status(403).json({ message: "Access denied." });
        }

        // Check for spoofed bots
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            return res.status(403).json({ message: "Spoofed bot detected." });
        }

        next();
    } catch (error) {
        console.error("Arcjet Middleware Error: ", error.message);
        next();
    }
};

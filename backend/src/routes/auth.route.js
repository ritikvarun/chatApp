import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { resendClient, sender } from "../lib/resend.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

// Diagnostic endpoint to test Resend in production / Azure
router.get("/test-resend", async (req, res) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      status: "error",
      message: "RESEND_API_KEY is missing in Azure Environment Variables!",
      solution: "Go to Azure Portal -> App Services -> ritikvarun-chatapp -> Configuration / Environment variables -> Add RESEND_API_KEY."
    });
  }

  const toEmail = req.query.to || process.env.ADMIN_EMAIL || "ritikvarun64@gmail.com";
  try {
    const { data, error } = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: toEmail,
      subject: "🧪 Resend Azure Diagnostic Test",
      html: `<h2>Resend is working!</h2><p>Server Time: ${new Date().toISOString()}</p><p>From: ${sender.email}</p><p>To: ${toEmail}</p>`,
    });

    if (error) {
      return res.status(400).json({
        status: "resend_api_error",
        error,
        reason: error.statusCode === 403
          ? "Resend test domain 'onboarding@resend.dev' can only send emails to your registered account email (ritikvarun64@gmail.com). To send to all users, verify a domain at resend.com/domains."
          : error.message
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Test email successfully sent to ${toEmail}!`,
      resendId: data?.id,
    });
  } catch (err) {
    return res.status(500).json({
      status: "exception",
      error: err.message
    });
  }
});

export default router;

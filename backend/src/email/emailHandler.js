import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate, createNewUserAdminEmailTemplate } from "./emailTemplate.js";

// User ko Welcome Email bhejna
export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn("⚠️ [Resend] Skipping welcome email: RESEND_API_KEY is not set in environment variables!");
            return null;
        }

        const fallbackURL = process.env.CLIENT_URL || "https://ritikvarun-chatapp.azurewebsites.net";
        const finalClientURL = clientURL || fallbackURL;

        const { data, error } = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Welcome to Chatify!",
            html: createWelcomeEmailTemplate(name, finalClientURL),
        });

        if (error) {
            console.error("❌ [Resend] Error sending welcome email:", error);
            if (error.statusCode === 403 || error.message?.includes("testing emails to your own email address")) {
                console.warn("⚠️ [Resend Restriction] Free test domain 'onboarding@resend.dev' can only send emails to your verified Resend account email (ritikvarun64@gmail.com). To send to all users, verify a domain at resend.com/domains.");
            }
            return null;
        }

        console.log(`✅ [Resend] Welcome email sent successfully to ${email} (ID: ${data?.id})`);
        return data;
    } catch (err) {
        console.error("❌ [Resend] Exception in sendWelcomeEmail:", err.message);
        return null;
    }
};

// Admin ko New User Registration Alert bhejna
export const sendAdminAlertEmail = async (fullName, email) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn("⚠️ [Resend] Skipping admin alert: RESEND_API_KEY is not set in environment variables!");
            return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL || "ritikvarun64@gmail.com";

        const { data, error } = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: adminEmail,
            subject: `🎉 New User Joined: ${fullName}`,
            html: createNewUserAdminEmailTemplate(fullName, email),
        });

        if (error) {
            console.error("❌ [Resend] Error sending admin alert email:", error);
            return null;
        }

        console.log(`✅ [Resend] Admin alert email sent successfully to ${adminEmail} (ID: ${data?.id})`);
        return data;
    } catch (err) {
        console.error("❌ [Resend] Exception in sendAdminAlertEmail:", err.message);
        return null;
    }
};


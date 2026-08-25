import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate, createNewUserAdminEmailTemplate } from "./emailTemplate.js";

// User ko Welcome Email bhejna
export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chatify!",
        html: createWelcomeEmailTemplate(name, clientURL),
    });

    if (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }

    return data;
};

// Admin ko New User Registration Alert bhejna
export const sendAdminAlertEmail = async (fullName, email) => {
    const adminEmail = process.env.ADMIN_EMAIL || "ritikvarun64@gmail.com";

    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: adminEmail,
        subject: `🎉 New User Joined: ${fullName}`,
        html: createNewUserAdminEmailTemplate(fullName, email),
    });

    if (error) {
        console.error("Error sending admin alert email:", error);
        return null;
    }

    return data;
};


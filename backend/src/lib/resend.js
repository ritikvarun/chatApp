import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resendClient = {
  get emails() {
    return new Resend(process.env.RESEND_API_KEY).emails;
  },
};

export const sender = {
  get email() {
    return process.env.EMAIL_FROM || "onboarding@resend.dev";
  },
  get name() {
    return process.env.EMAIL_FROM_NAME || "Chatify";
  },
};

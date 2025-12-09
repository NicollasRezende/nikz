// lib/emailjs.ts
import emailjs from "@emailjs/browser";
import { ContactFormData } from "@/types";

// Initialize EmailJS
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";

if (typeof window !== "undefined" && PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

/**
 * Send email using EmailJS
 */
export async function sendEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const templateParams = {
      name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      time: new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to send email" };
    }
  } catch (error) {
    console.error("EmailJS Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

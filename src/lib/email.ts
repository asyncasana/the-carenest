import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return resend.emails.send({
    from: "info@thecarenest.co.uk",
    to: process.env.CONTACT_TO_EMAIL ?? "",
    subject: `New contact form submission from ${name}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  });
}

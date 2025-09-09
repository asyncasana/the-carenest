"use client";
import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const form = e.currentTarget as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value || "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-16 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-200 text-lg"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-200 text-lg"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-200 text-lg"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Message"}
        </Button>
        {status === "success" && (
          <div className="text-green-600 mt-2">
            Thank you! Your message has been sent.
          </div>
        )}
        {status === "error" && (
          <div className="text-red-600 mt-2">
            Sorry, something went wrong. Please try again.
          </div>
        )}
      </form>
    </Container>
  );
}

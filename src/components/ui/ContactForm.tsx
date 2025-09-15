"use client";
import { useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<null | "success" | "error" | "loading">(
    null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-12 p-6 bg-white/80 rounded-xl shadow flex flex-col gap-4"
    >
      <h2 className="text-2xl font-serif text-stone-600 font-bold text-center mb-2">Contact Us</h2>
      <input
        type="text"
        name="name"
        required
        placeholder="Your Name"
        className="border rounded px-3 py-2"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Your Email"
        className="border rounded px-3 py-2"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <textarea
        name="message"
        required
        placeholder="Your Message"
        className="border rounded px-3 py-2 min-h-[100px]"
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
      />
      <button
        type="submit"
        className="bg-stone-500 text-white font-semibold py-2 px-4 rounded hover:bg-primary-600 transition"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-stone-500">Message sent! We'll be in touch soon.</p>
      )}
      {status === "error" && (
        <p className="text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

"use client";
import { useState } from "react";

export function ContactPageForm() {
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
    <div className="bg-gradient-to-br from-neutral-50 to-white">
      <div className="max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur border border-neutral-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 space-y-6"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light text-neutral-800 mb-2">
              Get in Touch
            </h2>
            <p className="text-neutral-600">
              Have a question? We'd love to hear from you.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 bg-white/50"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 bg-white/50"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Tell us how we can help..."
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 bg-white/50 resize-vertical"
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-text-main font-medium py-3 px-6 rounded-lg hover:bg-[#e5e1d1] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md active:scale-95"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>

          {status === "success" && (
            <div className="bg-neutral-50 border border-neutral-200 text-neutral-700 px-4 py-3 rounded-lg text-center">
              Thank you for your message. We'll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="bg-neutral-50 border border-neutral-300 text-neutral-600 px-4 py-3 rounded-lg text-center">
              We couldn't send your message right now. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

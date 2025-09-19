// src/app/contact/page.tsx
"use client";
import { useState } from "react";

type SendState = { sending: boolean; sent: boolean; error: string | null };

export default function Contact() {
  const [state, setState] = useState<SendState>({
    sending: false,
    sent: false,
    error: null,
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ sending: true, sent: false, error: null });

    const formEl = e.currentTarget;                 // no ref needed
    const form = new FormData(formEl);

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),   // optional
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // be tolerant if the API ever returns non-JSON:
      const data = await res.json().catch(() => null);

      if (!res.ok || (data && data.ok === false)) {
        throw new Error((data && data.error) || `Request failed: ${res.status}`);
      }

      formEl.reset();                               // safe reset
      setState({ sending: false, sent: true, error: null });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setState({ sending: false, sent: false, error: msg });
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold">Let’s build something great</h1>
        <p className="text-white/70 mt-2">
          Tell me about your store and what you’d like to automate. I’ll reply with options and a
          fast, scoped estimate.
        </p>
        <ul className="mt-4 space-y-2 text-white/80 text-sm">
          <li>
            • Email:{" "}
            <a className="underline hover:text-white" href="mailto:fisi.kurti@gmail.com">
              fisi.kurti@gmail.com
            </a>
          </li>
          <li>• Based in Pristina, working with EU/UK clients</li>
          <li>• Available for project or retainer</li>
        </ul>
      </div>

      <form onSubmit={onSubmit} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 grid gap-4">
        <LabelInput label="Name" name="name" required />
        <LabelInput label="Email" name="email" type="email" required />
        <LabelInput label="Company / Site" name="company" />
        <LabelTextarea label="What do you need?" name="message" rows={6} required />

        <button
          type="submit"
          disabled={state.sending}
          className="mt-2 rounded-2xl px-5 py-3 bg-white text-[#0B0F1A] font-medium disabled:opacity-60"
        >
          {state.sending ? "Sending…" : "Send message"}
        </button>

        {state.sent && <p className="text-xs text-emerald-300/90">Thanks! I’ll get back shortly.</p>}
        {state.error && <p className="text-xs text-red-400">{state.error}</p>}
      </form>
    </section>
  );
}

function LabelInput({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-white/70">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
      />
    </label>
  );
}

function LabelTextarea({
  label,
  name,
  rows = 5,
  required = false,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-white/70">{label}</span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
      />
    </label>
  );
}

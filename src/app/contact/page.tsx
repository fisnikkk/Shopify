"use client";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;                 // <- no ref needed
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      form.reset();                               // <- this won’t be null
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
      {/* ...left column... */}
      <form onSubmit={onSubmit} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 grid gap-4">
        {/* make sure each input has a name */}
        <LabelInput label="Name" name="name" />
        <LabelInput label="Email" name="email" type="email" />
        <LabelInput label="Company / Site" name="company" />
        <LabelTextarea label="What do you need?" name="message" rows={6} />
        <button disabled={loading} className="mt-2 rounded-2xl px-5 py-3 bg-white text-[#0B0F1A] font-medium">
          {loading ? "Sending…" : "Send message"}
        </button>
        {sent && <p className="text-xs text-white/60">Thanks! I’ll get back shortly.</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </form>
    </section>
  );
}

function LabelInput({ label, name, type = "text" }: {
  label: string; name: string; type?: string
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-white/70">{label}</span>
      <input
        name={name}
        type={type}
        className="px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
        required={name !== "company"}
      />
    </label>
  );
}

function LabelTextarea({ label, name, rows = 5 }: {
  label: string; name: string; rows?: number
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-white/70">{label}</span>
      <textarea
        name={name}
        rows={rows}
        className="px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
        required
      />
    </label>
  );
}

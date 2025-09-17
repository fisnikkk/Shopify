"use client";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold">Let’s build something great</h1>
        <p className="text-white/70 mt-2">
          Tell me about your store and what you’d like to automate. I’ll reply with options and a fast, scoped estimate.
        </p>
        <ul className="mt-4 space-y-2 text-white/80 text-sm">
          <li>• Email: <a className="underline hover:text-white" href="mailto:fisi.kurti@gmail.com">fisi.kurti@gmail.com</a></li>
          <li>• Based in Pristina, working with EU/UK clients</li>
          <li>• Available for project or retainer</li>
        </ul>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 grid gap-4"
      >
        <LabelInput label="Name" />
        <LabelInput label="Email" type="email" />
        <LabelInput label="Company / Site" />
        <LabelTextarea label="What do you need?" rows={6} />
        <button className="mt-2 rounded-2xl px-5 py-3 bg-white text-[#0B0F1A] font-medium">Send message</button>
        {sent && <p className="text-xs text-white/60">Thanks! I’ll get back shortly.</p>}
      </form>
    </section>
  );
}

function LabelInput({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-white/70">{label}</span>
      <input
        type={type}
        className="px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
      />
    </label>
  );
}

function LabelTextarea({ label, rows = 5 }: { label: string; rows?: number }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-white/70">{label}</span>
      <textarea
        rows={rows}
        className="px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
      />
    </label>
  );
}

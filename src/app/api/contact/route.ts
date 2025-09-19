// src/app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs"; // ensure Node runtime (not Edge)

type Payload = {
    name?: string;
    email?: string;
    message?: string;
    company?: string;
};

function escapeHtml(s: string) {
    return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
    ] as string)
    );
}

export async function POST(req: Request) {
    try {
        const { name = "", email = "", message = "", company = "" } =
            ((await req.json().catch(() => ({}))) as Payload) || {};

        if (!name || !email || !message) {
            return Response.json(
                { ok: false, error: "Missing name, email or message." },
                { status: 400 }
            );
        }

        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const FROM = process.env.CONTACT_FROM;
        const TO = process.env.CONTACT_TO;

        if (!RESEND_API_KEY || !FROM || !TO) {
            console.error("Missing envs", {
                HAS_KEY: !!RESEND_API_KEY,
                HAS_FROM: !!FROM,
                HAS_TO: !!TO,
            });
            return Response.json(
                { ok: false, error: "Server not configured (env vars missing)." },
                { status: 500 }
            );
        }

        const resend = new Resend(RESEND_API_KEY);

        const subject = `New contact from ${name}`;
        const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif">
        <h2>New message from your site</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        ${company ? `<p><b>Company:</b> ${escapeHtml(company)}</p>` : ""}
        <p><b>Message:</b></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      </div>`;

        const { data, error } = await resend.emails.send({
            from: FROM,     // e.g. onboarding@resend.dev  (OK for testing)
            to: [TO],       // your inbox
            subject,
            html,
            replyTo: email, // lets you click Reply in your inbox
        });

        if (error) {
            console.error("Resend error:", error);
            return Response.json(
                { ok: false, error: error.message || "Email service error." },
                { status: 500 }
            );
        }

        return Response.json({ ok: true, id: data?.id ?? null });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unexpected server error.";
        console.error("Contact API failed:", message, err);
        return Response.json({ ok: false, error: message }, { status: 500 });
    }
}

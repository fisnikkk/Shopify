// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
    name: string;
    email: string;
    message: string;
};

function isNonEmptyString(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}

// Accept both JSON and form submissions
async function parseBody(req: NextRequest): Promise<ContactPayload> {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        const data = (await req.json()) as Record<string, unknown>;
        return {
            name: String(data.name ?? ""),
            email: String(data.email ?? ""),
            message: String(data.message ?? ""),
        };
    }

    // default: form-encoded / multipart
    const form = await req.formData();
    return {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        message: String(form.get("message") ?? ""),
    };
}

export async function POST(req: NextRequest) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.CONTACT_FROM; // e.g. onboarding@resend.dev (local) or hello@yourdomain.com (prod)
    const TO = process.env.CONTACT_TO;     // your inbox

    if (!isNonEmptyString(RESEND_API_KEY) || !isNonEmptyString(FROM) || !isNonEmptyString(TO)) {
        return NextResponse.json(
            { ok: false, error: "Missing environment variables. Check RESEND_API_KEY, CONTACT_FROM, CONTACT_TO." },
            { status: 500 }
        );
    }

    const { name, email, message } = await parseBody(req);

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
        return NextResponse.json(
            { ok: false, error: "Please provide name, email and message." },
            { status: 400 }
        );
    }

    try {
        const resend = new Resend(RESEND_API_KEY);
        const subject = `New contact from ${name}`;
        const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;padding:16px">
        <h2 style="margin:0 0 12px 0">New message from your site</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p style="white-space:pre-wrap"><strong>Message:</strong><br/>${message.replace(/</g, "&lt;")}</p>
      </div>
    `;
        const { data, error } = await resend.emails.send({
            from: FROM,
            to: [TO],
            subject,
            replyTo: email, // so you can hit Reply in your inbox
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ ok: false, error: "Email failed to send." }, { status: 500 });
        }

        // Success
        return NextResponse.json({ ok: true, id: data?.id });
    } catch (err) {
        console.error("Contact route error:", err);
        return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
    }
}

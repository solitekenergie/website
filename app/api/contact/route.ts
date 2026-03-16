import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import { sendEmail } from "@/lib/email/send";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(ip, { limit: 3, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { message: "Trop de requêtes. Réessayez dans quelques instants." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const text = `Nom: ${data.name}\nEmail: ${data.email}\nTéléphone: ${data.phone ?? "Non renseigné"}\n\n${data.message}`;

  try {
    const result = await sendEmail({
      to: process.env.CONTACT_TO_EMAIL,
      subject: "Nouveau message depuis le site Solitek",
      text,
      replyTo: data.email,
    });

    return NextResponse.json({ ok: true, delivered: result.delivered, note: result.note });
  } catch (error) {
    console.error("[contact] Erreur lors de l'envoi", error);
    return NextResponse.json(
      { message: "Impossible d'envoyer le message pour le moment." },
      { status: 500 },
    );
  }
}

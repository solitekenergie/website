import { Resend } from "resend";

export type EmailPayload = {
  to?: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export type EmailSendResult = {
  delivered: boolean;
  note?: string;
};

export async function sendEmail(payload: EmailPayload): Promise<EmailSendResult> {
  const provider = process.env.EMAIL_PROVIDER;
  const apiKey = process.env.RESEND_API_KEY;

  if (!provider || !apiKey || !payload.to) {
    console.info("[contact:dev-email] Payload enregistré en mode développement:", {
      ...payload,
      info: "Aucun provider email configuré.",
    });

    return { delivered: false, note: "Provider non configuré, payload loggé." };
  }

  // Resend integration
  if (provider === "resend") {
    try {
      const resend = new Resend(apiKey);

      const result = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS || "onboarding@resend.dev",
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        replyTo: payload.replyTo,
      });

      if (result.error) {
        console.error("[contact:resend] Erreur lors de l'envoi:", result.error);
        return {
          delivered: false,
          note: `Erreur Resend: ${result.error.message}`
        };
      }

      console.info("[contact:resend] Email envoyé avec succès:", result.data?.id);
      return {
        delivered: true,
        note: "Email envoyé avec succès via Resend."
      };
    } catch (error) {
      console.error("[contact:resend] Exception lors de l'envoi:", error);
      return {
        delivered: false,
        note: error instanceof Error ? error.message : "Erreur inconnue"
      };
    }
  }

  console.warn(
    `Provider email \"${provider}\" détecté mais non pris en charge. Providers supportés: resend`,
  );

  return { delivered: false, note: `Provider ${provider} non pris en charge.` };
}

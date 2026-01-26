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

  // Point d'extension : ajouter ici l'appel au provider choisi (ex: Resend).
  console.warn(
    `Provider email \"${provider}\" détecté mais non implémenté. Aucun envoi réalisé.`,
  );

  return { delivered: false, note: `Provider ${provider} non implémenté.` };
}

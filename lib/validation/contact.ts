import { z } from "zod";

export const PRESTATIONS = [
  "Panneaux solaires",
  "Pompe à chaleur",
  "Climatisation",
  "VMC",
  "Électricité",
  "Borne de recharge IRVE",
  "Autre",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Merci d'indiquer votre nom complet."),
  email: z.string().email("Merci de saisir un email valide."),
  phone: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value)),
  prestation: z.string().min(1, "Merci de sélectionner une prestation."),
  ville: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value)),
  message: z
    .string()
    .min(10, "Votre message doit contenir au moins 10 caractères."),
});

export type ContactFormData = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;

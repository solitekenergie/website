"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactFormData,
  type ContactPayload,
} from "@/lib/validation/contact";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData, undefined, ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data: ContactPayload) => {
    setStatus("loading");
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; note?: string }
        | null;

      if (!response.ok) {
        setStatus("error");
        setServerMessage(payload?.message ?? "Impossible d'envoyer le message.");
        return;
      }

      setStatus("success");
      setServerMessage(payload?.note ?? "Merci, nous vous recontactons rapidement.");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage("Erreur réseau, merci de réessayer.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-800" htmlFor="name">
            Nom complet
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
            placeholder="Votre nom"
            disabled={status === "loading"}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-800" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
            placeholder="vous@example.com"
            disabled={status === "loading"}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="phone">
          Téléphone (facultatif)
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
          placeholder="06..."
          disabled={status === "loading"}
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-800" htmlFor="message">
          Votre projet
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
          placeholder="Décrivez votre toiture, vos objectifs et vos contraintes..."
          disabled={status === "loading"}
        />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>

      {serverMessage && (
        <p
          className={`text-sm ${status === "success" ? "text-emerald-700" : "text-red-600"}`}
        >
          {serverMessage}
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Nous répondons sous 24h. Vos informations restent confidentielles.
        </p>
        <button
          type="submit"
          className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi..." : "Envoyer"}
        </button>
      </div>
    </form>
  );
}

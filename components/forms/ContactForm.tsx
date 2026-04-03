"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  PRESTATIONS,
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
    defaultValues: { name: "", email: "", phone: "", prestation: "", ville: "", message: "" },
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

  const isLoading = status === "loading";
  const inputBase =
    "w-full rounded-lg border border-[rgba(128,128,128,0.40)] bg-white px-4 py-3 text-base text-[#161A1E] focus:border-[#2DB180] focus:outline-none focus:ring-2 focus:ring-[#2DB180]/20 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-4";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <Field
        id="name"
        label="Nom complet*"
        type="text"
        register={register("name")}
        error={errors.name?.message}
        disabled={isLoading}
        inputClassName={inputBase}
        required
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <Field
          id="email"
          label="E-mail*"
          type="email"
          register={register("email")}
          error={errors.email?.message}
          disabled={isLoading}
          inputClassName={inputBase}
          required
        />
        <Field
          id="phone"
          label="Téléphone"
          type="tel"
          register={register("phone")}
          error={errors.phone?.message}
          disabled={isLoading}
          inputClassName={inputBase}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="prestation" className="font-ui text-sm font-medium text-black/70 sm:text-base">
            Prestation souhaitée*
          </label>
          <select
            id="prestation"
            {...register("prestation")}
            disabled={isLoading}
            required
            aria-required="true"
            aria-invalid={errors.prestation ? "true" : undefined}
            className={`h-12 appearance-none sm:h-[52px] ${inputBase}`}
          >
            <option value="">Sélectionner</option>
            {PRESTATIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.prestation?.message && (
            <p className="text-xs font-medium text-red-600 sm:text-sm">{errors.prestation.message}</p>
          )}
        </div>
        <Field
          id="ville"
          label="Ville"
          type="text"
          register={register("ville")}
          error={errors.ville?.message}
          disabled={isLoading}
          inputClassName={inputBase}
        />
      </div>

      <Field
        id="message"
        label="Votre projet*"
        type="textarea"
        register={register("message")}
        error={errors.message?.message}
        disabled={isLoading}
        inputClassName={inputBase}
        required
      />

      {serverMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`w-full rounded-lg p-4 text-sm font-medium ${
            status === "success"
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {serverMessage}
        </div>
      )}

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2DB180] px-20 py-5 font-ui text-sm font-bold uppercase leading-tight text-white transition-colors hover:bg-[#26a072] disabled:cursor-not-allowed disabled:opacity-50 sm:px-24 sm:py-6 sm:text-base"
        >
          {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

type FieldProps = {
  id: string;
  label: string;
  type: string;
  register: Record<string, unknown>;
  error?: string;
  disabled?: boolean;
  inputClassName: string;
  required?: boolean;
};

function Field({ id, label, type, register, error, disabled, inputClassName, required }: FieldProps) {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="font-ui text-sm font-medium text-black/70 sm:text-base">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          {...register}
          disabled={disabled}
          rows={5}
          className={inputClassName}
          aria-invalid={error ? "true" : undefined}
          required={required}
          aria-required={required ? "true" : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...register}
          disabled={disabled}
          className={`h-12 sm:h-[52px] ${inputClassName}`}
          aria-invalid={error ? "true" : undefined}
          required={required}
          aria-required={required ? "true" : undefined}
        />
      )}
      {error && (
        <p className="text-xs font-medium text-red-600 sm:text-sm">{error}</p>
      )}
    </div>
  );
}
